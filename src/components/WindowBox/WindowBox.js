import Draggable from "react-draggable";
import styles from "./WindowBox.module.css";
import React from "react";
import Close from "../../assets/Close.png";
import Zoom from "../../assets/Zoom.png";
import Minimize from "../../assets/Minimise.png";

const WindowBox = ({
    children,
    onClickClose,
    zIndexVal,
    setActive,
    offset = 0,
    displayText,
    activeElement,
}) => {
    const [dimensions, setDimensions] = React.useState({
        height: 70,
        width: 60,
    });
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleZoom = () => {
        if (dimensions.height === 70 && dimensions.width === 60) {
            setDimensions({ height: 90, width: 100 });
            setPosition({ x: 0, y: 0 });
        } else {
            setDimensions({ height: 70, width: 60 });
            setPosition({ x: "50%", y: "50%" });
        }
    };

    const positionHandler = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    return (
        <Draggable
            bounds="parent"
            onMouseDown={() => setActive()}
            onDrag={(e, data) => positionHandler(e, data)}
            position={{ x: parseFloat(position.x), y: parseFloat(position.y) }}
        >
            <div
                className={styles.container}
                style={{
                    zIndex: zIndexVal,
                    top:
                        dimensions.height === 90
                            ? 0
                            : `calc(10% - ${offset}px)`,
                    left:
                        dimensions.height === 90
                            ? 0
                            : `calc(10% - ${offset}px)`,
                    height: `${dimensions.height}%`,
                    width: `${dimensions.width}%`,
                    boxShadow: activeElement
                        ? "0px 0px 32px 0px rgba(0, 0, 0, 0.50)"
                        : "0 0 10px rgba(0, 0, 0, 0.2)",
                    border: activeElement ? "1px solid #131313" : "none",
                    opacity: activeElement ? 1 : 0.9,
                    filter: activeElement ? "blur(0px)" : "blur(0.8px)",
                    // backdropFilter: activeElement ? "blur(0.75)" : "blur(0px)",
                }}
            >
                <div className={styles.statBar}>
                    <div className={styles.statBarIcons}>
                        <img src={Close} alt="Close" onClick={onClickClose} />
                        <img
                            src={Minimize}
                            alt="Minimize"
                            onClick={onClickClose}
                        />
                        <img src={Zoom} alt="Zoom" onClick={handleZoom} />
                    </div>
                    <div>{displayText}</div>
                    <div></div>
                </div>
                <div>{children}</div>
            </div>
        </Draggable>
    );
};

export default WindowBox;
