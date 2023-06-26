import React from "react";
import batteryIcon from "../../assets/battery.png";
import batteryCharging from "../../assets/batteryCharging.png";
import styles from "./BatteryContianer.module.css";
import { useBattery } from "react-use";

const BatteryContainer = () => {
    const battery = useBattery();

    const { isSupported, level, charging } = battery;

    return (
        <div className={styles.container}>
            <img
                src={isSupported && !charging ? batteryIcon : batteryCharging}
            />
            {isSupported ? (level * 100).toFixed(0) : 100}
            {"%"}
        </div>
    );
};

export default BatteryContainer;
