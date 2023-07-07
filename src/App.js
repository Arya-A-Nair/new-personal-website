import Container from "./components/Container";
import styles from "./App.module.css";
import Cam from "./assets/Cam.png";
import { useEffect, useState } from "react";
import AboutUs from "./components/AboutUs";
import Projects from "./components/Projects";

function App() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600) {
                setIsMobile(false);
            } else {
                setIsMobile(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
