import React, { useState } from "react";
import batteryIcon from "../../assets/battery.png";
import batteryCharging from "../../assets/batteryCharging.png";
import styles from "./BatteryContainer.module.css";
import { useBattery } from "react-use";
import {
  BsBatteryCharging,
  BsBatteryFull,
  BsFillBrightnessHighFill,
} from "react-icons/bs";
import { BatteryState } from "react-use/lib/useBattery";
import { useIsMobile } from "../../hooks/useIsMobile";

interface BatteryContainerProps {
  setBrightness: (brightness: number) => void;
  brightness: number;
}

const BatteryContainer: React.FC<BatteryContainerProps> = ({
  setBrightness,
  brightness,
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const battery = useBattery();
  const isMobile = useIsMobile(600);

  const batteryState = battery as BatteryState & { isSupported: boolean };
  const level = batteryState.isSupported ? batteryState.level : 1;
  const charging = batteryState.isSupported ? batteryState.charging : false;

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(parseFloat(event.target.value));
  };

  return (
    <>
      {openMenu && (
        <div className={styles.overlay} onClick={() => setOpenMenu(false)}>
          <div className={styles.menu}>
            <div className={styles.menuItem}>
              {batteryState.isSupported && !charging ? (
                <BsBatteryFull size="1.2rem" />
              ) : (
                <BsBatteryCharging size="1.2rem" />
              )}
              {batteryState.isSupported ? (level * 100).toFixed(0) : 100}
              {"%"}
            </div>
            <div className={styles.menuItem}>
              <BsFillBrightnessHighFill size="1.2rem" />
              <input
                type="range"
                className={styles.brightnessSlider}
                onChange={handleSliderChange}
                min={0.1}
                max={1}
                step={0.01}
                value={brightness}
                aria-label="Screen brightness"
              />
            </div>
            <div className={styles.separator}></div>
            <div className={styles.menuItem} onClick={() => location.reload()}>
              Restart
            </div>
            <div
              className={styles.menuItem}
              onClick={() => {
                setOpenMenu(false);
                window.dispatchEvent(new CustomEvent("aryaos-shutdown"));
              }}
            >
              Shut Down
            </div>
          </div>
        </div>
      )}

      <div className={styles.container} onClick={() => setOpenMenu(true)}>
        <img
          src={
            batteryState.isSupported && !charging
              ? batteryIcon
              : batteryCharging
          }
          alt="Battery status"
        />
        {!isMobile &&
          `${batteryState.isSupported ? (level * 100).toFixed(0) : 100} ${"%"}`}
      </div>
    </>
  );
};

export default BatteryContainer;
