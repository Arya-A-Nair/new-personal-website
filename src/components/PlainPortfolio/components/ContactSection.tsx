import React from "react";
import { PersonalInfo, ResumeItem } from "../../../data";
import styles from "../PlainPortfolio.module.css";

interface ContactSectionProps {
  personalInfo: PersonalInfo;
  resume: ResumeItem[];
}

const ContactSection: React.FC<ContactSectionProps> = ({
  personalInfo,
  resume,
}) => {
  return (
    <>
      <div className={styles.section}>
        <h2>technologies</h2>
        <p>{personalInfo.technologies}</p>
      </div>

      <div className={styles.section}>
        <h2>contact</h2>
        <p>
          Feel free to reach out at{" "}
          <a href={personalInfo.socialLinks.email}>
            {personalInfo.socialLinks.email.replace("mailto:", "")}
          </a>{" "}
          or connect with me on{" "}
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
          {resume.length > 0 && (
            <>
              {" "}
              You can also check out my{" "}
              <a
                href={resume[0].link}
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </a>
              .
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default ContactSection;
