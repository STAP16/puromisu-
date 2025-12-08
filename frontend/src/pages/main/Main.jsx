import Clock from "../../ArtComponents/Clock";
import Planet from "../../ArtComponents/Planet";
import styles from "./Main.module.css";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PlanetBlock = () => {
  return (
    <div className={styles.wiggleWrapper}>
      <div className={styles.wiggle}>
        <Planet />
      </div>
    </div>
  );
};

export default function Main() {
  const { userData } = useAuth();

  return (
    <div className={styles.pageCont}>
      <PlanetBlock />
      <div className={styles.mainPage}>
        <div className="pageContent">
          <div className={styles.clockSection}>
            <Clock />
          </div>
          <div className="infoBlock">
            <h2>
              Welcome {userData.username}, check your promises id:
              {userData.id}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
