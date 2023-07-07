/* eslint-disable no-restricted-globals */
import React from "react";
import batteryIcon from "../../assets/battery.png";
import batteryCharging from "../../assets/batteryCharging.png";
import styles from "./BatteryContianer.module.css";
import { useBattery } from "react-use";

const BatteryContainer = () => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const battery = useBattery();

    const { isSupported, level, charging } = battery;

    return (
        <>
            {openMenu && (
                <div
                    className={styles.overlay}
                    onClick={() => setOpenMenu(false)}
                >
                    <div className={styles.menu}>
                        <div
                            className={styles.menuItem}
                            onClick={() => window.close()}
                        >
                            Shutdown
                        </div>
                        <div
                            className={styles.menuItem}
                            onClick={() => location.reload()}
                        >
                            Restart
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.container} onClick={() => setOpenMenu(true)}>
                <img
                    src={
                        isSupported && !charging ? batteryIcon : batteryCharging
                    }
                />
                {isSupported ? (level * 100).toFixed(0) : 100}
                {"%"}
            </div>
        </>
    );
};

export default BatteryContainer;
