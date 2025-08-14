import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PersonalInfoPage.module.css";
import { getPersonalInfo, addNetworkConnection } from '../services/api';

interface PersonalInfo {
  name: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  instagram: string;
  twitter: string;
  github: string;
  facebook: string;
  wechat: string;
  youtube: string;
  profilePic: string;
}

const PersonalInfoPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [showNameForm, setShowNameForm] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPersonalInfo(id);
    }
  }, [id]);

  const fetchPersonalInfo = async (userId: string) => {
    try {
      const info = await getPersonalInfo(userId);
      setPersonalInfo(info);
    } catch (error) {
      console.error('Error fetching personal info:', error);
    }
  };

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id && visitorName) {
      try {
        await addNetworkConnection({ name: visitorName, email: '', phone: '' });
        setShowNameForm(false);
      } catch (error) {
        console.error('Error adding network connection:', error);
      }
    }
  };

  if (showNameForm) {
    return (
      <div className={styles.nameForm}>
        <h2>Please enter your name to view this profile</h2>
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  if (!personalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.personalInfoPage}>
      <b className={styles.home}>Personal Info</b>
      <img
        className={styles.personalInfoPageChild}
        alt=""
        src={personalInfo.profilePic || "/default-profile-pic.png"}
      />
      <div className={styles.textBox}>
        <div className={styles.displaybox} />
        <div className={styles.email}>{personalInfo.email}</div>
        <div className={styles.displaybox1} />
        <div className={styles.linkedin}>{personalInfo.linkedin}</div>
        <div className={styles.displaybox2} />
        <div className={styles.whatsappPhoneNumber}>{personalInfo.whatsapp}</div>
        <div className={styles.displaybox3} />
        <div className={styles.instagram}>{personalInfo.instagram}</div>
        <div className={styles.displaybox4} />
        <div className={styles.twitter}>{personalInfo.twitter}</div>
        <div className={styles.displaybox5} />
        <div className={styles.github}>{personalInfo.github}</div>
        <div className={styles.displaybox6} />
        <div className={styles.facebook}>{personalInfo.facebook}</div>
        <div className={styles.displaybox7} />
        <div className={styles.wechat}>{personalInfo.wechat}</div>
        <div className={styles.displaybox8} />
        <div className={styles.youtube}>{personalInfo.youtube}</div>
        <button className={styles.backToEvent} onClick={onBackClick}>
          <div className={styles.home1} />
          <b className={styles.home2}>Back</b>
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoPage;