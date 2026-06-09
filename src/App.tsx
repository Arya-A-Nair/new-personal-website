import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./components/Container";
import styles from "./App.module.css";
import Cam from "./assets/Cam.png";
import { useIsMobile } from "./hooks/useIsMobile";

const App: React.FC = () => {
  const isMobile = useIsMobile(600);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.href.includes(
        "https://arya-a-nair.github.io/new-personal-website/"
      )
    ) {
      window.location.href = "https://www.arya-nair.in/";
    }
  }, []);

  if (isMobile) {
    return (
      <div className={styles.phoneFrame}>
        <div className={styles.phoneScreen}>
          <div className={styles.dynamicIsland} />
          <Container />
          <button
            className={styles.homeIndicator}
            onClick={() => navigate("/")}
            aria-label="Go to home screen"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.laptopScreen}>
      <div className={styles.cameraIcon}>
        <img src={Cam} alt="cameraIcon"></img>
      </div>
      <div className={styles.wrapper}>
        <Container />
      </div>
      <div className={styles.laptopBase}>Arya-A-Nair</div>
    </div>
  );
};

export default App;
