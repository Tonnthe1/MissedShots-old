import React, { FunctionComponent, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import styles from "./Login.module.css";
import CustomAlert from '../components/CustomAlert';

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'info', title: string, message: string } | null>(null);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.token) {
        navigate("/");
      } else {
        setAlert({ type: 'error', title: 'Error', message: response.message || 'Invalid email or password' });
      }
    } catch (error: any) {
      setAlert({ type: 'error', title: 'Error', message: error.response?.data?.message || 'Error logging in' });
    }
  };

  const onDontHaveAnClick = useCallback(() => {
    navigate("/sign-up");
  }, [navigate]);

  return (
    <div className={styles.login}>
      <b className={styles.login2}>Login</b>
      <section className={styles.email}>
        <b className={styles.bigEmail}>Ur Email</b>
        <div className={styles.frame} />
        <input
          className={styles.email1}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>
      <section className={styles.password}>
        <b className={styles.bigPassword}>Password</b>
        <div className={styles.frame1} />
        <input
          className={styles.password1}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <button className={styles.signInParent} onClick={handleLogin}>
        <img className={styles.signInIcon} alt="" src="/sign-in.svg" />
        <div className={styles.login1}>Login</div>
      </button>
      <button
        className={styles.dontHaveAnContainer}
        onClick={onDontHaveAnClick}
      >
        <span className={styles.dontHaveAnContainer1}>
          <p className={styles.dontHaveAn}>Don't have an account?</p>
          <p className={styles.signUpNow}>
            <b className={styles.signUpNow1}>SIGN UP NOW</b>
          </p>
        </span>
      </button>
      {alert && (
        <CustomAlert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default Login;