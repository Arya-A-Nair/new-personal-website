import React from "react";
import WindowBox from "../WindowBox/WindowBox";
import styles from "./AboutUs.module.css";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineAcademicCap, HiOutlineBriefcase } from "react-icons/hi";
import { personalInfo, experience, achievementNotes } from "../../data";

interface AboutUsProps {
  onClickClose: () => void;
  onClickMinimize?: () => void;
  setActiveElement: (element: string) => void;
  zIndexVal: number;
  activeElement: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  onClickClose,
  onClickMinimize,
  setActiveElement,
  zIndexVal,
  activeElement,
}) => {
  const socials = [
    {
      id: "github",
      label: "GitHub",
      icon: <FaGithub />,
      url: personalInfo.socialLinks.github,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: personalInfo.socialLinks.linkedin,
    },
    {
      id: "leetcode",
      label: "LeetCode",
      icon: <SiLeetcode />,
      url: personalInfo.socialLinks.leetcode,
    },
    {
      id: "email",
      label: "Email",
      icon: <AiOutlineMail />,
      url: personalInfo.socialLinks.email,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <FaWhatsapp />,
      url: personalInfo.socialLinks.whatsapp,
    },
  ];

  const currentRole = experience[0];

  return (
    <WindowBox
      onClickClose={onClickClose}
      onClickMinimize={onClickMinimize}
      windowId="AboutUs"
      setActive={() => setActiveElement("AboutUs")}
      zIndexVal={zIndexVal}
      offset={60}
      displayText="About Me"
      activeElement={activeElement === "AboutUs"}
      displayTextMobile={"About Me"}
    >
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.avatarRing}>
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className={styles.avatar}
            />
          </div>
          <h1 className={styles.name}>{personalInfo.name}</h1>
          <p className={styles.tagline}>{personalInfo.tagline}</p>

          <div className={styles.badges}>
            <span className={styles.badge}>
              <HiOutlineBriefcase aria-hidden="true" />
              {currentRole.position} @ {currentRole.companyName}
            </span>
            <span className={styles.badge}>
              <HiOutlineAcademicCap aria-hidden="true" />
              {personalInfo.education}
            </span>
          </div>

          <div className={styles.socialRow}>
            {socials.map(social => (
              <button
                key={social.id}
                className={styles.socialButton}
                onClick={() => window.open(social.url, "_blank")}
                aria-label={social.label}
                title={social.label}
              >
                {social.icon}
                <span>{social.label}</span>
              </button>
            ))}
          </div>

          <button
            className={styles.resumeButton}
            onClick={() =>
              window.open(personalInfo.socialLinks.resume, "_blank")
            }
          >
            View Résumé
          </button>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{achievementNotes.length}+</span>
            <span className={styles.statLabel}>hackathon wins & honours</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>{experience.length}</span>
            <span className={styles.statLabel}>companies worked with</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>13</span>
            <span className={styles.statLabel}>projects shipped</span>
          </div>
        </div>

        <div className={styles.aboutText}>
          {personalInfo.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </WindowBox>
  );
};

export default AboutUs;
