import React from "react";
import styles from "./Toolbar.module.css";
import visualStudio from "../../assets/visualStudio.png";
import linux from "../../assets/linux.png";
import terminal from "../../assets/terminal.png";

interface ToolbarProps {
    selectActiveItem: (item: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectActiveItem }) => {
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
