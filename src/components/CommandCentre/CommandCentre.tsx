import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { AiOutlineMail, AiOutlineFilePdf } from "react-icons/ai";
import { VscSearch, VscRepo } from "react-icons/vsc";
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
    } else if (
      event.key === "ArrowDown" ||
      (event.key === "Tab" && !event.shiftKey)
    ) {
      event.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(entries.length, 1));
    } else if (
      event.key === "ArrowUp" ||
      (event.key === "Tab" && event.shiftKey)
    ) {
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

  const renderRow = (
    key: string,
    icon: React.ReactNode,
    name: string,
    meta: string,
    badge?: React.ReactNode
  ) => {
    const index = entryIndexOf(key);
    const isSelected = index === selectedIndex;
    return (
      <div
        key={key}
        data-selected={isSelected}
        className={`${styles.row} ${isSelected ? styles.rowSelected : ""}`}
        onClick={() => entries[index]?.action()}
        onMouseEnter={() => setSelectedIndex(index)}
        role="button"
        tabIndex={-1}
      >
        <span className={styles.rowIcon}>{icon}</span>
        <span className={styles.rowName}>{name}</span>
        {badge}
        <span className={styles.rowMeta}>{meta}</span>
        {isSelected && <span className={styles.rowReturn}>↵</span>}
      </div>
    );
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.palette}>
        <div className={styles.searchRow}>
          <VscSearch className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search apps, projects, links..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            aria-label="Search"
          />
          <kbd className={styles.escHint}>esc</kbd>
        </div>

        <div className={styles.results} ref={listRef}>
          {filteredApps.length > 0 && (
            <>
              <div className={styles.sectionLabel}>Applications</div>
              {filteredApps.map(config =>
                renderRow(
                  `app-${config.id}`,
                  <img
                    src={config.icon}
                    alt=""
                    className={styles.appIcon}
                    aria-hidden="true"
                  />,
                  config.displayName,
                  config.description ?? "",
                  windowStates[config.id]?.isVisible ? (
                    <span className={styles.runningDot} title="Running" />
                  ) : undefined
                )
              )}
            </>
          )}

          {filteredProjects.length > 0 && (
            <>
              <div className={styles.sectionLabel}>Projects</div>
              {filteredProjects.map(project =>
                renderRow(
                  `project-${project.title}`,
                  <VscRepo />,
                  project.title,
                  project.techStack.slice(0, 3).join(" · ")
                )
              )}
            </>
          )}

          {filteredLinks.length > 0 && (
            <>
              <div className={styles.sectionLabel}>Quick Links</div>
              {filteredLinks.map(link =>
                renderRow(
                  `link-${link.id}`,
                  link.icon,
                  link.name,
                  link.url.replace("mailto:", "").replace(/^https?:\/\//, "")
                )
              )}
            </>
          )}

          {entries.length === 0 && (
            <div className={styles.noResults}>
              No results for "{searchTerm}"
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span className={styles.footerRight}>
            <kbd>⌘K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandCentre;
