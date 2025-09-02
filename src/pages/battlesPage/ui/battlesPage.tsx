import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useInfiniteQuery } from "@tanstack/react-query";
import {  motion } from "framer-motion";
import { fetchFeedWorks } from "pages/feedPage/model/services/fetchWorks";
import { MobileWorkPreview } from "shared/ui/mobileWorkPreview";

import "./battlesPage.scss";

export const BattlesPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const variants = {
    enter: (dir: "up" | "down") => ({
      y: dir === "up" ? "100%" : "-100%",
    }),
    center: { y: 0 },
    exit: (dir: "up" | "down") => ({
      y: dir === "up" ? "-100%" : "100%",
    }),
  };

  // const posts = [
  //   "68ad936c4437153ad8d1c544",
  //   "68af10974437153ad8d1c631",
  //   "68aefd0d4437153ad8d1c5d9",
  //   "68ac653d4437153ad8d08d14",
  //   "68ac653d4437153ad8d08d60",
  // ];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    // isFetchNextPageError,
    isLoading
  } = useInfiniteQuery({
    queryKey:['feedWorks'],
    queryFn: fetchFeedWorks,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.content.length === 3 ? allPages.length : undefined,
  })

  const works = data?.pages.flatMap(page => page.content);

  console.log(works)

  const [[index, direction], setIndex] = useState<[number, "up" | "down"]>([
    0,
    "up",
  ]);


  const handleSwipe = (dir: "up" | "down") => {
    if (!works?.length) return; // 🔹 защита от undefined
    if (dir === "up" && index < works.length - 1) {
      setIndex([index + 1, "up"]);
    } else if (dir === "down" && index > 0) {
      setIndex([index - 1, "down"]);
    }
  };

  useEffect(() => {
    if (!works) return;

    // индекс предпоследнего элемента
    const penultimateIndex = works.length - 2;

    if (index >= penultimateIndex && hasNextPage) {
      fetchNextPage();
    }
  }, [index, works, hasNextPage, fetchNextPage]);

  return (
    <div className="battlesPage">
      <Helmet>
        <title>DareBay | Battles</title>
        <meta property="og:title" content="All contests, main page" />
      </Helmet>

      <h2>BattlesPage</h2>

      {isMobile && !isLoading && works && (
        <div className="feed_wrapper">
          <div className="feed">
<motion.div
  key={works[index].id} // вместо works[index]
  className="post"
  custom={direction}
  variants={variants}
  initial="enter"
  animate="center"
  exit="exit"
  transition={{ duration: 0.35 }}
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  onDragEnd={(_, info) => {
    if (info.offset.y < -100) handleSwipe("up")
    if (info.offset.y > 100) handleSwipe("down")
  }}
>
  <MobileWorkPreview work={works[index]} />
</motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
