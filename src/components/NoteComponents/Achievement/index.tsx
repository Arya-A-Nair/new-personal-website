import React from "react";
import styles from "./Achievement.module.css";

interface AchievementProps {
  image?: string;
  title: string;
  content: string[];
  date: string;
  link?: string;
}

const Achievement: React.FC<AchievementProps> = ({
  image,
  title,
  content,
  date,
  link,
}) => {
  return (
    <div className={styles.notePage}>
      {image && (
        <div className={styles.imageSection}>
          <img
            src={`/images/achievements/${image}`}
            alt={title}
            className={styles.noteImage}
          />
        </div>
      )}

      <div className={styles.noteContent}>
        <h1 className={styles.noteTitle}>{title}</h1>
        <div className={styles.noteDate}>{date}</div>

        <div className={styles.contentText}>
          {content.map((point, index) => (
            <div key={index} className={styles.bulletPoint}>
              • {point}
            </div>
          ))}
        </div>

        {link && (
          <div className={styles.linkSection}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkText}
            >
              View Achievement
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievement;
