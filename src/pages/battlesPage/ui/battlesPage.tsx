import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AnimatePresence,motion } from "framer-motion";
import { MobileWorkPreview } from "shared/ui/mobileWorkPreview";

import "./battlesPage.scss"

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

    const posts = [101, 102, 103, 104, 105];

    const [[index, direction], setIndex] = useState<[number, "up" | "down"]>([0, "up"]);

    const handleSwipe = (dir: "up" | "down") => {
        if (dir === "up" && index < posts.length - 1) {
        setIndex([index + 1, "up"]);
        } else if (dir === "down" && index > 0) {
        setIndex([index - 1, "down"]);
        }
    };

    return(
        <div className="battlesPage">
            <Helmet>
                <title>DareBay | Battles</title>
                <meta property="og:title" content="All contestsm, main page" />
            </Helmet>

            <h2>BattlesPage</h2>
                <div className="feed_wrapper">
                    {isMobile && <div className="feed">
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
                            {isMobile && <MobileWorkPreview/>}
                            </motion.div>
                        </AnimatePresence>
                    </div>}
                </div>


        </div>
    )
}