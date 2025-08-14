import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyEvents.module.css";

const MyEvents: FunctionComponent = () => {
  const navigate = useNavigate();

  const onFrameClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='searchEventsText']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.myEvents}>
      <div className={styles.topBar}>
        <b className={styles.searchEvents} data-scroll-to="searchEventsText">
          My Events
        </b>
        <div className={styles.backToTop}>
          <button className={styles.frame} onClick={onFrameClick} />
          <b className={styles.backToTop1}>Back to top</b>
          <button className={styles.home} onClick={onHomeClick} />
          <b className={styles.home1}>Home</b>
        </div>
      </div>
      <div className={styles.searchBox}>
        <div className={styles.frame1} />
        <input className={styles.search} placeholder="Search..." type="text" />
      </div>
      <nav className={styles.event20}>
        <div className={styles.event20Child} />
        <div className={styles.container}>
          <div className={styles.wednesdayJune05}>
            Wednesday, June 06, 2024 01:13 AM
          </div>
          <div className={styles.addressWrapper}>
            <div className={styles.address}>Address</div>
          </div>
          <div className={styles.sd}>sd</div>
          <div className={styles.nameOfEvent}>
            <b className={styles.address}>Hanson</b>
          </div>
        </div>
      </nav>
      <nav className={styles.event21}>
        <div className={styles.event20Child} />
        <div className={styles.container}>
          <div className={styles.wednesdayJune05}>
            Wednesday, June 06, 2024 01:13 AM
          </div>
          <div className={styles.addressWrapper}>
            <div className={styles.address}>Address</div>
          </div>
          <div className={styles.sd}>sd</div>
          <div className={styles.nameOfEvent}>
            <b className={styles.address}>Hanson</b>
          </div>
        </div>
      </nav>
      <div className={styles.event17}>
        <div className={styles.event20Child} />
        <div className={styles.container}>
          <div className={styles.wednesdayJune05}>
            Wednesday, June 05, 2024 01:13 AM
          </div>
          <div className={styles.addressWrapper}>
            <div className={styles.address}>Address</div>
          </div>
          <div className={styles.sd}>sd</div>
          <div className={styles.nameOfEvent}>
            <b className={styles.address}>Hanson</b>
          </div>
        </div>
      </div>
      <div className={styles.event18}>
        <div className={styles.event20Child} />
        <div className={styles.container}>
          <div className={styles.wednesdayJune05}>
            Wednesday, June 05, 2024 01:13 AM
          </div>
          <div className={styles.addressWrapper}>
            <div className={styles.address}>Address</div>
          </div>
          <div className={styles.sd}>sd</div>
          <div className={styles.nameOfEvent}>
            <b className={styles.address}>Hanson</b>
          </div>
        </div>
      </div>
      <div className={styles.event15}>
        <div className={styles.event20Child} />
        <div className={styles.container}>
          <div className={styles.wednesdayJune05}>
            Wednesday, June 05, 2024 01:13 AM
          </div>
          <div className={styles.addressWrapper}>
            <div className={styles.address}>Address</div>
          </div>
          <div className={styles.sd}>sd</div>
          <div className={styles.nameOfEvent}>
            <b className={styles.address}>Hanson</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
