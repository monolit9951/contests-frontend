import { useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchFeedWorks } from 'pages/feedPage/model/services/fetchWorks';
import { MobileWorkPreview } from 'shared/ui/mobileWorkPreview';

import './mobileFeedSection.scss'

const MobileFeedSection = () => {

    const [isDragging, setIsDragging] = useState(false);
    const [dragY, setDragY] = useState(0);
    const dragStartY = useRef(0);
    const direction = useRef<number>(0);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey:['feedWorks'],
        queryFn: fetchFeedWorks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
        lastPage.content.length === 3 ? allPages.length : undefined,
    });

      const works = data?.pages.flatMap(page => page.content);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragStart = (_: any, info: any) => {
    setIsDragging(true);
    dragStartY.current = info.point.y;
  };

  const handleDrag = (_: any, info: any) => {
    const currentDragY = info.point.y - dragStartY.current;
    setDragY(currentDragY);
    direction.current = currentDragY > 0 ? 1 : -1;
  };

    const handleDragEnd = (_: any, info: any) => {
        setIsDragging(false);
        const dragDistance = info.point.y - dragStartY.current;
        const dragVelocity = info.velocity.y;
        
        // Уменьшаем пороговые значения для более легкого свайпа
        const isFullSwipe = Math.abs(dragDistance) > window.innerHeight * 0.1 || Math.abs(dragVelocity) > 150;
        
        if (isFullSwipe && works) {
            if (direction.current > 0) {
                // Свайп ВНИЗ = переходим к ПРЕДЫДУЩЕМУ посту
                if (currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
                }
            } else if (currentIndex < works.length - 1) {
            // Свайп ВВЕРХ = переходим к СЛЕДУЮЩЕМУ посту
                setCurrentIndex(prev => prev + 1);
                
                // Загружаем следующую страницу, если приближаемся предпоследнему элементу
                if (currentIndex >= works.length - 2 && hasNextPage) {
                    fetchNextPage();
                }
            }
            
        }

        setDragY(0);
    };

    const dragProgress = Math.min(Math.abs(dragY) / (window.innerHeight * 0.4), 1);

    const slideVariants = {
        enter: (direction: number) => ({
                y: direction > 0 ? '-100%' : '100%',
                opacity: 0.5
        }),
        center: {
            y: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            y: direction > 0 ? '100%' : '-100%',
            opacity: 0.5
        })
    };

  return (
    <div className="battlesPage">

      {/* <h2>BattlesPage</h2> */}

      {!isLoading && works && works.length > 0 && (
        <div className="vertical-feed">
          <motion.div
            drag="y"
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
                  style={{
                    opacity: 1 - dragProgress * 0.3
                  }}
                >
                  <MobileWorkPreview work={works[currentIndex]} />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default MobileFeedSection