import styles from "./text-marquee.module.scss";

export const TextMarquee = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styles["home__hero__content"]}`}>
      <div className={`${styles["home__hero__marquee"]} `}>
        <h1 className={`${styles["home__hero__title"]}`}>{children}&nbsp;</h1>
        <h1 className={`${styles["home__hero__title"]}`} aria-hidden="true">
          {children}&nbsp;
        </h1>
      </div>
    </div>
  );
};
