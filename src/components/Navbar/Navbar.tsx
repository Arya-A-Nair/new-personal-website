import React from "react";
import styles from "./Navbar.module.css";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";
import { FaApple } from "react-icons/fa6";
import { useIsMobile } from "../../hooks/useIsMobile";

interface NavbarProps {
    setBrightness: (brightness: number) => void;
    brightness: number;
}

const Navbar: React.FC<NavbarProps> = ({ setBrightness, brightness }) => {
    const isMobile = useIsMobile(600);

    return (
        <div className={styles.container}>
            {!isMobile && (
                <div className={styles.logoContainer}>
                    <FaApple className={styles.appleIcon} />
                </div>
            )}
            <DateTime />

            <BatteryContainer
                setBrightness={setBrightness}
                brightness={brightness}
            />
        </div>
    );
};

export default Navbar;
