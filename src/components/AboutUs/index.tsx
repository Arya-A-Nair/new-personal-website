import React from "react";
import WindowBox from "../WindowBox/WindowBox";
import styles from "./AboutUs.module.css";
import { IconContext } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { personalInfo } from "../../data";

interface AboutUsProps {
  onClickClose: () => void;
  setActiveElement: (element: string) => void;
  zIndexVal: number;
  activeElement: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  onClickClose,
  setActiveElement,
  zIndexVal,
  activeElement,
}) => {
  const getDisplayText = (
    url: string,
    type: "github" | "linkedin" | "email" | "leetcode" | "whatsapp"
  ) => {
    switch (type) {
      case "github":
        return url.replace("https://github.com/", "");
      case "linkedin":
        return url.replace("https://linkedin.com/in/", "");
      case "email":
        return url.replace("mailto:", "");
      case "leetcode":
        return url.replace("https://leetcode.com/u/", "").replace("/", "");
      case "whatsapp":
        return "+91 99206 46238";
      default:
        return url;
    }
  };

  return (
    <IconContext.Provider value={{ color: "#007AFF", size: "1rem" }}>
      <WindowBox
        onClickClose={onClickClose}
        setActive={() => setActiveElement("AboutUs")}
        zIndexVal={zIndexVal}
        offset={60}
        displayText="About Me"
        activeElement={activeElement === "AboutUs"}
        displayTextMobile={"About Me"}
      >
        <div className={styles.container}>
          <div className={styles.profileImageWrapper}>
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className={styles.profileImage}
            />
          </div>

          <h1 className={styles.name}>{personalInfo.name}</h1>
          <p className={styles.subtitle}>{personalInfo.subtitle}</p>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Education</span>
              <span className={styles.specValue}>{personalInfo.education}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                GitHub
                <FaGithub className={styles.linkIcon} />
              </span>
              <span
                className={styles.specLink}
                onClick={() =>
                  window.open(personalInfo.socialLinks.github, "_blank")
                }
              >
                {getDisplayText(personalInfo.socialLinks.github, "github")}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                LinkedIn
                <FaLinkedinIn className={styles.linkIcon} />
              </span>
              <span
                className={styles.specLink}
                onClick={() =>
                  window.open(personalInfo.socialLinks.linkedin, "_blank")
                }
              >
                {getDisplayText(personalInfo.socialLinks.linkedin, "linkedin")}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                WhatsApp
                <FaWhatsapp className={styles.linkIcon} />
              </span>
              <span
                className={styles.specLink}
                onClick={() =>
                  window.open(personalInfo.socialLinks.whatsapp, "_blank")
                }
              >
                {getDisplayText(personalInfo.socialLinks.whatsapp, "whatsapp")}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Leetcode</span>
              <span
                className={styles.specLink}
                onClick={() =>
                  window.open(personalInfo.socialLinks.leetcode, "_blank")
                }
              >
                {getDisplayText(personalInfo.socialLinks.leetcode, "leetcode")}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                Email
                <AiOutlineMail className={styles.linkIcon} />
              </span>
              <span
                className={styles.specLink}
                onClick={() =>
                  window.open(personalInfo.socialLinks.email, "_blank")
                }
              >
                {getDisplayText(personalInfo.socialLinks.email, "email")}
              </span>
            </div>
          </div>

          <button
            className={styles.moreInfoButton}
            onClick={() =>
              window.open(personalInfo.socialLinks.resume, "_blank")
            }
          >
            Resume...
          </button>
        </div>
      </WindowBox>
    </IconContext.Provider>
  );
};

export default AboutUs;
