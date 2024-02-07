import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const Login = () => {
  const { handleLogin, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSave = () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполните все поля!");
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      handleLogin(formData, email);
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
        />
        {showPassword ? (
          <FaEyeSlash
            className={styles.icon}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEye
            className={styles.icon}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
      <button className={styles.button} onClick={handleSave}>
        Войти
      </button>
    </div>
  );
};

export default Login;
