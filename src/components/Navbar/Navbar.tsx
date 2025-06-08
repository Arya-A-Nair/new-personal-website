import React from "react";
import styles from "./Navbar.module.css";
import popOs from "../../assets/popOs.png";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";

interface NavbarProps {
    setBrightness: (brightness: number) => void;
    brightness: number;
}

const Navbar: React.FC<NavbarProps> = ({ setBrightness, brightness }) => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={popOs} alt="PopOS logo" />
            </div>
            <DateTime />

            <BatteryContainer
                setBrightness={setBrightness}
                brightness={brightness}
            />
        </div>
    );
};

export default Navbar;
