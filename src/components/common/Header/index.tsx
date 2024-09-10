import React, { useState } from "react";
import styles from "./header.module.scss";

function Header() {
  return (
    <>
      <header className={`${styles.container} container text-center`}>
        <h1 className="uppercase text-lg">Header</h1>
      </header>
    </>
  );
}

export { Header };
