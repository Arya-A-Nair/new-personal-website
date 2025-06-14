import React from "react";
import { Experience } from "../../../data";
import styles from "../PlainPortfolio.module.css";

interface ExperienceSectionProps {
  experience: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
}) => {
  return (
    <div className={styles.section}>
      <h2>experience</h2>
      {experience.map((exp, index) => (
        <div key={index} className={styles.experienceItem}>
          <h3>{exp.position}</h3>
          <p>
            <strong>{exp.companyName}</strong> • {exp.duration}
          </p>
          <ul>
            {exp.workDone.map((work, workIndex) => (
              <li key={workIndex}>{work}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
