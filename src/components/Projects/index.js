import React from "react";
import "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";

const Projects = ({ onClickClose }) => {
	return <WindowBox onClickClose={onClickClose}>Projects</WindowBox>;
};

export default Projects;
