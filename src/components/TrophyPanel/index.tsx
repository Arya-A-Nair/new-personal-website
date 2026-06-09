import React, { useCallback, useEffect, useState } from "react";
import styles from "./TrophyPanel.module.css";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_EVENT,
  getUnlocked,
} from "../../utils/achievements";

interface TrophyPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrophyPanel: React.FC<TrophyPanelProps> = ({ isOpen, onClose }) => {
  const [unlocked, setUnlocked] = useState<Set<string>>(() => getUnlocked());

  const refresh = useCallback(() => setUnlocked(getUnlocked()), []);

  useEffect(() => {
    window.addEventListener(ACHIEVEMENT_EVENT, refresh);
    return () => window.removeEventListener(ACHIEVEMENT_EVENT, refresh);
  }, [refresh]);

  useEffect(() => {
    if (isOpen) refresh();
  }, [isOpen, refresh]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const count = unlocked.size;
  const total = ACHIEVEMENTS.length;
  const percent = Math.round((count / total) * 100);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.panel}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Trophy Room"
      >
        <div className={styles.header}>
          <span className={styles.headerTitle}>🏆 Trophy Room</span>
          <span className={styles.headerCount}>
            {count}/{total}
          </span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className={styles.subtitle}>
          Explore AryaOS to collect them all. Locked ones come with a hint.
        </p>
        <div className={styles.list}>
          {ACHIEVEMENTS.map(achievement => {
            const isUnlocked = unlocked.has(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`${styles.item} ${
                  isUnlocked ? styles.unlocked : styles.locked
                }`}
              >
                <span className={styles.itemIcon}>
                  {isUnlocked ? achievement.icon : "🔒"}
                </span>
                <div className={styles.itemText}>
                  <span className={styles.itemTitle}>
                    {isUnlocked
                      ? achievement.title
                      : achievement.secret
                        ? "???"
                        : achievement.title}
                  </span>
                  <span className={styles.itemDescription}>
                    {isUnlocked ? achievement.description : achievement.hint}
                  </span>
                </div>
                {isUnlocked && <span className={styles.check}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrophyPanel;
