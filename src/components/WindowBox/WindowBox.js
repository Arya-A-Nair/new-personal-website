import Draggable from "react-draggable";
import styles from "./WindowBox.module.css";
import React from "react";

const WindowBox = ({
    children,
    onClickClose,
    zIndexVal,
    setActive,
    offset = 0,
}) => {
    return (
        <Draggable bounds="parent" onMouseDown={() => setActive()}>
            <div
                className={styles.check}
                style={{
                    zIndex: zIndexVal,
                    top: `calc(10% - ${offset}px)`,
                    left: `calc(10% - ${offset}px)`,
                }}
            >
                <div className={styles.statBar}>
                    <span
                        className={styles.dot}
                        onClick={() => onClickClose()}
                    ></span>
                </div>
                <div>{children}</div>
            </div>
        </Draggable>
    );
};

export default WindowBox;
