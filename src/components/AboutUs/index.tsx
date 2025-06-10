import React from "react";
import WindowBox from "../WindowBox/WindowBox";
import styles from "./AboutUs.module.css";
import { IconContext } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";

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
                            src="/images/profilePic.png"
                            alt="Arya Nair"
                            className={styles.profileImage}
                        />
                    </div>

                    <h1 className={styles.name}>Arya Nair</h1>
                    <p className={styles.subtitle}>Software Developer</p>

                    <div className={styles.specs}>
                        <div className={styles.specRow}>
                            <span className={styles.specLabel}>Education</span>
                            <span className={styles.specValue}>
                                B.Tech Information Technology
                            </span>
                        </div>
                        <div className={styles.specRow}>
                            <span className={styles.specLabel}>
                                GitHub
                                <FaGithub className={styles.linkIcon} />
                            </span>
                            <span
                                className={styles.specLink}
                                onClick={() =>
                                    window.open(
                                        "https://github.com/Arya-A-Nair",
                                        "_blank"
                                    )
                                }
                            >
                                github.com/Arya-A-Nair
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
                                    window.open(
                                        "https://www.linkedin.com/in/arya-nair-2003/",
                                        "_blank"
                                    )
                                }
                            >
                                arya-nair-2003
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
                                    window.open(
                                        "https://wa.me/919920646238",
                                        "_blank"
                                    )
                                }
                            >
                                +91 99206 46238
                            </span>
                        </div>
                        <div className={styles.specRow}>
                            <span className={styles.specLabel}>Leetcode</span>
                            <span
                                className={styles.specLink}
                                onClick={() =>
                                    window.open(
                                        "https://leetcode.com/u/aryaajitnair/",
                                        "_blank"
                                    )
                                }
                            >
                                aryaajitnair
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
                                    window.open(
                                        "mailto:aryaajitnair@gmail.com",
                                        "_blank"
                                    )
                                }
                            >
                                aryaajitnair@gmail.com
                            </span>
                        </div>
                    </div>

                    <button
                        className={styles.moreInfoButton}
                        onClick={() => {
                            window.open(
                                "https://drive.google.com/file/d/1bhLfOFy87ukde8o6MoI6AC0gJmc6Nygp/view?usp=sharing",
                                "_blank"
                            );
                        }}
                    >
                        Resume...
                    </button>
                </div>
            </WindowBox>
        </IconContext.Provider>
    );
};

export default AboutUs;
