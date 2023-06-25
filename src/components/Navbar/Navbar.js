import React from "react";
import styles from "./Navbar.module.css";
import popOs from "../../assets/popOs.png";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={popOs} />
            </div>
            <DateTime />
            <BatteryContainer />
        </div>
    );
};

export default Navbar;
