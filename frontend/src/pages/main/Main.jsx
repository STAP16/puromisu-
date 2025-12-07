import Clock from "../../ArtComponents/Clock";
import Planet from "../../ArtComponents/Planet";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.pageCont}>
      <div className={styles.wiggleWrapper}>
        <div className={styles.wiggle}>
          <Planet />
        </div>
      </div>
      <div className={styles.mainPage}>
        <Clock />
      </div>
    </div>
  );
}
