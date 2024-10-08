import React from "react";
import WindowBox from "../WindowBox/WindowBox";
import styles from "./AboutUs.module.css";
import { IconContext } from "react-icons";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";

const AboutUs = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    return (
        <IconContext.Provider value={{ color: "#06FFF099" }}>
            <WindowBox
                onClickClose={onClickClose}
                setActive={() => setActiveElement("AboutUs")}
                zIndexVal={zIndexVal}
                offset={60}
                displayText="So who am I??"
                activeElement={activeElement === "AboutUs"}
                displayTextMobile={"About Me"}
            >
                <div className={styles.container}>
                    <div className={styles.containerTitle}>
                        <span className={styles.title}>About</span>
                        <span className={styles.greyLine}></span>
                    </div>
                    <div className={styles.containerContent}>
                        <div className={styles.contentLeft}>
                            <div className={styles.ProfilePic}>
                                <div className={styles.brandLogos}>
                                    <div className={styles.emptyDiv} />

                                    <FaGithub
                                        onClick={() =>
                                            window.open(
                                                "https://github.com/Arya-A-Nair",
                                                "_blank"
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                    <FaLinkedinIn
                                        onClick={() =>
                                            window.open(
                                                "https://www.linkedin.com/in/arya-nair-2003//",
                                                "_blank"
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                    <FaWhatsapp
                                        onClick={() =>
                                            window.open(
                                                "https://wa.me/919920646238",
                                                "_blank"
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                    <AiOutlineMail
                                        onClick={() =>
                                            window.open(
                                                "mailto:aryaajitnair@gmail.com",
                                                "_blank"
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                                <div className={styles.profileImg}>
                                    <img
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/images/profilePic.png"
                                        }
                                        alt="Profile Pic"
                                        className={styles.profilePicImage}
                                    />
                                </div>
                            </div>
                            <div className={styles.qoutesContainer}>
                                <div className={styles.blankdiv}></div>
                                <div className={styles.qoutes}>
                                    <div className={styles.qoute}>
                                        "Sorry. I'm Doing My Own Thing"
                                    </div>
                                    <div className={styles.author}>
                                        ~Miles Morales
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentRight}>
                            <div className={styles.contentText}>
                                Greetings, fellow code-slingers! I'm{" "}
                                <span className={styles.highlight}>
                                    Arya Nair
                                </span>
                                , your friendly neighborhood{" "}
                                <span className={styles.highlight}>
                                    code-spinner
                                </span>
                                . Just like{" "}
                                <span className={styles.highlight}>
                                    Miles Morales
                                </span>
                                , I stumbled upon my web-slinging powers in the
                                world of{" "}
                                <span className={styles.highlight}>
                                    programming
                                </span>
                                .
                            </div>
                            <div className={styles.contentText}>
                                I'm currently rocking a{" "}
                                <span className={styles.highlight}>
                                    Bachelors of Technology in Information
                                    Technology
                                </span>{" "}
                                with{" "}
                                <span className={styles.highlight}>
                                    Honors in AI
                                </span>
                                . Whether it's{" "}
                                <span className={styles.highlight}>React</span>{" "}
                                or{" "}
                                <span className={styles.highlight}>Django</span>
                                , I swing through languages and frameworks like
                                Spidey through NYC.
                            </div>
                            <div className={styles.contentText}>
                                When I'm not battling bugs, I'm crafting
                                mind-blowing projects that make Electro's sparks
                                look dull. From{" "}
                                <span className={styles.highlight}>
                                    Pointer Aid
                                </span>
                                , estimating the perfect amount of web
                                fluid...oops, I mean marks, to{" "}
                                <span className={styles.highlight}>
                                    Three Bricks
                                </span>
                                , streamlining property buying and selling, my
                                projects are Spidey-Verse-level awesome
                            </div>
                            <div className={styles.contentText}>
                                By day, I'm a{" "}
                                <span className={styles.highlight}>
                                    Software Development Intern
                                </span>{" "}
                                at <span className={styles.highlight}>UNL</span>
                                , hidden beneath my secret identity. With{" "}
                                <span className={styles.highlight}>Rust</span>{" "}
                                and{" "}
                                <span className={styles.highlight}>
                                    React Native
                                </span>{" "}
                                skills, I build web applications and navigation
                                systems that even make Doc Ock go "Wow!"
                            </div>
                            <div className={styles.contentText}>
                                So, join me on this web-slinging adventure as we
                                bring the power of code to life.{" "}
                                <span className={styles.highlight}>
                                    Remember, great coding skills bring great
                                    responsibility
                                </span>
                                ... and tons of opportunities to weave an
                                awesome web in the{" "}
                                <span className={styles.highlight}>
                                    coding-verse
                                </span>
                                !
                            </div>
                            <div className={styles.ResumeBox}>
                                <div className={styles.resumeText}>
                                    Check out my resume here
                                </div>
                                <div className={styles.resumeButtonContainer}>
                                    <button
                                        className={styles.resumeButton}
                                        onClick={() => {
                                            window.open(
                                                "https://drive.google.com/file/d/1bhLfOFy87ukde8o6MoI6AC0gJmc6Nygp/view?usp=sharing",
                                                "_blank"
                                            );
                                        }}
                                    >
                                        Resume
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </WindowBox>
        </IconContext.Provider>
    );
};

export default AboutUs;
