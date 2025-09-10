import { useState, useRef, useCallback, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./mobileFeedSection.scss";
import { fetchFeedWorks } from "pages/feedPage/model/services/fetchWorks";

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

  const feedRef = useRef(null);

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
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
    setIsDragging(true);
    setTransition("none");
  }, []);

  const handleTouchMove = useCallback(
    (e: any) => {
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
      } else if (diff > 0 && currentIndex === 0) {
        // свайп вниз на первом элементе (предыдущего нет)
        console.log("Попытка свайпа вниз на первом элементе - предыдущего поста нет");
        setTranslate(0);
      } else if (diff < 0 && currentIndex < allPosts.length - 1) {
        // свайп вверх - переходим к следующему посту
        setTranslate(-100);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setTransition("none");
          setTranslate(0);
        }, 300);
      } else if (diff < 0 && currentIndex === allPosts.length - 1) {
        // свайп вверх на последнем элементе (следующего нет)
        console.log("Попытка свайпа вверх на последнем элементе - следующего поста нет");
        setTranslate(0);
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
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Отображаем загрузку
  if (isLoading) {
    return (
      <div className="tiktok-feed">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
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

      {isFetchingNextPage && (
        <div className="loading-indicator">
          Загрузка следующих постов...
        </div>
      )}
    </div>
  );
};

export default MobileFeedSection;