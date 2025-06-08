import React, { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import WindowBox from "../WindowBox/WindowBox";
import { projects } from "../../assets/data";
import ProjectItem from "./ProjectItem";
import {
    VscFolder,
    VscFolderOpened,
    VscFile,
    VscSearch,
    VscChevronRight,
    VscChevronDown,
    VscSourceControl,
    VscRepo,
    VscMarkdown,
} from "react-icons/vsc";
import { IconContext } from "react-icons";

interface ProjectsProps {
    onClickClose: () => void;
    setActiveElement: (element: string) => void;
    zIndexVal: number;
    activeElement: string;
}

const Projects: React.FC<ProjectsProps> = ({
    onClickClose,
    setActiveElement,
    zIndexVal,
    activeElement,
}) => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(true);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [viewMode, setViewMode] = useState<"explorer" | "grid">("explorer");

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(
                (project) =>
                    project.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    project.description.some((desc) =>
                        desc.toLowerCase().includes(searchTerm.toLowerCase())
                    ) ||
                    project.techStack.some((tech) =>
                        tech.toLowerCase().includes(searchTerm.toLowerCase())
                    )
            );
            setFilteredProjects(filtered);
        }
    }, [searchTerm]);

    const handleProjectSelect = (index: number) => {
        const actualIndex = projects.findIndex(
            (p) => p.title === filteredProjects[index].title
        );
        setSelectedProject(actualIndex);
    };

    const handleViewModeChange = (mode: "explorer" | "grid") => {
        setViewMode(mode);
        // Reset the selected project when switching view modes
        setSelectedProject(null);
    };

    const clearSearch = () => {
        setSearchTerm("");
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
                <div className={styles.container}>
                    {/* Desktop VS Code Layout */}
                    <div className={styles.desktopLayout}>
                        {/* Left Sidebar - VS Code Explorer */}
                        <div className={styles.explorer}>
                            {/* Activity Bar */}
                            <div className={styles.activityBar}>
                                <div
                                    className={`${styles.activityItem} ${
                                        viewMode === "explorer"
                                            ? styles.active
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleViewModeChange("explorer")
                                    }
                                    title="Explorer"
                                >
                                    <VscFolder />
                                </div>
                                <div
                                    className={`${styles.activityItem} ${
                                        viewMode === "grid" ? styles.active : ""
                                    }`}
                                    onClick={() => handleViewModeChange("grid")}
                                    title="Repository View"
                                >
                                    <VscRepo />
                                </div>
                            </div>

                            {/* Explorer Panel */}
                            <div className={styles.explorerPanel}>
                                <div className={styles.explorerHeader}>
                                    <div
                                        className={styles.explorerTitle}
                                        onClick={() =>
                                            setIsExplorerOpen(!isExplorerOpen)
                                        }
                                    >
                                        {isExplorerOpen ? (
                                            <VscChevronDown />
                                        ) : (
                                            <VscChevronRight />
                                        )}
                                        <span>PROJECTS</span>
                                        <span className={styles.projectCount}>
                                            ({filteredProjects.length})
                                        </span>
                                    </div>
                                </div>

                                {isExplorerOpen && (
                                    <>
                                        <div className={styles.searchContainer}>
                                            <div
                                                className={styles.searchWrapper}
                                            >
                                                <VscSearch
                                                    className={
                                                        styles.searchIcon
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Search projects..."
                                                    value={searchTerm}
                                                    onChange={(e) =>
                                                        setSearchTerm(
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        styles.searchInput
                                                    }
                                                />
                                                {searchTerm && (
                                                    <button
                                                        className={
                                                            styles.clearSearch
                                                        }
                                                        onClick={clearSearch}
                                                        title="Clear search"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className={styles.fileTree}>
                                            {filteredProjects.length === 0 ? (
                                                <div
                                                    className={styles.noResults}
                                                >
                                                    No projects found
                                                </div>
                                            ) : (
                                                filteredProjects.map(
                                                    (project, index) => {
                                                        const actualIndex =
                                                            projects.findIndex(
                                                                (p) =>
                                                                    p.title ===
                                                                    project.title
                                                            );
                                                        return (
                                                            <div
                                                                key={
                                                                    project.title
                                                                }
                                                                className={
                                                                    styles.projectFolder
                                                                }
                                                            >
                                                                <div
                                                                    className={`${
                                                                        styles.folderItem
                                                                    } ${
                                                                        selectedProject ===
                                                                        actualIndex
                                                                            ? styles.expanded
                                                                            : ""
                                                                    }`}
                                                                    onClick={() =>
                                                                        handleProjectSelect(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    {selectedProject ===
                                                                    actualIndex ? (
                                                                        <VscFolderOpened
                                                                            className={
                                                                                styles.folderIcon
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <VscFolder
                                                                            className={
                                                                                styles.folderIcon
                                                                            }
                                                                        />
                                                                    )}
                                                                    <span
                                                                        className={
                                                                            styles.folderName
                                                                        }
                                                                    >
                                                                        {
                                                                            project.title
                                                                        }
                                                                    </span>
                                                                    <div
                                                                        className={
                                                                            styles.techIndicator
                                                                        }
                                                                    >
                                                                        {project.techStack
                                                                            .slice(
                                                                                0,
                                                                                2
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    tech,
                                                                                    techIndex
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            techIndex
                                                                                        }
                                                                                        className={
                                                                                            styles.techBadge
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            tech
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        {project
                                                                            .techStack
                                                                            .length >
                                                                            2 && (
                                                                            <span
                                                                                className={
                                                                                    styles.techBadge
                                                                                }
                                                                            >
                                                                                +
                                                                                {project
                                                                                    .techStack
                                                                                    .length -
                                                                                    2}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {selectedProject ===
                                                                    actualIndex && (
                                                                    <div
                                                                        className={
                                                                            styles.fileList
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                styles.fileItem
                                                                            }
                                                                        >
                                                                            <VscMarkdown
                                                                                className={
                                                                                    styles.readmeIcon
                                                                                }
                                                                            />
                                                                            <span
                                                                                className={
                                                                                    styles.fileName
                                                                                }
                                                                            >
                                                                                README.md
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className={styles.mainContent}>
                            {selectedProject !== null ? (
                                <div className={styles.projectDetails}>
                                    <div className={styles.tabBar}>
                                        <div className={styles.tab}>
                                            <VscMarkdown
                                                className={styles.tabIcon}
                                            />
                                            <span className={styles.tabPath}>
                                                {
                                                    projects[selectedProject]
                                                        ?.title
                                                }
                                                /README.md
                                            </span>
                                            <button
                                                className={styles.closeTab}
                                                onClick={() =>
                                                    setSelectedProject(null)
                                                }
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.breadcrumbBar}>
                                        <div className={styles.breadcrumb}>
                                            <VscFolder
                                                className={
                                                    styles.breadcrumbIcon
                                                }
                                            />
                                            <span>
                                                {
                                                    projects[selectedProject]
                                                        ?.title
                                                }
                                            </span>
                                            <VscChevronRight />
                                            <VscMarkdown
                                                className={
                                                    styles.breadcrumbIcon
                                                }
                                            />
                                            <span>README.md</span>
                                        </div>
                                    </div>
                                    <ProjectItem
                                        data={projects[selectedProject]}
                                    />
                                </div>
                            ) : (
                                <div className={styles.welcomeScreen}>
                                    {viewMode === "explorer" ? (
                                        <div className={styles.welcomeContent}>
                                            <div
                                                className={styles.vscodeWelcome}
                                            >
                                                <h2>Welcome</h2>
                                                <p>
                                                    Select a project folder from
                                                    the Explorer to view its
                                                    README.md
                                                </p>
                                                <div
                                                    className={
                                                        styles.quickActions
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.quickAction
                                                        }
                                                    >
                                                        <VscFolder />
                                                        <div>
                                                            <strong>
                                                                Open Project
                                                                Folder
                                                            </strong>
                                                            <span>
                                                                Choose from{" "}
                                                                {
                                                                    projects.length
                                                                }{" "}
                                                                available
                                                                project
                                                                repositories
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.quickAction
                                                        }
                                                    >
                                                        <VscSearch />
                                                        <div>
                                                            <strong>
                                                                Search Projects
                                                            </strong>
                                                            <span>
                                                                Find projects by
                                                                name or
                                                                technology
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.quickAction
                                                        }
                                                    >
                                                        <VscMarkdown />
                                                        <div>
                                                            <strong>
                                                                README.md Files
                                                            </strong>
                                                            <span>
                                                                Each project
                                                                contains
                                                                detailed
                                                                documentation
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
                                                <div
                                                    className={styles.repoStats}
                                                >
                                                    <span>
                                                        {projects.length}{" "}
                                                        repositories
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.projectGrid}>
                                                {filteredProjects.map(
                                                    (project, index) => {
                                                        const actualIndex =
                                                            projects.findIndex(
                                                                (p) =>
                                                                    p.title ===
                                                                    project.title
                                                            );
                                                        return (
                                                            <div
                                                                key={
                                                                    project.title
                                                                }
                                                                className={
                                                                    styles.repoCard
                                                                }
                                                                onClick={() =>
                                                                    setSelectedProject(
                                                                        actualIndex
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.repoCardHeader
                                                                    }
                                                                >
                                                                    <VscRepo
                                                                        className={
                                                                            styles.repoIcon
                                                                        }
                                                                    />
                                                                    <h3>
                                                                        {
                                                                            project.title
                                                                        }
                                                                    </h3>
                                                                </div>
                                                                <p
                                                                    className={
                                                                        styles.repoDescription
                                                                    }
                                                                >
                                                                    {project.description[0].substring(
                                                                        0,
                                                                        120
                                                                    )}
                                                                    ...
                                                                </p>
                                                                <div
                                                                    className={
                                                                        styles.repoFooter
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.repoTech
                                                                        }
                                                                    >
                                                                        {project.techStack
                                                                            .slice(
                                                                                0,
                                                                                3
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    tech,
                                                                                    techIndex
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            techIndex
                                                                                        }
                                                                                        className={
                                                                                            styles.techTag
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            tech
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.repoMeta
                                                                        }
                                                                    >
                                                                        <VscMarkdown title="Has README.md" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className={styles.mobileLayout}>
                        <div className={styles.mobileHeader}>
                            <h2>My Projects</h2>
                            <div className={styles.mobileSearch}>
                                <VscSearch />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                {searchTerm && (
                                    <button onClick={clearSearch}>×</button>
                                )}
                            </div>
                        </div>

                        <div className={styles.mobileProjectList}>
                            {filteredProjects.length === 0 ? (
                                <div className={styles.noResults}>
                                    No projects found for "{searchTerm}"
                                </div>
                            ) : (
                                filteredProjects.map((project, index) => (
                                    <div
                                        key={project.title}
                                        className={styles.mobileProjectCard}
                                    >
                                        <div className={styles.mobileCardImage}>
                                            <img
                                                src={"/images/" + project.img}
                                                alt={project.title}
                                            />
                                        </div>
                                        <div
                                            className={styles.mobileCardContent}
                                        >
                                            <h3>{project.title}</h3>
                                            <p>{project.description[0]}</p>
                                            <div
                                                className={
                                                    styles.mobileTechStack
                                                }
                                            >
                                                {project.techStack.map(
                                                    (tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className={
                                                                styles.mobileTechBadge
                                                            }
                                                        >
                                                            {tech}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <button
                                                className={
                                                    styles.mobileViewButton
                                                }
                                                onClick={() =>
                                                    window.open(project.link)
                                                }
                                            >
                                                View Project
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </WindowBox>
        </IconContext.Provider>
    );
};

export default Projects;
