import React from "react";
import { AchievementNote } from "../../../data";
import styles from "../PlainPortfolio.module.css";

interface AchievementGridProps {
  achievementNotes: AchievementNote[];
}

const AchievementGrid: React.FC<AchievementGridProps> = ({
  achievementNotes,
}) => {
  return (
    <div className={styles.section}>
      <h2>achievements</h2>
      <div className={styles.achievementsList}>
        {achievementNotes.map((note, index) => (
          <div key={index} className={styles.achievementCard}>
            <div className={styles.achievementHeader}>
              <h3 className={styles.achievementTitle}>{note.title}</h3>
              <span className={styles.achievementDate}>{note.date}</span>
            </div>

            <p className={styles.achievementPreview}>{note.preview}</p>

            {note.content && note.content.length > 0 && (
              <div className={styles.achievementDetails}>
                {note.content.map((detail, detailIndex) => (
                  <div key={detailIndex} className={styles.achievementDetail}>
                    {detail}
                  </div>
                ))}
              </div>
            )}

            {note.link && (
              <div className={styles.achievementActions}>
                <a
                  href={note.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.achievementLink}
                >
                  View Project →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementGrid;
