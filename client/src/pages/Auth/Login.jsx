import React, { useState } from "react";
import styles from "./Login.module.css";
import loginImage from "../../assets/login.png";
import { Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/authServices";
import { getErrorMessage } from "../../util/GetError";

function Login() {
  const [username, setUsername] = useState("johndoe");
  const [password, setPassword] = useState("john@123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await AuthServices.loginUser({ username, password });
      localStorage.setItem("toDoAppUser", JSON.stringify(response.data));
      message.success("Login successful!");
      navigate("/to-do-list");
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.login__card}>
        <img src={loginImage} alt="login image" />
        <h2>Login</h2>
        <div className={styles.input__wrapper}>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input__wrapper}>
          <Input.Password
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input__info}>
          New User? <Link to="/register">Register</Link>
        </div>
        <Button
          type="primary"
          loading={loading}
          disabled={!username || !password}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
