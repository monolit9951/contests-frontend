import { useCallback, useEffect,useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeedWorks } from "pages/feedPage/model/services/fetchWorks";

import "./mobileFeedSection.scss";

const MobileFeedSection = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['feedWorks'],
        queryFn: fetchFeedWorks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
        lastPage.content.length === 3 ? allPages.length : undefined,
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [transition, setTransition] = useState("none");
    const [visiblePosts, setVisiblePosts] = useState([0, 1, 2]);

    const feedRef = useRef<HTMLDivElement >(null);

    // Получаем все посты из всех страниц
    const allPosts = data?.pages.flatMap(page => page.content) ?? [];

    // Загружаем следующую страницу, когда доходим до конца
    useEffect(() => {
        if (currentIndex >= allPosts.length - 2 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
        }
    }, [currentIndex, allPosts.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        const newVisiblePosts = [];
        
        newVisiblePosts.push(currentIndex);
        
        if (currentIndex > 0) {
        newVisiblePosts.push(currentIndex - 1);
        }
        
        if (currentIndex < allPosts.length - 1) {
        newVisiblePosts.push(currentIndex + 1);
        }
        
        if (newVisiblePosts.length < 3) {
        if (currentIndex === 0) {
            if (currentIndex + 2 < allPosts.length) {
            newVisiblePosts.push(currentIndex + 2);
            }
        } else if (currentIndex === allPosts.length - 1) {
            if (currentIndex - 2 >= 0) {
            newVisiblePosts.push(currentIndex - 2);
            }
        }
        }
        
        setVisiblePosts(newVisiblePosts.sort((a, b) => a - b));
    }, [currentIndex, allPosts.length]);

    const handleTouchStart = useCallback((e: any) => {
        e.preventDefault();
        setStartY(e.touches[0].clientY);
        setCurrentY(e.touches[0].clientY);
        setIsDragging(true);
        setTransition("none");
    }, []);

    const handleTouchMove = useCallback(
        (e: any) => {
            e.preventDefault();
            if (!isDragging) return;
            setCurrentY(e.touches[0].clientY);
            const diff = e.touches[0].clientY - startY;
            setTranslate((diff / window.innerHeight) * 100);
        },
        [isDragging, startY]
    );

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;

        const diff = currentY - startY;
        const threshold = window.innerHeight / 6;

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
        } else if (diff < 0 && currentIndex < allPosts.length - 1) {
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
    }, [isDragging, currentY, startY, currentIndex, allPosts.length]);

    useEffect(() => {
    const feedElement = feedRef.current;
        if (feedElement) {
            feedElement.addEventListener("touchstart", handleTouchStart, { passive: true });
            feedElement.addEventListener("touchmove", handleTouchMove, { passive: true });
            feedElement.addEventListener("touchend", handleTouchEnd, { passive: true });

            return () => {
            feedElement.removeEventListener("touchstart", handleTouchStart);
            feedElement.removeEventListener("touchmove", handleTouchMove);
            feedElement.removeEventListener("touchend", handleTouchEnd);
            };
        }

    return undefined;
    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

    // ЗАМЕНИТЬ НА ЛОАДЕР
    if (isLoading) {
        return (
        <div className="tiktok-feed">
            <div className="loading">Загрузка...</div>
        </div>
        );
    }

    useEffect(() => {
        document.body.style.overscrollBehavior = "none"

        return () => {
            document.body.style.overscrollBehavior = ""
        }
    }, [])

    return (
        <div className="tiktok_fixed">
            <div className="tiktok-feed" ref={feedRef}>
            <div
                className="posts-container"
                style={{
                transform: `translateY(calc(${translate}dvh - ${currentIndex * 100}dvh))`,
                transition,
                }}
            >
                {visiblePosts.map((index) => {
                const post = allPosts[index];
                if (!post) return null; // На случай если пост еще не загружен
                
                return (
                    <div 
                        key={post.id || index} 
                        className="post"
                        style={{ 
                            height: '100dvh',
                            position: 'absolute',
                            top: `${index * 100}dvh`,
                            width: '100%'
                        }}
                    >
                        <div className="post-content">
                            <h3>ID поста: {post.id}</h3>
                            {post.title && <p>Название: {post.title}</p>}
                            {post.description && <p>Описание: {post.description}</p>}
                        </div>
                    </div>
                );
                })}
            </div>

            {/* ЗАМЕНИТЬ НА ЛОАДЕР, ПОМЕНЯТЬ РЕЛЕТИВ */}
            {isFetchingNextPage && (
                <div className="loading-indicator">
                    Загрузка следующих постов...
                </div>
            )}
            </div>
        </div>
    );
};

export default MobileFeedSection;