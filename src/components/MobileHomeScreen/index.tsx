import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BsGrid3X3Gap } from "react-icons/bs";
import styles from "./MobileHomeScreen.module.css";
import { WindowConfig } from "../../config/windowComponents";
import { personalInfo } from "../../data";
import drive from "../../assets/drive.png";

interface MobileHomeScreenProps {
  windowConfigs: WindowConfig[];
  onAppOpen: (windowId: string) => void;
  onTrophiesOpen: () => void;
}

const MobileHomeScreen: React.FC<MobileHomeScreenProps> = ({
  windowConfigs,
  onAppOpen,
  onTrophiesOpen,
}) => {
  const navigate = useNavigate();

  const linkApps = [
    {
      id: "github",
      label: "GitHub",
      icon: <FaGithub />,
      className: styles.githubIcon,
      action: () => window.open(personalInfo.socialLinks.github, "_blank"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedinIn />,
      className: styles.linkedinIcon,
      action: () => window.open(personalInfo.socialLinks.linkedin, "_blank"),
    },
    {
      id: "leetcode",
      label: "LeetCode",
      icon: <SiLeetcode />,
      className: styles.leetcodeIcon,
      action: () => window.open(personalInfo.socialLinks.leetcode, "_blank"),
    },
    {
      id: "resume",
      label: "Resume",
      icon: <AiOutlineFilePdf />,
      className: styles.resumeIcon,
      action: () => window.open(personalInfo.socialLinks.resume, "_blank"),
    },
    {
      id: "trophies",
      label: "Trophies",
      icon: <span className={styles.emojiIcon}>🏆</span>,
      className: styles.trophyIcon,
      action: onTrophiesOpen,
    },
    {
      id: "plain",
      label: "Plain View",
      icon: <img src={drive} alt="" className={styles.imageIcon} />,
      className: styles.plainIcon,
      action: () => navigate("/plain"),
    },
  ];

  // First four apps live in the iOS dock; the rest sit on the home screen.
  const dockApps = windowConfigs.slice(0, 4);
  const gridApps = windowConfigs.slice(4);

  return (
    <div className={styles.springboard}>
      <div className={styles.grid}>
        {gridApps.map(config => (
          <button
            key={config.id}
            className={styles.app}
            onClick={() => onAppOpen(config.id)}
            aria-label={config.description || `Open ${config.displayName}`}
          >
            <span className={styles.appIconWrapper}>
              <img src={config.icon} alt="" className={styles.appIconImage} />
            </span>
            <span className={styles.appLabel}>{config.displayName}</span>
          </button>
        ))}
        {linkApps.map(app => (
          <button
            key={app.id}
            className={styles.app}
            onClick={app.action}
            aria-label={app.label}
          >
            <span className={`${styles.appIconWrapper} ${app.className}`}>
              {app.icon}
            </span>
            <span className={styles.appLabel}>{app.label}</span>
          </button>
        ))}
        <button
          className={styles.app}
          onClick={() =>
            window.dispatchEvent(new CustomEvent("aryaos-command-centre"))
          }
          aria-label="Open Command Centre"
        >
          <span className={`${styles.appIconWrapper} ${styles.searchIcon}`}>
            <BsGrid3X3Gap />
          </span>
          <span className={styles.appLabel}>Search</span>
        </button>
      </div>

      <div className={styles.dock}>
        {dockApps.map(config => (
          <button
            key={config.id}
            className={styles.dockApp}
            onClick={() => onAppOpen(config.id)}
            aria-label={config.description || `Open ${config.displayName}`}
          >
            <img src={config.icon} alt="" className={styles.dockIconImage} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileHomeScreen;
