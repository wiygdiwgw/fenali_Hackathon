import React, { useState } from "react";
import styles from "./css/AuthPage.module.css";
import Login from "../components/Malik/Login";
import Register from "../components/Malik/Register";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <span
          className={`${styles.button} ${showLogin ? styles.active : ""}`}
          onClick={() => setShowLogin(true)}
        >
          Вход
        </span>
        <span
          className={`${styles.button} ${!showLogin ? styles.active : ""}`}
          onClick={() => setShowLogin(false)}
        >
          Регистрация
        </span>
      </div>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
};

export default AuthPage;
