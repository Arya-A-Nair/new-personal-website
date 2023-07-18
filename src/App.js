import Container from "./components/Container";
import styles from "./App.module.css";
import Cam from "./assets/Cam.png";
import { useEffect, useState } from "react";
import AboutUs from "./components/AboutUs";
import Projects from "./components/Projects";

function App() {
    console.log(
      window.location.href.includes("https://arya-a-nair.github.io/new-personal-website/")
    );
    useEffect(() => {
        if (
            window.location.href.includes("https://arya-a-nair.github.io/new-personal-website/")
        ) {
            window.location.href =
                "https://www.arya-nair.in/";
        }
    }, []);

    return (
        <>
            <div className={styles.laptopScreen}>
                <div className={styles.cameraIcon}>
                    <img src={Cam} alt="cameraIcon"></img>
                </div>
                <div className={styles.wrapper}>
                    <Container />
                </div>
                <div className={styles.laptopBase}>Arya-A-Nair</div>
            </div>
        </>
    );
}

export default App;
