import React from "react";
import styles from "./css/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <h3>Malik Pidr</h3>
          <ul>
            <li>
              <a href="#">О проекте</a>
            </li>
            <li>
              <a href="#">Поддержать проект</a>
            </li>
            <li>
              <a href="#">Заказать фильм</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Вопросы и ответы (FAQ)</h3>
          <ul>
            <li>
              <a href="#">Служба поддержки</a>
            </li>
            <li>
              <a href="#">Чат Telegram</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Заявка на удаление контента</h3>
          <ul>
            <li>
              <a href="#">Правообладателям</a>
            </li>
            <li>
              <a href="#">Пользовательское соглашение</a>
            </li>
            <li>
              <a href="#">Политика конфиденциальности</a>
            </li>
          </ul>
        </div>
      </div>
      <p>&copy; 2024 Malik Pidr</p>
    </footer>
  );
};

export default Footer;
