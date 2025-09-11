import { useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks';
import { MobileWorkPreview } from 'shared/ui/mobileWorkPreview';

import './mobileFeedSection.scss';

const MobileFeedSection = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragY, setDragY] = useState(0);
    const dragStartX = useRef(0);
    const dragStartY = useRef(0);
    const direction = useRef<number>(0);
    const [blockScroll, setBlockScroll] = useState<boolean>(false);
    const [allowVerticalDrag, setAllowVerticalDrag] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['feedWorks'],
        queryFn: fetchFeedWorks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.content.length === 3 ? allPages.length : undefined,
    });

    const works = data?.pages.flatMap(page => page.content);

    const handleDragStart = (_: any, info: any) => {
        setIsDragging(true);
        dragStartY.current = info.point.y;
        dragStartX.current = info.point.x;
        setAllowVerticalDrag(true); // сбрасываем фильтр на каждом новом свайпе
    };

    const handleDrag = (_: any, info: any) => {
        const deltaX = info.point.x - dragStartX.current;
        const deltaY = info.point.y - dragStartY.current;

        // определяем направление один раз — в начале
        if (allowVerticalDrag && Math.abs(deltaX) > Math.abs(deltaY)) {
            // пользователь ушёл больше по X → считаем, что свайп горизонтальный
            setAllowVerticalDrag(false);
            setDragY(0);
            return;
        }

        if (allowVerticalDrag) {
            setDragY(deltaY);
            direction.current = deltaY > 0 ? 1 : -1;
        }
    };

    const handleDragEnd = (_: any, info: any) => {
        setIsDragging(false);

        // если свайп был горизонтальным — не листаем
        if (!allowVerticalDrag) {
            setDragY(0);
            return;
        }

        const dragDistance = info.point.y - dragStartY.current;
        const dragVelocity = info.velocity.y;

        // Порог — 10% экрана или быстрый свайп
        const isFullSwipe =
            Math.abs(dragDistance) > window.innerHeight * 0.1 ||
            Math.abs(dragVelocity) > 150;

        if (isFullSwipe && works) {
            if (direction.current > 0) {
                if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                }
            } else if (currentIndex < works.length - 1) {
                setCurrentIndex(prev => prev + 1);

                if (currentIndex >= works.length - 2 && hasNextPage) {
                    fetchNextPage();
                }
            }
        }

        setDragY(0);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            y: direction > 0 ? '-100%' : '100%',
        }),
        center: { y: 0 },
        exit: (direction: number) => ({
            y: direction > 0 ? '100%' : '-100%',
        }),
    };

    const handleBlockScroll = (value: boolean) => {
        setBlockScroll(value);
    };

    return (
        <div className="mobileFeed">
            {!isLoading && works && works.length > 0 && (
                <div className="vertical-feed">
                    <motion.div
                        drag={blockScroll ? undefined : "y"}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0}
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        className="feed-container"
                        style={{ y: dragY }}
                    >
                        <AnimatePresence initial={false} custom={direction.current}>
                            <motion.div
                                key={currentIndex}
                                custom={direction.current}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="post-wrapper"
                            >
                                <div
                                    className={`feed-post ${isDragging ? 'dragging' : ''}`}
                                >
                                    <MobileWorkPreview
                                        work={works[currentIndex]}
                                        handleBlockScroll={handleBlockScroll}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MobileFeedSection;
