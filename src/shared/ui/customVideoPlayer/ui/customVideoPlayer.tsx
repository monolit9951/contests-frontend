import React, { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player';
import './customVideoPlayer.scss';

/** Тип события ошибки Shaka: event.detail — shaka.util.Error */
type ShakaErrorEvent = Event & { detail: shaka.util.Error };

/** rVFC (не везде есть) */
type VideoFrameCallback = (now: number, metadata: { mediaTime: number }) => void;
type VideoWithRVFC = HTMLVideoElement & {
    requestVideoFrameCallback?: (callback: VideoFrameCallback) => number;
    cancelVideoFrameCallback?: (handle: number) => void;
};

type Props = {
    /** URL на манифест: HLS (.m3u8) или DASH (.mpd) */
    src: string;
    className?: string;
    onPlayerReady?: (player: shaka.Player) => void;
    /** Доп. конфиг поверх базового (будет применён без reload) */
    config?: Partial<shaka.extern.PlayerConfiguration>;
};

const CustomVideoPlayer: React.FC<Props> = ({
    src,
    className,
    onPlayerReady,
    config,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const controlsRef  = useRef<HTMLDivElement | null>(null);
    const videoRef     = useRef<HTMLVideoElement | null>(null);
    const bgVideoRef   = useRef<HTMLVideoElement | null>(null);   // размытие
    const playerRef    = useRef<shaka.Player | null>(null);
    const scrubRef     = useRef<HTMLInputElement | null>(null);

    const [duration, setDuration]     = useState<number>(0);
    const [current, setCurrent]       = useState<number>(0);
    const [bufferedTo, setBufferedTo] = useState<number>(0);
    const [isSeeking, setIsSeeking]   = useState<boolean>(false);
    const [, setIsPlaying]            = useState<boolean>(false);

    // флаг: после ended нужно перепривязать стрим к фону
    const bgNeedsReattachRef = useRef<boolean>(false);

    // Хелпер: гарантированно подключает живой стрим к bg-видео
    const attachBgStream = async (force = false) => {
        const main = videoRef.current as (HTMLVideoElement & { captureStream?: () => MediaStream }) | null;
        const bg   = bgVideoRef.current as (HTMLVideoElement & { srcObject?: MediaStream }) | null;
        if (!main || !bg || typeof main.captureStream !== 'function') return;

        const currentStream = (bg as any).srcObject as MediaStream | null;
        const isInactive =
            !currentStream ||
            currentStream.active === false ||
            currentStream.getVideoTracks().every(t => t.readyState !== 'live');

        if (force || isInactive) {
            try {
                const stream = main.captureStream();
                (bg as any).srcObject = stream;
                (bg as HTMLElement).style.display = '';
                try { await bg.play(); } catch { /* no-op */ }
            } catch {
                (bg as any).srcObject = null;
                (bg as HTMLElement).style.display = 'none';
            }
        } else {
            try { await bg.play(); } catch { /* no-op */ }
        }
    };

    // ---------- INIT / DESTROY ----------
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.crossOrigin = 'anonymous';

        const player = new shaka.Player(video);
        playerRef.current = player;

        player.configure({
            abr: {
                enabled: true,
                restrictToElementSize: true,
                switchInterval: 4,
            },
            streaming: {
                bufferingGoal: 15,
                rebufferingGoal: 3,
                lowLatencyMode: false,
            },
            ...config,
        });

        const onError = (evt: ShakaErrorEvent) => {
            // eslint-disable-next-line no-console
            console.error('[Shaka] error', evt.detail);
        };
        player.addEventListener('error', onError);

        onPlayerReady?.(player);

        return () => {
            player.removeEventListener('error', onError);
            player.destroy().catch(() => {});
            playerRef.current = null;

            // очистим srcObject у фонового видео
            const bg = bgVideoRef.current as HTMLVideoElement & { srcObject?: MediaStream };
            if (bg && bg.srcObject) {
                bg.srcObject = null as unknown as MediaStream;
            }
        };
    }, [onPlayerReady, config]);

    // ---------- LOAD BY SRC + ПЕРВИЧНАЯ НАСТРОЙКА ФОНА ----------
    useEffect(() => {
        const player = playerRef.current;
        if (!player || !src) return;

        let alive = true;

        (async () => {
            try {
                await player.load(src);
                // eslint-disable-next-line no-console
                console.log('[Shaka] manifest loaded:', src);

                // Подадим «живой» стрим в фон (если доступен captureStream)
                await attachBgStream(true);
                bgNeedsReattachRef.current = false;
            } catch (e) {
                if (alive) console.error('[Shaka] load failed', e);
            }
        })();

        return () => { alive = false; };
    }, [src]);

    // ---------- СИНХРОНИЗАЦИЯ PLAY/PAUSE + ENDED ----------
    useEffect(() => {
        const v  = videoRef.current;
        if (!v) return;

        const onPlay = async () => {
            setIsPlaying(true);
            if (bgNeedsReattachRef.current) {
                await attachBgStream(true);
                bgNeedsReattachRef.current = false;
            } else {
                await attachBgStream(false);
            }
        };

        const onPause = () => {
            setIsPlaying(false);
        };

        const onEnded = () => {
            bgNeedsReattachRef.current = true;
        };

        v.addEventListener('play', onPlay);
        v.addEventListener('pause', onPause);
        v.addEventListener('ended', onEnded);

        return () => {
            v.removeEventListener('play', onPlay);
            v.removeEventListener('pause', onPause);
            v.removeEventListener('ended', onEnded);
        };
    }, []);

    // ---------- PROGRESS / STATE SUBSCRIPTION ----------
    useEffect(() => {
        const v = videoRef.current as VideoWithRVFC | null;
        if (!v) return;

        const hasRVFC =
            typeof v.requestVideoFrameCallback === 'function' &&
            typeof v.cancelVideoFrameCallback === 'function';

        let rvfcId = 0;

        const readBufferedEnd = (): number => {
            const t = v.currentTime;
            for (let i = 0; i < v.buffered.length; i++) {
                const start = v.buffered.start(i);
                const end = v.buffered.end(i);
                if (t >= start && t <= end) return end;
            }
            return t;
        };

        // Ядро тика: без аргументов (можно звать из rVFC и из DOM-событий)
        const tickCore = () => {
            if (!isSeeking) setCurrent(v.currentTime);
            setDuration(Number.isFinite(v.duration) ? v.duration : 0);
            setBufferedTo(readBufferedEnd());
        };

        // Адаптер для rVFC: сигнатура (now, metadata), внутри зовём tickCore()
        const onVideoFrame: VideoFrameCallback = () => {
            tickCore();
            if (hasRVFC && v.requestVideoFrameCallback) {
                rvfcId = v.requestVideoFrameCallback(onVideoFrame);
            }
        };

        const onTime  = () => tickCore();
        const onDur   = () => setDuration(Number.isFinite(v.duration) ? v.duration : 0);
        const onProg  = () => setBufferedTo(readBufferedEnd());

        if (hasRVFC && v.requestVideoFrameCallback) {
            rvfcId = v.requestVideoFrameCallback(onVideoFrame);
        } else {
            v.addEventListener('timeupdate', onTime);
            v.addEventListener('durationchange', onDur);
            v.addEventListener('progress', onProg);
        }

        return () => {
            if (hasRVFC && rvfcId && v.cancelVideoFrameCallback) {
                v.cancelVideoFrameCallback(rvfcId);
            } else {
                v.removeEventListener('timeupdate', onTime);
                v.removeEventListener('durationchange', onDur);
                v.removeEventListener('progress', onProg);
            }
        };
    }, [isSeeking]);

    // ---------- SEEK / PROGRESS ----------
    const p = playerRef.current;
    const range = p?.seekRange();
    const seekStart = range ? range.start : 0;
    const seekEnd   = range ? range.end   : (Number.isFinite(duration) ? duration : 0);
    const span      = Math.max(0, seekEnd - seekStart);

    const pctPlayed   = span ? ((Math.max(0, current    - seekStart)) / span) * 100 : 0;
    const pctBuffered = span ? ((Math.max(0, bufferedTo - seekStart)) / span) * 100 : 0;

    // play/pause по клику вне прогресс-бара
    const onContainerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const ctrls = controlsRef.current;
        if (ctrls && ctrls.contains(e.target as Node)) return;
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { void v.play(); } else { v.pause(); }
    };

    const [muted, setMuted] = useState<boolean>(false);

    return (
        <div
            ref={containerRef}
            onClick={onContainerClick}
            className={['customVideo', className].filter(Boolean).join(' ')}
            tabIndex={0}
            aria-label="Video player"
        >
            {/* фоновое размазанное видео */}
            <video
                ref={bgVideoRef}
                className="customVideo_bgVideo"
                muted
                playsInline
                aria-hidden
                loop
            />

            {/* основное видео над фоном */}
            <video
                ref={videoRef}
                className="customVideo_mainVideo"
                controls={false}
                playsInline
                loop
                muted={muted}
            />

            <div
                ref={controlsRef}
                className="customVideo_progress"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="customVideo_progress_container">
                    <div className="customVideo_progress_duration" />
                    <div className="customVideo_progress_buffer"  style={{ width: `${pctBuffered}%` }} />
                    <div className="customVideo_progress_current" style={{ width: `${pctPlayed}%` }} />

                    <input
                        ref={scrubRef}
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={span ? ((current - seekStart) / span) * 100 : 0}
                        onMouseDown={(e) => { e.stopPropagation(); setIsSeeking(true); }}
                        onTouchStart={(e) => { e.stopPropagation(); setIsSeeking(true); }}
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            const val = Number(e.currentTarget.value);
                            if (span) setCurrent(seekStart + (val / 100) * span);
                            setMuted(true);
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.stopPropagation();
                            setIsSeeking(false);
                            const player = playerRef.current;
                            const video  = videoRef.current;
                            if (!player || !video || !span) return;
                            const pct = Number(e.currentTarget.value);
                            const targetRaw = seekStart + (pct / 100) * span;
                            const { start, end } = player.seekRange();
                            const target = Math.min(end, Math.max(start, targetRaw));
                            (player.getMediaElement?.() ?? video).currentTime = target;
                            setCurrent(target);
                        }}
                        onMouseUp={() => { setMuted(false); }}
                        aria-label="Seek"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;
