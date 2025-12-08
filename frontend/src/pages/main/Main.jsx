import Clock from "../../ArtComponents/Clock";
import Planet from "../../ArtComponents/Planet";
import styles from "./Main.module.css";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

import Button from "../../ArtComponents/Button";
import { useLogout } from "../../hooks/useLogout";
import Loader from "../../ArtComponents/Loader";

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
  const { loading, logout } = useLogout();
  // Количеество обещаний:
  // Посмотреть все
  // Удалить
  const navigate = useNavigate();

  const handleOpenPromises = () => {
    return navigate(`/promises/:${userData.id}`);
  };

  const handleLogout = async () => {
    const logOutStatus = await logout();
    if (logOutStatus.error) {
      return console.error(logOutStatus.error);
    }
    return navigate("/login");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.pageCont}>
      <PlanetBlock />
      <div className={styles.mainPage}>
        <div className="pageContent">
          <div className={styles.clockSection}>
            <Clock />
          </div>
          <div className="infoBlock">
            <h2>Hello {userData.username}!</h2>
            <h3>Click "My Promises" to see all your promises</h3>
          </div>
          <div className="buttonSection">
            <Button onClick={handleOpenPromises}>My Promises</Button>
          </div>
          <div className="centerButton">
            <div className="buttonSection logout">
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
