import React from "react";
import {
  personalInfo,
  projects,
  experience,
  achievementNotes,
} from "../../data";
import styles from "./PlainPortfolio.module.css";

import {
  Header,
  ProjectGrid,
  AchievementGrid,
  ExperienceSection,
  ContactSection,
} from "./components";

const PlainPortfolio: React.FC = () => {
  React.useEffect(() => {
    document.body.style.display = "block";
    document.body.style.justifyContent = "unset";
    document.body.style.alignItems = "unset";
    document.body.style.backgroundImage = "none";
    document.body.style.height = "auto";
    document.body.style.background = "white";
    document.body.style.fontFamily = "Georgia, serif";

    return () => {
      document.body.style.display = "flex";
      document.body.style.justifyContent = "center";
      document.body.style.alignItems = "center";
      document.body.style.backgroundImage = 'url("/images/Background.png")';
      document.body.style.height = "100vh";
      document.body.style.background = "";
      document.body.style.fontFamily = '"SF Mono", sans-serif';
    };
  }, []);

  return (
    <div className={styles.container}>
      <Header personalInfo={personalInfo} />

      <hr className={styles.divider} />

      <ExperienceSection experience={experience} />

      <ProjectGrid projects={projects} maxProjects={6} />

      <AchievementGrid achievementNotes={achievementNotes} />

      <ContactSection personalInfo={personalInfo} />
    </div>
  );
};

export default PlainPortfolio;
