import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";
import { projects } from "../../data";
import ProjectItem from "./ProjectItem";
import { createSlug, parseSlugPath } from "../../utils/slugUtils";
import {
  VscFolder,
  VscFolderOpened,
  VscSearch,
  VscChevronRight,
  VscChevronDown,
  VscRepo,
  VscMarkdown,
} from "react-icons/vsc";
import {
  MdSearch,
  MdClear,
  MdFolder,
  MdLaunch,
  MdApps,
  MdViewList,
  MdArrowBack,
  MdShare,
  MdFavorite,
  MdStar,
} from "react-icons/md";
import { IconContext } from "react-icons";

interface ProjectsProps {
  onClickClose: () => void;
  setActiveElement: (element: string) => void;
  zIndexVal: number;
  activeElement: string;
  slug?: string;
  updateSlug?: (slug: string | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({
  onClickClose,
  setActiveElement,
  zIndexVal,
  activeElement,
  slug,
  updateSlug,
}) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(true);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [viewMode, setViewMode] = useState<"explorer" | "grid">("explorer");
  const [mobileViewMode, setMobileViewMode] = useState<"grid" | "list">("grid");
  const [selectedMobileProject, setSelectedMobileProject] = useState<
    number | null
  >(null);

  const [focusedProjectIndex, setFocusedProjectIndex] = useState<number>(-1);
  const [focusedActivityIndex, setFocusedActivityIndex] = useState<number>(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activityBarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        project =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.some(desc =>
            desc.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          project.techStack.some(tech =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredProjects(filtered);
    }
    setFocusedProjectIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    if (slug) {
      const projectIndex = projects.findIndex(
        p => createSlug(p.title) === slug
      );
      if (projectIndex >= 0) {
        setSelectedProject(projectIndex);
        setSelectedMobileProject(projectIndex);
      }
    } else {
      setSelectedProject(null);
      setSelectedMobileProject(null);
    }
  }, [slug]);

  const handleProjectKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          handleProjectSelect(index);
          break;
        case "ArrowDown":
          event.preventDefault();
          const nextIndex = Math.min(index + 1, filteredProjects.length - 1);
          setFocusedProjectIndex(nextIndex);
          projectRefs.current[nextIndex]?.focus();
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevIndex = Math.max(index - 1, 0);
          setFocusedProjectIndex(prevIndex);
          projectRefs.current[prevIndex]?.focus();
          break;
        case "Home":
          event.preventDefault();
          setFocusedProjectIndex(0);
          projectRefs.current[0]?.focus();
          break;
        case "End":
          event.preventDefault();
          const lastIndex = filteredProjects.length - 1;
          setFocusedProjectIndex(lastIndex);
          projectRefs.current[lastIndex]?.focus();
          break;
        case "Escape":
          if (selectedProject !== null) {
            setSelectedProject(null);
            if (updateSlug) {
              updateSlug(null);
            }
            projectRefs.current[index]?.focus();
          }
          break;
      }
    },
    [filteredProjects.length, selectedProject]
  );

  const handleActivityBarKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          setFocusedActivityIndex(1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          setFocusedActivityIndex(0);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedActivityIndex === 0) {
            handleViewModeChange("explorer");
          } else {
            handleViewModeChange("grid");
          }
          break;
      }
    },
    [focusedActivityIndex]
  );

  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        clearSearch();
        searchInputRef.current?.blur();
      } else if (event.key === "ArrowDown" && filteredProjects.length > 0) {
        event.preventDefault();
        setFocusedProjectIndex(0);
        projectRefs.current[0]?.focus();
      }
    },
    [filteredProjects.length]
  );

  const handleProjectSelect = (index: number) => {
    const actualIndex = projects.findIndex(
      p => p.title === filteredProjects[index].title
    );
    setSelectedProject(actualIndex);

    const projectTitle = filteredProjects[index].title;
    const projectSlug = createSlug(projectTitle);

    if (updateSlug) {
      updateSlug(projectSlug);
    }

    const announcement = `Opened project ${projectTitle}`;
    announceToScreenReader(announcement);
  };

  const handleViewModeChange = (mode: "explorer" | "grid") => {
    setViewMode(mode);
    setSelectedProject(null);
    setFocusedProjectIndex(-1);

    if (updateSlug) {
      updateSlug(null);
    }

    const announcement = `Switched to ${mode} view`;
    announceToScreenReader(announcement);
  };

  const handleMobileProjectSelect = (index: number) => {
    const actualIndex = projects.findIndex(
      p => p.title === filteredProjects[index].title
    );
    setSelectedMobileProject(actualIndex);

    const projectTitle = filteredProjects[index].title;
    const projectSlug = createSlug(projectTitle);

    if (updateSlug) {
      updateSlug(projectSlug);
    }

    const announcement = `Opened project details for ${projectTitle}`;
    announceToScreenReader(announcement);
  };

  const clearSearch = () => {
    setSearchTerm("");
    announceToScreenReader("Search cleared");
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    announcement.style.width = "1px";
    announcement.style.height = "1px";
    announcement.style.overflow = "hidden";
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const handleExplorerToggle = () => {
    setIsExplorerOpen(!isExplorerOpen);
    const announcement = `Explorer ${
      !isExplorerOpen ? "expanded" : "collapsed"
    }`;
    announceToScreenReader(announcement);
  };

  const handleRepositoryProjectSelect = (actualIndex: number) => {
    setSelectedProject(actualIndex);

    const project = projects[actualIndex];
    const projectSlug = createSlug(project.title);

    if (updateSlug) {
      updateSlug(projectSlug);
    }

    const announcement = `Opened project ${project.title}`;
    announceToScreenReader(announcement);
  };

  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <WindowBox
        onClickClose={onClickClose}
        setActive={() => setActiveElement("Projects")}
        zIndexVal={zIndexVal}
        offset={40}
        displayText="Projects I have worked on"
        activeElement={activeElement === "Projects"}
        displayTextMobile={"Projects"}
      >
        <div
          className={styles.container}
          role="main"
          aria-label="Projects showcase"
        >
          <div className={styles.desktopLayout}>
            <div className={styles.explorer}>
              <div
                className={styles.activityBar}
                ref={activityBarRef}
                role="tablist"
                aria-label="View mode selector"
              >
                <div
                  className={`${styles.activityItem} ${
                    viewMode === "explorer" ? styles.active : ""
                  }`}
                  onClick={() => handleViewModeChange("explorer")}
                  onKeyDown={handleActivityBarKeyDown}
                  role="tab"
                  tabIndex={focusedActivityIndex === 0 ? 0 : -1}
                  aria-selected={viewMode === "explorer"}
                  aria-controls="explorer-panel"
                  aria-label="Explorer view"
                  title="Explorer"
                >
                  <VscFolder aria-hidden="true" />
                </div>
                <div
                  className={`${styles.activityItem} ${
                    viewMode === "grid" ? styles.active : ""
                  }`}
                  onClick={() => handleViewModeChange("grid")}
                  onKeyDown={handleActivityBarKeyDown}
                  role="tab"
                  tabIndex={focusedActivityIndex === 1 ? 0 : -1}
                  aria-selected={viewMode === "grid"}
                  aria-controls="grid-panel"
                  aria-label="Repository grid view"
                  title="Repository View"
                >
                  <VscRepo aria-hidden="true" />
                </div>
              </div>

              <div
                className={styles.explorerPanel}
                id="explorer-panel"
                role="tabpanel"
                aria-labelledby="activity-item-0"
              >
                <div className={styles.explorerHeader}>
                  <div
                    className={styles.explorerTitle}
                    onClick={handleExplorerToggle}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleExplorerToggle();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExplorerOpen}
                    aria-controls="projects-tree"
                    aria-label={`${
                      isExplorerOpen ? "Collapse" : "Expand"
                    } projects list`}
                  >
                    {isExplorerOpen ? (
                      <VscChevronDown aria-hidden="true" />
                    ) : (
                      <VscChevronRight aria-hidden="true" />
                    )}
                    <span>PROJECTS</span>
                    <span
                      className={styles.projectCount}
                      aria-label={`${filteredProjects.length} projects`}
                    >
                      ({filteredProjects.length})
                    </span>
                  </div>
                </div>

                {isExplorerOpen && (
                  <>
                    <div
                      className={styles.searchContainer}
                      role="search"
                      aria-label="Search projects"
                    >
                      <div className={styles.searchWrapper}>
                        <VscSearch
                          className={styles.searchIcon}
                          aria-hidden="true"
                        />
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search projects..."
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          onKeyDown={handleSearchKeyDown}
                          className={styles.searchInput}
                          aria-label="Search projects by name, description, or technology"
                          aria-describedby="search-results-count"
                        />
                        {searchTerm && (
                          <button
                            className={styles.clearSearch}
                            onClick={clearSearch}
                            title="Clear search"
                            aria-label="Clear search"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>

                    <div
                      className={styles.fileTree}
                      id="projects-tree"
                      role="tree"
                      aria-label="Projects list"
                    >
                      <div
                        id="search-results-count"
                        className="sr-only"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {filteredProjects.length === 0
                          ? "No projects found"
                          : `${filteredProjects.length} project${
                              filteredProjects.length === 1 ? "" : "s"
                            } found`}
                      </div>
                      {filteredProjects.length === 0 ? (
                        <div
                          className={styles.noResults}
                          role="status"
                          aria-live="polite"
                        >
                          No projects found
                        </div>
                      ) : (
                        filteredProjects.map((project, index) => {
                          const actualIndex = projects.findIndex(
                            p => p.title === project.title
                          );
                          return (
                            <div
                              key={project.title}
                              className={styles.projectFolder}
                              role="treeitem"
                              aria-expanded={selectedProject === actualIndex}
                            >
                              <div
                                ref={el => (projectRefs.current[index] = el)}
                                className={`${styles.folderItem} ${
                                  selectedProject === actualIndex
                                    ? styles.expanded
                                    : ""
                                }`}
                                onClick={() => handleProjectSelect(index)}
                                onKeyDown={e => handleProjectKeyDown(e, index)}
                                tabIndex={
                                  focusedProjectIndex === index ? 0 : -1
                                }
                                role="button"
                                aria-label={`${project.title} project. ${
                                  selectedProject === actualIndex
                                    ? "Expanded"
                                    : "Collapsed"
                                }. Technologies: ${project.techStack
                                  .slice(0, 3)
                                  .join(", ")}${
                                  project.techStack.length > 3
                                    ? ` and ${
                                        project.techStack.length - 3
                                      } more`
                                    : ""
                                }`}
                                aria-describedby={`project-${index}-tech`}
                              >
                                {selectedProject === actualIndex ? (
                                  <VscFolderOpened
                                    className={styles.folderIcon}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <VscFolder
                                    className={styles.folderIcon}
                                    aria-hidden="true"
                                  />
                                )}
                                <span className={styles.folderName}>
                                  {project.title}
                                </span>
                                <div
                                  className={styles.techIndicator}
                                  id={`project-${index}-tech`}
                                  aria-label={`Technologies: ${project.techStack.join(
                                    ", "
                                  )}`}
                                >
                                  {project.techStack
                                    .slice(0, 2)
                                    .map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className={styles.techBadge}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  {project.techStack.length > 2 && (
                                    <span className={styles.techBadge}>
                                      +{project.techStack.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {selectedProject === actualIndex && (
                                <div
                                  className={styles.fileList}
                                  role="group"
                                  aria-label="Project files"
                                >
                                  <div
                                    className={styles.fileItem}
                                    role="treeitem"
                                  >
                                    <VscMarkdown
                                      className={styles.readmeIcon}
                                      aria-hidden="true"
                                    />
                                    <span className={styles.fileName}>
                                      README.md
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div
              className={styles.mainContent}
              role="main"
              aria-label="Project details"
            >
              {selectedProject !== null ? (
                <div
                  className={styles.projectDetails}
                  role="article"
                  aria-labelledby="selected-project-title"
                >
                  <div
                    className={styles.tabBar}
                    role="tablist"
                    aria-label="Open project files"
                  >
                    <div className={styles.tab} role="tab" aria-selected="true">
                      <VscMarkdown
                        className={styles.tabIcon}
                        aria-hidden="true"
                      />
                      <span
                        className={styles.tabPath}
                        id="selected-project-title"
                      >
                        {projects[selectedProject]?.title}
                        /README.md
                      </span>
                      <button
                        className={styles.closeTab}
                        onClick={() => setSelectedProject(null)}
                        aria-label={`Close ${projects[selectedProject]?.title} project`}
                        title="Close project"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className={styles.breadcrumbBar}>
                    <nav
                      className={styles.breadcrumb}
                      aria-label="File navigation breadcrumb"
                    >
                      <VscFolder
                        className={styles.breadcrumbIcon}
                        aria-hidden="true"
                      />
                      <span>{projects[selectedProject]?.title}</span>
                      <VscChevronRight aria-hidden="true" />
                      <VscMarkdown
                        className={styles.breadcrumbIcon}
                        aria-hidden="true"
                      />
                      <span>README.md</span>
                    </nav>
                  </div>
                  <ProjectItem data={projects[selectedProject]} />
                </div>
              ) : (
                <div className={styles.welcomeScreen}>
                  {viewMode === "explorer" ? (
                    <div className={styles.welcomeContent}>
                      <div className={styles.vscodeWelcome}>
                        <h2>Welcome</h2>
                        <p>
                          Select a project folder from the Explorer to view its
                          README.md
                        </p>
                        <div className={styles.quickActions}>
                          <div className={styles.quickAction}>
                            <VscFolder />
                            <div>
                              <strong>Open Project Folder</strong>
                              <span>
                                Choose from {projects.length} available project
                                repositories
                              </span>
                            </div>
                          </div>
                          <div className={styles.quickAction}>
                            <VscSearch />
                            <div>
                              <strong>Search Projects</strong>
                              <span>Find projects by name or technology</span>
                            </div>
                          </div>
                          <div className={styles.quickAction}>
                            <VscMarkdown />
                            <div>
                              <strong>README.md Files</strong>
                              <span>
                                Each project contains detailed documentation
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.repositoryView}>
                      <div className={styles.repoHeader}>
                        <h2>My Projects Repository</h2>
                        <div className={styles.repoStats}>
                          <span>{projects.length} repositories</span>
                        </div>
                      </div>
                      <div
                        className={styles.projectGrid}
                        role="grid"
                        aria-label="Repository grid view"
                      >
                        {filteredProjects.map((project, _index) => {
                          const actualIndex = projects.findIndex(
                            p => p.title === project.title
                          );
                          return (
                            <div
                              key={project.title}
                              className={styles.repoCard}
                              onClick={() =>
                                handleRepositoryProjectSelect(actualIndex)
                              }
                              onKeyDown={e => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleRepositoryProjectSelect(actualIndex);
                                }
                              }}
                              role="gridcell"
                              tabIndex={0}
                              aria-label={`${
                                project.title
                              } repository. ${project.description[0].substring(
                                0,
                                100
                              )}... Technologies: ${project.techStack
                                .slice(0, 3)
                                .join(", ")}`}
                            >
                              <div className={styles.repoCardHeader}>
                                <VscRepo
                                  className={styles.repoIcon}
                                  aria-hidden="true"
                                />
                                <h3>{project.title}</h3>
                              </div>
                              <p className={styles.repoDescription}>
                                {project.description[0].substring(0, 120)}
                                ...
                              </p>
                              <div className={styles.repoFooter}>
                                <div className={styles.repoTech}>
                                  {project.techStack
                                    .slice(0, 3)
                                    .map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className={styles.techTag}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                </div>
                                <div className={styles.repoMeta}>
                                  <VscMarkdown title="Has README.md" />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={styles.mobileLayout}
            role="main"
            aria-label="Mobile projects view"
          >
            {selectedMobileProject !== null ? (
              <div
                className={styles.mobileProjectDetail}
                role="article"
                aria-labelledby="mobile-project-title"
              >
                <div className={styles.mobileDetailHeader}>
                  <button
                    className={styles.backButton}
                    onClick={() => {
                      setSelectedMobileProject(null);
                      if (updateSlug) {
                        updateSlug(null);
                      }
                    }}
                    aria-label="Go back to projects list"
                    title="Back to projects"
                  >
                    <MdArrowBack aria-hidden="true" />
                  </button>
                  <div className={styles.detailTitle}>
                    <h2 id="mobile-project-title">
                      {projects[selectedMobileProject]?.title}
                    </h2>
                    <span>README.md</span>
                  </div>
                </div>
                <div className={styles.mobileDetailContent}>
                  <ProjectItem data={projects[selectedMobileProject]} />
                </div>
              </div>
            ) : (
              <>
                <div className={styles.mobileHeader}>
                  <div className={styles.mobileHeaderTop}>
                    <h1>My Projects</h1>
                    <div
                      className={styles.mobileHeaderActions}
                      role="group"
                      aria-label="View mode selector"
                    >
                      <button
                        className={`${styles.viewToggle} ${
                          mobileViewMode === "grid" ? styles.active : ""
                        }`}
                        onClick={() => setMobileViewMode("grid")}
                        aria-pressed={mobileViewMode === "grid"}
                        aria-label="Grid view"
                        title="Grid view"
                      >
                        <MdApps aria-hidden="true" />
                      </button>
                      <button
                        className={`${styles.viewToggle} ${
                          mobileViewMode === "list" ? styles.active : ""
                        }`}
                        onClick={() => setMobileViewMode("list")}
                        aria-pressed={mobileViewMode === "list"}
                        aria-label="List view"
                        title="List view"
                      >
                        <MdViewList aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={styles.mobileSearchContainer}
                    role="search"
                    aria-label="Search projects"
                  >
                    <div className={styles.mobileSearchBar}>
                      <MdSearch
                        className={styles.mobileSearchIcon}
                        aria-hidden="true"
                      />
                      <input
                        ref={mobileSearchInputRef}
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={styles.mobileSearchInput}
                        aria-label="Search projects by name, description, or technology"
                        aria-describedby="mobile-search-results-count"
                      />
                      {searchTerm && (
                        <button
                          className={styles.mobileClearButton}
                          onClick={clearSearch}
                          aria-label="Clear search"
                          title="Clear search"
                        >
                          <MdClear aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={styles.mobileStats}>
                    <span
                      id="mobile-search-results-count"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {filteredProjects.length} projects found
                    </span>
                  </div>
                </div>

                <div className={styles.mobileProjectList}>
                  {filteredProjects.length === 0 ? (
                    <div className={styles.mobileNoResults}>
                      <MdSearch className={styles.noResultsIcon} />
                      <h3>No projects found</h3>
                      <p>Try adjusting your search terms</p>
                    </div>
                  ) : (
                    <div
                      className={
                        mobileViewMode === "grid"
                          ? styles.mobileGridView
                          : styles.mobileListView
                      }
                    >
                      {filteredProjects.map((project, index) => (
                        <div
                          key={project.title}
                          className={
                            mobileViewMode === "grid"
                              ? styles.mobileProjectCard
                              : styles.mobileProjectListItem
                          }
                          onClick={() => handleMobileProjectSelect(index)}
                        >
                          {mobileViewMode === "grid" ? (
                            <>
                              <div className={styles.mobileCardImageContainer}>
                                <img
                                  src={"/images/" + project.img}
                                  alt={project.title}
                                />
                                <div className={styles.mobileCardOverlay}>
                                  <button
                                    className={styles.favoriteButton}
                                    onClick={e => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MdFavorite />
                                  </button>
                                </div>
                              </div>
                              <div className={styles.mobileCardContent}>
                                <div className={styles.mobileCardHeader}>
                                  <h3>{project.title}</h3>
                                  <MdStar className={styles.starIcon} />
                                </div>
                                <p>
                                  {project.description[0].substring(0, 80)}
                                  ...
                                </p>
                                <div className={styles.mobileTechStack}>
                                  {project.techStack
                                    .slice(0, 3)
                                    .map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className={styles.mobileTechChip}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  {project.techStack.length > 3 && (
                                    <span className={styles.mobileTechMore}>
                                      +{project.techStack.length - 3}
                                    </span>
                                  )}
                                </div>
                                <div className={styles.mobileCardActions}>
                                  <button
                                    className={styles.mobileActionButton}
                                    onClick={e => {
                                      e.stopPropagation();
                                      window.open(project.link);
                                    }}
                                  >
                                    <MdLaunch />
                                    <span>View</span>
                                  </button>
                                  <button
                                    className={styles.mobileActionButton}
                                    onClick={e => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MdShare />
                                    <span>Share</span>
                                  </button>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={styles.mobileListItemIcon}>
                                <MdFolder />
                              </div>
                              <div className={styles.mobileListItemContent}>
                                <div className={styles.mobileListItemHeader}>
                                  <h3>{project.title}</h3>
                                  <span className={styles.mobileListItemTime}>
                                    {project.techStack.length} techs
                                  </span>
                                </div>
                                <p>
                                  {project.description[0].substring(0, 100)}
                                  ...
                                </p>
                                <div className={styles.mobileListItemTech}>
                                  {project.techStack
                                    .slice(0, 2)
                                    .map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className={styles.mobileListTechChip}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                </div>
                              </div>
                              <button
                                className={styles.mobileListItemAction}
                                onClick={e => {
                                  e.stopPropagation();
                                  window.open(project.link);
                                }}
                              >
                                <MdLaunch />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </WindowBox>
    </IconContext.Provider>
  );
};

export default Projects;
