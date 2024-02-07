import React from "react";
import styles from "./css/Navbar.module.css";
import { IoBookmarkOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FaEye } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <a className={styles.logo_1} href="#">
            MALIK PIDR
          </a>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.acc_block}>
          <div className={styles.search_block}>
            <input
              className={styles.search_block_1}
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className={styles.seperator}></div>
          <div className={styles.fav_block}>
            <IoBookmarkOutline className={styles.fav_block_1} />
          </div>
          <div className={styles.watched_block}>
            <FaEye className={styles.watched_block_1} />
          </div>
          <div className={styles.login}>
            <button className={styles.login_1}>
              <RxAvatar className={styles.login_2} />
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
