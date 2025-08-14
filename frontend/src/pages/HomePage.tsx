import { FunctionComponent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
        // You might want to add a verification step here to check if the token is still valid
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const onFrameClick = useCallback(() => {
    navigate("/new-network");
  }, [navigate]);

  const onMyEventsClick = useCallback(() => {
    navigate("/my-events");
  }, [navigate]);

  const onFrameClick1 = useCallback(() => {
    navigate("/my-account");
  }, [navigate]);

  const onFrameClick2 = useCallback(() => {
    localStorage.removeItem('token'); // Clear the token on logout
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.homePage}>
      <div className={styles.seachEventParent}>
        <button className={styles.seachEvent} onClick={onFrameClick}>
          <div className={styles.frame} />
          <div className={styles.searchEvent}>New Network</div>
        </button>
        <button className={styles.myEvents} onClick={onMyEventsClick}>
          <div className={styles.frame1} />
          <div className={styles.myEvents1}>My Events</div>
        </button>
        <button className={styles.myAccounts} onClick={onFrameClick1}>
          <div className={styles.frame} />
          <div className={styles.myAccount}>My Account</div>
        </button>
        <button className={styles.logOut} onClick={onFrameClick2}>
          <div className={styles.frame3} />
          <div className={styles.logOut1}>Log out</div>
        </button>
      </div>
      <b className={styles.home}>Home</b>
    </div>
  );
};

export default HomePage;