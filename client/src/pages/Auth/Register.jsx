import React, { useState } from "react";
import styles from "./Login.module.css";
import registerImage from "../../assets/login.png";
import { Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/authServices";
import { getErrorMessage } from "../../util/GetError";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await AuthServices.registerUser({
        firstName,
        lastName,
        username,
        password,
      });
      message.success("Register successful!");
      navigate("/login");
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.login__card}>
        <img src={registerImage} alt="register image" />
        <h2>Register</h2>
        <div className={styles.input__inline__wrapper}>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.input__wrapper}>
            <Input
              placeholder="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
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
          Already a user? <Link to="/login">Login</Link>
        </div>
        <Button
          type="primary"
          disabled={!username || !password}
          onClick={handleRegister}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Register;
