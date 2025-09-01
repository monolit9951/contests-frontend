import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
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

  const posts = [
    "68ad936c4437153ad8d1c544",
    "68af10974437153ad8d1c631",
    "68aefd0d4437153ad8d1c5d9",
    "68ac653d4437153ad8d08d14",
    "68ac653d4437153ad8d08d60",
  ];

  // --- работа с query ---
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentWorkId = searchParams.get("workId");
  const initialIndex = posts.findIndex((p) => p === currentWorkId);
  const startIndex = initialIndex !== -1 ? initialIndex : 0;

  const [[index, direction], setIndex] = useState<[number, "up" | "down"]>([
    startIndex,
    "up",
  ]);

  // обновляем query при смене поста
  useEffect(() => {
    navigate(`/battles?workId=${posts[index]}`, { replace: true });
  }, [index, navigate]);

  const handleSwipe = (dir: "up" | "down") => {
    if (dir === "up" && index < posts.length - 1) {
      setIndex([index + 1, "up"]);
    } else if (dir === "down" && index > 0) {
      setIndex([index - 1, "down"]);
    }
  };

  return (
    <div className="battlesPage">
      <Helmet>
        <title>DareBay | Battles</title>
        <meta property="og:title" content="All contests, main page" />
      </Helmet>

      <h2>BattlesPage</h2>

      {isMobile && (
        <div className="feed_wrapper">
          <div className="feed">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={posts[index]}
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
                  if (info.offset.y < -100) handleSwipe("up");
                  if (info.offset.y > 100) handleSwipe("down");
                }}
              >
                <MobileWorkPreview workId={posts[index]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
