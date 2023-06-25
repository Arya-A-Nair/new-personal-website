import styles from "./WindowBox.module.css";
import React from "react";

const WindowBox = ({ children, onClickClose }) => {
	return (
		<div className={styles.check}>
			<div className={styles.statBar}>
				<span className={styles.dot} onClick={() => onClickClose()}></span>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default WindowBox;
