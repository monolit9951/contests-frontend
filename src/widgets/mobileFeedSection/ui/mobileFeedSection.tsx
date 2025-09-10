import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks';
import { MobileWorkPreview } from 'shared/ui/mobileWorkPreview';
import { Work } from 'entities/work';
import './mobileFeedSection.scss'

const MobileFeedSection = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)
    const [currentY, setCurrentY] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [translate, setTranslate] = useState<number>(0)
    const [transition, setTransition] = useState<any>("none")
    const [visiblePosts, setVisiblePosts] = useState<number[]>([])
    const feedRef = useRef<HTMLDivElement>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey:['feedWorks'],
        queryFn: fetchFeedWorks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.content.length === 3 ? allPages.length : undefined,
    });

    const works = data?.pages.flatMap(page => page.content) ?? [];

    // Загрузка следующей страницы при достижении конца
    useEffect(() => {
        if (currentIndex >= works.length - 2 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [currentIndex, works.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // начало нажатия
    const handleTouchStart = useCallback((e: TouchEvent) => {
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
        setIsDragging(true);
        setTransition("none");
    }, []);

    // движение нажатия
    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isDragging) return;
            setCurrentY(e.touches[0].clientY);
            const diff = e.touches[0].clientY - startY;
            setTranslate((diff / window.innerHeight) * 100);
        },
        [isDragging, startY]
    );

    // окончание нажатия
    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;

        const diff = currentY - startY;
        const threshold = window.innerHeight / 4;

        setTransition("transform 0.3s ease");

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex > 0) {
                // свайп вниз - переходим к предыдущему посту
                setTranslate(100);
                setTimeout(() => {
                    setCurrentIndex((prev) => prev - 1);
                    setTransition("none");
                    setTranslate(0);
                }, 300);
            } else if (diff < 0 && currentIndex < works.length - 1) {
                // свайп вверх - переходим к следующему посту
                setTranslate(-100);
                setTimeout(() => {
                    setCurrentIndex((prev) => prev + 1);
                    setTransition("none");
                    setTranslate(0);
                }, 300);
            } else {
                setTranslate(0);
            }
        } else {
            setTranslate(0);
        }

        setIsDragging(false);
        setStartY(0);
        setCurrentY(0);
    }, [isDragging, currentY, startY, currentIndex, works.length]);

    useEffect(() => {
        const feedElement = feedRef.current;
        if (feedElement) {
            feedElement.addEventListener("touchstart", handleTouchStart, { passive: true });
            feedElement.addEventListener("touchmove", handleTouchMove, { passive: true });
            feedElement.addEventListener("touchend", handleTouchEnd, { passive: true });
        }

            return () => {
                feedElement.removeEventListener("touchstart", handleTouchStart);
                feedElement.removeEventListener("touchmove", handleTouchMove);
                feedElement.removeEventListener("touchend", handleTouchEnd);
            };
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    useEffect(() => {
        const newVisiblePosts = [];
        
        // Всегда показываем текущий пост
        newVisiblePosts.push(currentIndex);
        
        // Добавляем предыдущий пост, если он существует
        if (currentIndex > 0) {
            newVisiblePosts.push(currentIndex - 1);
        }
        
        // Добавляем следующий пост, если он существует
        if (currentIndex < works.length - 1) {
            newVisiblePosts.push(currentIndex + 1);
        }
        
        // Если у нас меньше 3 постов, добавляем еще один с нужной стороны
        if (newVisiblePosts.length < 3) {
            if (currentIndex === 0) {
                // Если мы на первом посте, добавляем второй следующий
                if (currentIndex + 2 < works.length) {
                    newVisiblePosts.push(currentIndex + 2);
                }
            } else if (currentIndex === works.length - 1) {
                // Если мы на последнем посте, добавляем второй предыдущий
                if (currentIndex - 2 >= 0) {
                    newVisiblePosts.push(currentIndex - 2);
                }
            }
        }
        
        setVisiblePosts(newVisiblePosts.sort((a, b) => a - b));
    }, [currentIndex, works.length]);

    if (isLoading && works.length === 0) {
        return <div className="worksList">Загрузка...</div>;
    }

    if (works.length === 0) {
        return <div className="worksList">Нет работ для отображения</div>;
    }

    return (
        <div className="worksList" ref={feedRef}>
            <div 
                className="worksList_container" 
                style={{
                    transform: `translateY(calc(${translate}vh - ${currentIndex * 100}vh))`,
                    transition,
                }}
            >
                {visiblePosts.map((index) => (
                    <div 
                        key={index} 
                        className="work-slide"
                        style={{
                            height: '100vh',
                            position: 'relative'
                        }}
                    >
                        <MobileWorkPreview work={works[index]} />
                    </div>
                ))}
            </div>
            
            {isFetchingNextPage && (
                <div className="loading-indicator">
                    Загрузка следующих работ...
                </div>
            )}
        </div>
    )
}

export default MobileFeedSection