import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Event1.module.css";

const Event1: FunctionComponent = () => {
  const navigate = useNavigate();

  const onBackToEventClick = useCallback(() => {
    navigate("/search-events");
  }, [navigate]);

  const onEllipseImageClick = useCallback(() => {
    navigate("/personal-info-page");
  }, [navigate]);

  return (
    <div className={styles.event}>
      <div className={styles.topBar}>
        <b className={styles.eventName}>Display Name of the Event</b>
        <div className={styles.button}>
          <button className={styles.backToEvent} onClick={onBackToEventClick}>
            <div className={styles.home} />
            <b className={styles.home1}>Back to Events</b>
          </button>
          <button className={styles.myQrCode}>
            <div className={styles.home2} />
            <b className={styles.home3}>My QR Code</b>
          </button>
        </div>
      </div>
      <img
        className={styles.eventChild}
        alt=""
        src="/ellipse-2@2x.png"
        onClick={onEllipseImageClick}
      />
      <div className={styles.metNameAt}>Met #name at #time</div>
      <div className={styles.person}>
        <img className={styles.personChild} alt="" src="/ellipse-2@2x.png" />
        <div className={styles.metNameAt1}>Met #name at #time</div>
        <img
          className={styles.right2641Icon}
          alt=""
          src="/right-264-1@2x.png"
        />
      </div>
      <div className={styles.person1}>
        <img
          className={styles.right2641Icon1}
          alt=""
          src="/right-264-11@2x.png"
        />
        <img className={styles.personItem} alt="" src="/ellipse-2@2x.png" />
        <div className={styles.metNameAt2}>Met #name at #time</div>
      </div>
      <div className={styles.person2}>
        <img className={styles.personChild} alt="" src="/ellipse-2@2x.png" />
        <div className={styles.metNameAt1}>Met #name at #time</div>
        <img
          className={styles.right2641Icon}
          alt=""
          src="/right-264-1@2x.png"
        />
      </div>
    </div>
  );
};

export default Event1;
