import React from "react";
import styles from "./Toolbar.module.css";
import folder from "../../assets/folder.png";
import visualStudio from "../../assets/visualStudio.png";
import linux from "../../assets/linux.png";
import terminal from "../../assets/terminal.png";

const Toolbar = ({ selectActiveItem }) => {
    return (
        <div className={styles.container}>
            <div onClick={() => selectActiveItem("AboutUs")}>
                <span>About Me</span> <img src={linux} alt="icon" />
            </div>
            <div onClick={() => selectActiveItem("Projects")}>
                <span>Projects</span> <img src={visualStudio} alt="icon" />
            </div>
            <div onClick={() => selectActiveItem("Experience")}>
                <span>Experience</span> <img src={terminal} alt="icon" />
            </div>
        </div>
    );
};

export default Toolbar;
