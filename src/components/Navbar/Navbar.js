import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import popOs from "../../assets/popOs.png";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";

const Navbar = ({ setBrightness }) => {
    

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={popOs} />
            </div>
            <DateTime />

            <BatteryContainer setBrightness={setBrightness} />
        </div>
    );
};

export default Navbar;