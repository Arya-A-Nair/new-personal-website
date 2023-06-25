import React, { useEffect, useState } from "react";
import styles from "./Container.module.css";
import Draggable, { DraggableCore } from "react-draggable";
import "./Container.module.css";
import Toolbar from "../Toolbar/Toolbar";

const Container = () => {
	const [showAboutUs, setShowAboutUs] = useState(false);
	const [showProjects, setShowProjects] = useState(false);
	const [showExperience, setShowExperience] = useState(false);
	const [activeElement, setActiveElement] = useState("");
	const [zIndexAboutUs, setZIndexAboutUs] = useState(0);
	const [zIndexProject, setZIndexProject] = useState(0);
	const [zIndexExperience, setZIndexExperience] = useState(0);

	useEffect(() => {
		const maxOfThree = Math.max(zIndexAboutUs, zIndexExperience, zIndexProject);
		if (activeElement === "AboutUs") {
			setZIndexAboutUs(maxOfThree + 1);
			setShowAboutUs(true);
		} else if (activeElement === "Projects") {
			setZIndexProject(maxOfThree + 1);
			setShowProjects(true);
		} else if (activeElement === "Experience") {
			setZIndexExperience(maxOfThree + 1);
			setShowExperience(true);
		}
	}, [activeElement]);

	return (
		<div className={styles.container}>
			{showAboutUs && (
				<Draggable
					bounds="parent"
					onMouseDown={() => setActiveElement("AboutUs")}
				>
					<div
						className={styles.check}
						style={{
							zIndex: zIndexAboutUs,
						}}
					>
						About Us
					</div>
				</Draggable>
			)}

			{showProjects && (
				<Draggable
					bounds="parent"
					onMouseDown={() => setActiveElement("Projects")}
				>
					<div
						className={styles.check}
						style={{
							zIndex: zIndexProject,
						}}
					>
						Projects
					</div>
				</Draggable>
			)}

			{showExperience && (
				<Draggable
					bounds="parent"
					onMouseDown={() => setActiveElement("Experience")}
				>
					<div
						className={styles.check}
						style={{
							zIndex: zIndexExperience,
						}}
					>
						Experience
					</div>
				</Draggable>
			)}

			<Toolbar
				selectActiveItem={(e) => {
					console.log(e);
					setActiveElement(e);
				}}
			/>
		</div>
	);
};

export default Container;
