/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion, stagger } from "framer-motion";
import styles from "./project-card.module.scss";
import DownArrowIcon from "../../../assets/images/icons/DownArrow";
import MoverIcon from "../../../assets/images/icons/MoverIcon";

// import { DownArrowIcon } from "../../../assets/images/svgs/index";
// import { MoverIcon } from "../../../assets/images/svgs/index";

export const ProjectCard = ({ constraints, hasLoaded, index }) => {
  const staggerMenuItems = stagger(0.1, { ease: "linear", from: 2 });

  return (
    <motion.div
      className={`${styles["container"]} `}
      drag
      dragConstraints={constraints}
      dragElastic={0.1}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.3 }}
      // animate={hasLoaded && { opacity: 1, scale: 1 }}
      // whileInView={true && { opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 200,
        duration: 0.4,
        delay: staggerMenuItems(index, 6),
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
    >
      <div>
        <motion.div className={`${styles["initial-state"]} gap-x-3`}>
          <div className="ml-[12px]">
            <MoverIcon />
          </div>
          <div className={`${styles["img-container"]}`}>
            <img
              width={153}
              height={115}
              alt=""
              draggable={false}
              placeholder={"empty"}
              src="https://res.cloudinary.com/davien21/image/upload/v1713022106/portfolio/project-preview_ollr98.jpg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className={`text-grey-3 ${styles["year"]}`}>2021</p>
            <p className={`text-3xl font-bold ${styles["name"]}`}>Rollover</p>
          </div>
          <div className={`text-3xl font-bold ${styles["arrow-container"]}`}>
            <motion.div>
              <div>
                <DownArrowIcon />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
