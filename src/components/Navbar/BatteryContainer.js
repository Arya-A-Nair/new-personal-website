/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import batteryIcon from "../../assets/battery.png";
import batteryCharging from "../../assets/batteryCharging.png";
import styles from "./BatteryContianer.module.css";
import { useBattery } from "react-use";
import {
    BsBatteryCharging,
    BsBatteryFull,
    BsFillBrightnessHighFill,
} from "react-icons/bs";
import { Slider } from "@mui/material";

const BatteryContainer = ({ setBrightness, brightness }) => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const battery = useBattery();
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

    const { isSupported, level, charging } = battery;

    return (
        <>
            {openMenu && (
                <div
                    className={styles.overlay}
                    onClick={() => setOpenMenu(false)}
                >
                    <div className={styles.menu}>
                        <div className={styles.menuItem}>
                            {isSupported && !charging ? (
                                <BsBatteryFull  size="1.2rem"/>
                            ) : (
                                <BsBatteryCharging size="1.2rem"/>
                            )}
                            {isSupported ? (level * 100).toFixed(0) : 100}
                            {"%"}
                        </div>
                        <div className={styles.menuItem}>
                            <BsFillBrightnessHighFill size="1.2rem"/>
                            <Slider
                                onChange={(e) => setBrightness(e.target.value)}
                                min={0.1}
                                max={1}
                                step={0.01}
                                defaultValue={1}
                                value={brightness}
                                sx={{
                                    "& .MuiSlider-thumb": {
                                        color: "black",
                                    },
                                    "& .MuiSlider-track": {
                                        color: "black",
                                    },
                                    "& .MuiSlider-rail": {
                                        color: "#acc4e4",
                                    },
                                    "& .MuiSlider-active": {
                                        color: "#acc4e4",
                                    },
                                    "& .Muislider-thumbColorPrimary": {
                                        color: "#acc4e4",
                                    },
                                }}
                            />
                        </div>
                        <div className={styles.separator}></div>
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
                {!isMobile &&
                    `${isSupported ? (level * 100).toFixed(0) : 100} ${"%"}`}
            </div>
        </>
    );
};

export default BatteryContainer;
