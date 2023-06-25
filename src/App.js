import Container from "./components/Container";
import styles from "./App.module.css";
import Cam from "./assets/Cam.png";

function App() {
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
}

export default App;
