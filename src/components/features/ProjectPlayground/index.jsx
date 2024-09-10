import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import styles from "./project-playground.module.scss";
import { ProjectCard } from "../ProjectCard";
import { TextMarquee } from "../../common/TextMarquee";

// Define motion variants for the container that holds the ProjectCards

export const ProjectPlayground = () => {
  const constraintsRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [scope, animate] = useAnimate();

  useLayoutEffect(() => {
    if (!scope.current) return;
    if (!hasLoaded) return;
    animate(
      ".title",
      { opacity: [0, 0.1, 0.3, 1] },
      {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.5, 0.8, 1],
        type: "keyframes",
      }
    );
    animate(
      ".items > div",
      { opacity: 1, scale: 1 },
      {
        duration: 0.5,
        delay: stagger(0.2, { from: 2, startDelay: 0.7 }),
        ease: "linear",
        type: "spring",
        damping: 20,
        stiffness: 200,
      }
    );
  }, [animate, hasLoaded, scope]);

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.container}
        onClick={() => setHasLoaded(true)}
        ref={scope}
        // Apply variants to the motion.div
      >
        <div className={styles["bg-img"]}>
          <img
            height={990}
            width={1440}
            alt=""
            src="https://res.cloudinary.com/davien21/image/upload/v1713006456/portfolio/paper-bg_fjebki.webp"
          />
        </div>
        <motion.div
          className={`${styles["title"]} title`}
          // transition={{ duration: 0.5, delay: staggerPlaygroundItems(1, 2) }}
          initial={{ opacity: 0 }}
          // animate={hasLoaded && { opacity: 1, scale: 1 }}
        >
          <TextMarquee>SOME OF MY FAVOURITE WORK.</TextMarquee>
        </motion.div>
        <motion.div
          className={`${styles["items"]} items`}
          ref={constraintsRef}
          // transition={{
          //   duration: 0.5,
          //   delay: staggerPlaygroundItems(2, 2),
          //   staggerChildren: 0.1,
          // }}
          // initial={{ opacity: 0 }}
          // animate={hasLoaded && { opacity: 1 }}
        >
          {[0, 0, 0, 0, 0, 0].map((_, i) => (
            <ProjectCard
              index={i}
              constraints={constraintsRef}
              key={i}
              hasLoaded={hasLoaded}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
