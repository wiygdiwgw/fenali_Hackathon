import React from "react";
import styles from "./css/Navbar.module.css";
import { IoBookmarkOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link className={styles.logoLink} to="/">
            MALIK PIDR
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.accBlock}>
          <div className={styles.searchBlock}>
            {/* Keep search functionality intact */}
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className={styles.iconBlock}>
            <IoBookmarkOutline className={styles.icon} />
          </div>
          <div className={styles.iconBlock}>
            <FaEye className={styles.icon} />
          </div>
          <div className={styles.login}>
            <Link to="/auth" className={styles.loginLink}>
              <RxAvatar className={styles.avatarIcon} />
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
