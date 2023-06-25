import Draggable from "react-draggable";
import styles from "./WindowBox.module.css";
import React from "react";

const WindowBox = ({ children, onClickClose, zIndexVal, setActive }) => {
    return (
        <Draggable bounds="parent" onMouseDown={() => setActive()}>
            <div
                className={styles.check}
                style={{
                    zIndex: zIndexVal,
                }}
            >
                <div className={styles.check}>
                    <div className={styles.statBar}>
                        <span
                            className={styles.dot}
                            onClick={() => onClickClose()}
                        ></span>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </Draggable>
    );
};

export default WindowBox;
