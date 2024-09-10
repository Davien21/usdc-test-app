import React from "react";

import styles from "./footer.module.scss";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className={`${styles["container"]} bg-black-2 text-white`}>
      <div className="text-center">Footer</div>
    </footer>
  );
}

export { Footer };
