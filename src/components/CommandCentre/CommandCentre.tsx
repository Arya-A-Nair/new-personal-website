import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { AiOutlineMail, AiOutlineFilePdf } from "react-icons/ai";
import { VscRepo } from "react-icons/vsc";
import styles from "./CommandCentre.module.css";
import { WindowConfig } from "../../config/windowComponents";
import { personalInfo, projects } from "../../data";
import { createSlug } from "../../utils/slugUtils";

interface CommandCentreProps {
  isVisible: boolean;
  onClose: () => void;
  windowConfigs: WindowConfig[];
  onApplicationSelect: (windowId: string) => void;
  windowStates: Record<string, { isVisible: boolean; zIndex: number }>;
}

interface QuickLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const QUICK_LINKS: QuickLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: personalInfo.socialLinks.github,
    icon: <FaGithub />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: personalInfo.socialLinks.linkedin,
    icon: <FaLinkedinIn />,
  },
  {
    id: "leetcode",
    name: "LeetCode",
    url: personalInfo.socialLinks.leetcode,
    icon: <SiLeetcode />,
  },
  {
    id: "resume",
    name: "Resume",
    url: personalInfo.socialLinks.resume,
    icon: <AiOutlineFilePdf />,
  },
  {
    id: "email",
    name: "Email",
    url: personalInfo.socialLinks.email,
    icon: <AiOutlineMail />,
  },
];

const CommandCentre: React.FC<CommandCentreProps> = ({
  isVisible,
  onClose,
  windowConfigs,
  onApplicationSelect,
  windowStates,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  const query = searchTerm.trim().toLowerCase();

  const filteredApps = useMemo(
    () =>
      windowConfigs.filter(
        config =>
          config.displayName.toLowerCase().includes(query) ||
          config.description?.toLowerCase().includes(query)
      ),
    [windowConfigs, query]
  );

  const filteredProjects = useMemo(() => {
    if (!query) return [];
    return projects
      .filter(
        project =>
          project.title.toLowerCase().includes(query) ||
          project.techStack.some(tech => tech.toLowerCase().includes(query))
      )
      .slice(0, 5);
  }, [query]);

  const filteredLinks = useMemo(
    () => QUICK_LINKS.filter(link => link.name.toLowerCase().includes(query)),
    [query]
  );

  type Entry = { key: string; action: () => void };

  const entries: Entry[] = useMemo(() => {
    const appEntries: Entry[] = filteredApps.map(config => ({
      key: `app-${config.id}`,
      action: () => {
        onApplicationSelect(config.id);
        onClose();
      },
    }));
    const projectEntries: Entry[] = filteredProjects.map(project => ({
      key: `project-${project.title}`,
      action: () => {
        navigate(`/window/Projects/${createSlug(project.title)}`);
        onClose();
      },
    }));
    const linkEntries: Entry[] = filteredLinks.map(link => ({
      key: `link-${link.id}`,
      action: () => {
        window.open(link.url, "_blank");
        onClose();
      },
    }));
    return [...appEntries, ...projectEntries, ...linkEntries];
  }, [
    filteredApps,
    filteredProjects,
    filteredLinks,
    navigate,
    onApplicationSelect,
    onClose,
  ]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(entries.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(
        prev =>
          (prev - 1 + Math.max(entries.length, 1)) % Math.max(entries.length, 1)
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      entries[selectedIndex]?.action();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisible) {
      setSearchTerm("");
      setSelectedIndex(0);
    }
  }, [isVisible]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const selected = listRef.current?.querySelector(
      `[data-selected="true"]`
    ) as HTMLElement | null;
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!isVisible) return null;

  const entryIndexOf = (key: string) =>
    entries.findIndex(entry => entry.key === key);

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Command Centre</h2>
          <input
            type="text"
            placeholder="Search apps, projects, links..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.results} ref={listRef}>
          {filteredApps.length > 0 && (
            <>
              <div className={styles.sectionLabel}>Applications</div>
              <div className={styles.appsGrid}>
                {filteredApps.map(config => {
                  const index = entryIndexOf(`app-${config.id}`);
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={config.id}
                      data-selected={isSelected}
                      className={`${styles.appCard} ${
                        windowStates[config.id]?.isVisible ? styles.active : ""
                      } ${isSelected ? styles.selected : ""}`}
                      onClick={() => entries[index]?.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          entries[index]?.action();
                        }
                      }}
                    >
                      <div className={styles.appIconContainer}>
                        <img
                          src={config.icon}
                          alt={config.displayName}
                          className={styles.appIcon}
                        />
                        {windowStates[config.id]?.isVisible && (
                          <div className={styles.runningIndicator} />
                        )}
                      </div>
                      <div className={styles.appInfo}>
                        <h3 className={styles.appName}>{config.displayName}</h3>
                        {config.description && (
                          <p className={styles.appDescription}>
                            {config.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {filteredProjects.length > 0 && (
            <>
              <div className={styles.sectionLabel}>Projects</div>
              <div className={styles.rowList}>
                {filteredProjects.map(project => {
                  const index = entryIndexOf(`project-${project.title}`);
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={project.title}
                      data-selected={isSelected}
                      className={`${styles.rowItem} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => entries[index]?.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className={styles.rowIcon}>
                        <VscRepo />
                      </span>
                      <span className={styles.rowName}>{project.title}</span>
                      <span className={styles.rowMeta}>
                        {project.techStack.slice(0, 3).join(" · ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {filteredLinks.length > 0 && (
            <>
              <div className={styles.sectionLabel}>Quick Links</div>
              <div className={styles.rowList}>
                {filteredLinks.map(link => {
                  const index = entryIndexOf(`link-${link.id}`);
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={link.id}
                      data-selected={isSelected}
                      className={`${styles.rowItem} ${
                        isSelected ? styles.selected : ""
                      }`}
                      onClick={() => entries[index]?.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className={styles.rowIcon}>{link.icon}</span>
                      <span className={styles.rowName}>{link.name}</span>
                      <span className={styles.rowMeta}>
                        {link.url
                          .replace("mailto:", "")
                          .replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {entries.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <p className={styles.hint}>
            <kbd>↑↓</kbd> navigate · <kbd>↵</kbd> open · <kbd>esc</kbd> close ·
            toggle anytime with <kbd>⌘K</kbd>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommandCentre;
