import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import popOs from "../../assets/popOs.png";
import DateTime from "./DateTime";
import BatteryContainer from "./BatteryContainer";
import { FaApple } from "react-icons/fa6";

interface NavbarProps {
    setBrightness: (brightness: number) => void;
    brightness: number;
}

const Navbar: React.FC<NavbarProps> = ({ setBrightness, brightness }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
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
