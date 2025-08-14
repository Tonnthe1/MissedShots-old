import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyAccount.module.css";
import { updateUserPreferences } from '../services/api';
import CustomToggle from './CustomToggle';

const MyAccount: React.FC = () => {
  const navigate = useNavigate();

  const [toggleStates, setToggleStates] = useState({
    email: false,
    linkedin: false,
    whatsapp: false,
    instagram: false,
    twitter: false,
    github: false,
    facebook: false,
    wechat: false,
    youtube: false,
  });

  const onBackToHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const savePreferences = async () => {
      try {
        await updateUserPreferences(toggleStates);
      } catch (error) {
        console.error('Failed to update preferences:', error);
      }
    };

    savePreferences();
  }, [toggleStates]);

  return (
    <div className={styles.myAccount}>
      <div className={styles.email}>
        <input
          className={styles.emailDisplay}
          placeholder="Email Display"
          type="email"
        />
      </div>
      <button className={styles.newPassword}>
        <input
          className={styles.newPassword1}
          placeholder="New Password"
          type="text"
        />
        <div className={styles.checkMark}>
          <img
            className={styles.checkmark641Icon}
            alt=""
            src="/checkmark64-1@2x.png"
          />
        </div>
      </button>
      <button className={styles.checkMark1}>
        <img
          className={styles.checkmark641Icon}
          alt=""
          src="/checkmark64-1@2x.png"
        />
      </button>
      <button className={styles.backToHome} onClick={onBackToHomeClick}>
        <div className={styles.home} />
        <b className={styles.home1}>Back to Home</b>
      </button>
      <div className={styles.toggleToMake}>
        Toggle to make information public:
      </div>

      
      <div className={styles.linkedin}>
        <input
          className={styles.instagram}
          placeholder="LinkedIn"
          type="text"
        />
      </div>
      <div className={styles.linkedin2}>
        <input className={styles.instagram} placeholder="Email" type="text" />
      </div>
      <div className={styles.linkedin3}>
        <input
          className={styles.whatsappPhoneNumber}
          placeholder="Whatsapp/ Phone Number"
          type="text"
        />
      </div>
      <div className={styles.linkedin4}>
        <input
          className={styles.instagram}
          placeholder="Instagram"
          type="text"
        />
      </div>
      <div className={styles.linkedin5}>
        <input className={styles.twitter} placeholder="Twitter" type="text" />
      </div>
      <div className={styles.linkedin6}>
        <input className={styles.twitter} placeholder="Github" type="text" />
      </div>
      <div className={styles.linkedin7}>
        <input className={styles.twitter} placeholder="Facebook" type="text" />
      </div>
      <div className={styles.linkedin8}>
        <input className={styles.twitter} placeholder="Wechat" type="text" />
      </div>
      <div className={styles.linkedin9}>
        <input className={styles.twitter} placeholder="Youtube" type="text" />
      </div>
      <img 
        className={styles.toggleIcon} 
        alt="" 
        src={toggleStates.email ? "/toggle-on-email.svg" : "/toggle.svg"}
        onClick={() => handleToggle('email')}
      />
      <img 
        className={styles.toggleIcon1} 
        alt="" 
        src={toggleStates.linkedin ? "/toggle-on-linkedin.svg" : "/toggle1.svg"}
        onClick={() => handleToggle('linkedin')}
      />
      <img 
        className={styles.toggleIcon2} 
        alt="" 
        src={toggleStates.whatsapp ? "/toggle-on-whatsapp.svg" : "/toggle2.svg"}
        onClick={() => handleToggle('whatsapp')}
      />
      <img 
        className={styles.toggleIcon3} 
        alt="" 
        src={toggleStates.instagram ? "/toggle-on-instagram.svg" : "/toggle3.svg"}
        onClick={() => handleToggle('instagram')}
      />
      <img 
        className={styles.toggleIcon4} 
        alt="" 
        src={toggleStates.twitter ? "/toggle-on-twitter.svg" : "/toggle4.svg"}
        onClick={() => handleToggle('twitter')}
      />
      <img 
        className={styles.toggleIcon5} 
        alt="" 
        src={toggleStates.github ? "/toggle-on-github.svg" : "/toggle5.svg"}
        onClick={() => handleToggle('github')}
      />
      <img 
        className={styles.toggleIcon6} 
        alt="" 
        src={toggleStates.facebook ? "/toggle-on-facebook.svg" : "/toggle6.svg"}
        onClick={() => handleToggle('facebook')}
      />
      <img 
        className={styles.toggleIcon7} 
        alt="" 
        src={toggleStates.wechat ? "/toggle-on-wechat.svg" : "/toggle7.svg"}
        onClick={() => handleToggle('wechat')}
      />
      <img 
        className={styles.toggleIcon8} 
        alt="" 
        src={toggleStates.youtube ? "/toggle-on-youtube.svg" : "/toggle8.svg"}
        onClick={() => handleToggle('youtube')}
      />
    </div>
  );
};

export default MyAccount;