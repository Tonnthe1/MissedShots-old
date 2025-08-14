import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";
import styles from "./SignUp.module.css";
import CustomAlert from '../components/CustomAlert';

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'info', title: string, message: string } | null>(null);

  const handleSignUp = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }
      
      const response = await signup(formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate("/");
      } else {
        setAlert({ type: 'error', title: 'Error', message: response.message || 'Error creating account' });
      }
    } catch (error: any) {
      setAlert({ type: 'error', title: 'Error', message: error.response?.data?.message || 'An unexpected error occurred' });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePic(event.target.files[0]);
    }
  };

  return (
    <div className={styles.signUp}>
      <b className={styles.signUp2}>Sign Up</b>
      <div className={styles.realName}>
        <b className={styles.bigName}>Ur Name</b>
        <div className={styles.frame} />
        <input
          className={styles.name}
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.email}>
        <b className={styles.bigEmail}>Ur Email</b>
        <div className={styles.frame} />
        <input
          className={styles.email1}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      <div className={styles.password}>
          <b className={styles.bigPassword}>Password</b>
          <div className={styles.frame1} />
          <input
            className={styles.password1}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className={styles.backToEvent} onClick={() => document.getElementById('fileInput')?.click()}>
        <div className={styles.home} />
        <b className={styles.home1}>Upload Your Profile Pic</b>
      </button>
      <input 
        id="fileInput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <button className={styles.signInParent} onClick={handleSignUp}>
        <img className={styles.signInIcon} alt="" src="/sign-in.svg" />
        <div className={styles.signUp1}>Sign Up</div>
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

export default SignUp;