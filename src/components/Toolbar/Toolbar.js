import React from "react";
import styles from "./Toolbar.module.css";

const Toolbar = ({ selectActiveItem }) => {
	return (
		<div className={styles.container}>
			<div onClick={() => selectActiveItem("AboutUs")}>About us</div>
			<div onClick={() => selectActiveItem("Projects")}>Projects</div>
			<div onClick={() => selectActiveItem("Experience")}>Experience</div>
		</div>
	);
};

export default Toolbar;
