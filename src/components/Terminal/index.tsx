import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import WindowBox from "../WindowBox/WindowBox";
import styles from "./Terminal.module.css";
import {
  personalInfo,
  projects,
  experience,
  achievementNotes,
} from "../../data";

interface TerminalProps {
  onClickClose: () => void;
  onClickMinimize?: () => void;
  setActiveElement: (element: string) => void;
  zIndexVal: number;
  activeElement: string;
}

interface TerminalLine {
  id: number;
  content: React.ReactNode;
}

const PROMPT_USER = "guest";
const PROMPT_HOST = "arya-portfolio";

const APPLE_ASCII = `                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`;

const COMMAND_NAMES = [
  "help",
  "about",
  "projects",
  "project",
  "experience",
  "skills",
  "achievements",
  "contact",
  "open",
  "neofetch",
  "ls",
  "pwd",
  "whoami",
  "date",
  "echo",
  "history",
  "clear",
  "exit",
];

const OPEN_TARGETS: Record<string, string> = {
  github: personalInfo.socialLinks.github,
  linkedin: personalInfo.socialLinks.linkedin,
  leetcode: personalInfo.socialLinks.leetcode,
  resume: personalInfo.socialLinks.resume,
  email: personalInfo.socialLinks.email,
  whatsapp: personalInfo.socialLinks.whatsapp,
};

const OPEN_WINDOWS: Record<string, string> = {
  about: "AboutUs",
  projects: "Projects",
  experience: "Experience",
  notes: "Notes",
};

const Terminal: React.FC<TerminalProps> = ({
  onClickClose,
  onClickMinimize,
  setActiveElement,
  zIndexVal,
  activeElement,
}) => {
  const navigate = useNavigate();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineId = useRef(0);
  const hasBooted = useRef(false);

  const pushLines = useCallback((...contents: React.ReactNode[]) => {
    setLines(prev => [
      ...prev,
      ...contents.map(content => ({ id: lineId.current++, content })),
    ]);
  }, []);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;
    pushLines(
      <div className={styles.welcome}>
        <span>
          Last login: {new Date().toDateString()} on console — Welcome to{" "}
          <span className={styles.highlight}>AryaOS</span>
        </span>
        <span>
          Type <span className={styles.cmd}>help</span> to see what this
          terminal can do.
        </span>
      </div>
    );
    // Run once on mount: the boot banner should not repeat.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const prompt = (
    <>
      <span className={styles.promptUser}>
        {PROMPT_USER}@{PROMPT_HOST}
      </span>
      <span className={styles.promptPath}> ~ </span>
      <span className={styles.promptSymbol}>%</span>
    </>
  );

  const runHelp = () => {
    pushLines(
      <div className={styles.helpGrid}>
        {[
          ["help", "show this list"],
          ["about", "who is Arya?"],
          ["projects", "list all projects"],
          ["project <n>", "details for project number n"],
          ["experience", "where I've worked"],
          ["skills", "what I work with"],
          ["achievements", "hackathon wins & honours"],
          ["contact", "ways to reach me"],
          ["open <target>", "github | linkedin | leetcode | resume | email"],
          ["open <app>", "about | projects | experience | notes"],
          ["neofetch", "system info, the right way"],
          ["ls / pwd / whoami / date / echo", "the classics"],
          ["history", "command history"],
          ["clear", "clear the screen"],
          ["exit", "close the terminal"],
        ].map(([cmd, desc]) => (
          <React.Fragment key={cmd}>
            <span className={styles.cmd}>{cmd}</span>
            <span>{desc}</span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const runAbout = () => {
    pushLines(
      <div className={styles.block}>
        <span className={styles.highlight}>
          {personalInfo.name} — {personalInfo.subtitle}
        </span>
        {personalInfo.about.map((para, i) => (
          <span key={i}>{para}</span>
        ))}
      </div>
    );
  };

  const runProjects = () => {
    pushLines(
      <div className={styles.block}>
        {projects.map((project, i) => (
          <span key={project.title}>
            <span className={styles.index}>
              {String(i + 1).padStart(2, " ")}
            </span>{" "}
            <span className={styles.highlight}>{project.title}</span>{" "}
            <span className={styles.dim}>
              [{project.techStack.slice(0, 3).join(", ")}]
            </span>
          </span>
        ))}
        <span className={styles.dim}>
          Run `project &lt;number&gt;` for details, or `open projects` for the
          full app.
        </span>
      </div>
    );
  };

  const runProjectDetail = (arg: string) => {
    const index = parseInt(arg, 10) - 1;
    const project = projects[index];
    if (!arg || isNaN(index) || !project) {
      pushLines(
        <span className={styles.error}>
          usage: project &lt;1-{projects.length}&gt;
        </span>
      );
      return;
    }
    pushLines(
      <div className={styles.block}>
        <span className={styles.highlight}># {project.title}</span>
        {project.description.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
        <span>
          <span className={styles.dim}>stack:</span>{" "}
          {project.techStack.join(" · ")}
        </span>
        <span>
          <span className={styles.dim}>link:</span>{" "}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            {project.link}
          </a>
        </span>
      </div>
    );
  };

  const runExperience = () => {
    pushLines(
      <div className={styles.block}>
        {experience.map(exp => (
          <span key={exp.companyName + exp.duration}>
            <span className={styles.highlight}>{exp.companyName}</span>
            <span className={styles.dim}> — {exp.position}</span>{" "}
            <span className={styles.index}>({exp.duration})</span>
          </span>
        ))}
        <span className={styles.dim}>
          Run `open experience` for the full story.
        </span>
      </div>
    );
  };

  const runSkills = () => {
    const techs = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => techs.add(t)));
    experience.forEach(e => e.techStack.forEach(t => techs.add(t)));
    pushLines(
      <div className={styles.block}>
        <span>{personalInfo.technologies}</span>
        <span>
          <span className={styles.dim}>battle-tested with:</span>{" "}
          {Array.from(techs).join(" · ")}
        </span>
      </div>
    );
  };

  const runAchievements = () => {
    pushLines(
      <div className={styles.block}>
        {achievementNotes.map(note => (
          <span key={note.id}>
            <span className={styles.trophy}>🏆</span>{" "}
            <span className={styles.highlight}>{note.title}</span>{" "}
            <span className={styles.dim}>({note.date})</span>
          </span>
        ))}
      </div>
    );
  };

  const runContact = () => {
    pushLines(
      <div className={styles.block}>
        {Object.entries(OPEN_TARGETS).map(([name, url]) => (
          <span key={name}>
            <span className={styles.index}>{name.padEnd(9, " ")}</span>{" "}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              {url.replace("mailto:", "")}
            </a>
          </span>
        ))}
      </div>
    );
  };

  const runOpen = (arg: string) => {
    const target = arg.toLowerCase();
    if (OPEN_TARGETS[target]) {
      window.open(OPEN_TARGETS[target], "_blank");
      pushLines(<span>Opening {target}...</span>);
    } else if (OPEN_WINDOWS[target]) {
      pushLines(<span>Launching {target}...</span>);
      navigate(`/window/${OPEN_WINDOWS[target]}`);
    } else {
      pushLines(
        <span className={styles.error}>
          open: unknown target "{arg}". Try: github, linkedin, leetcode,
          resume, email, about, projects, experience, notes
        </span>
      );
    }
  };

  const runNeofetch = () => {
    const uptimeYears = new Date().getFullYear() - 2021;
    pushLines(
      <div className={styles.neofetch}>
        <pre className={styles.ascii}>{APPLE_ASCII}</pre>
        <div className={styles.sysinfo}>
          <span className={styles.highlight}>
            {PROMPT_USER}@{PROMPT_HOST}
          </span>
          <span className={styles.dim}>─────────────────</span>
          <span>
            <span className={styles.cmd}>OS:</span> AryaOS (macOS-flavoured
            web)
          </span>
          <span>
            <span className={styles.cmd}>Host:</span> arya-nair.in
          </span>
          <span>
            <span className={styles.cmd}>Kernel:</span> React 18 + TypeScript
          </span>
          <span>
            <span className={styles.cmd}>Shell:</span> zsh (emulated)
          </span>
          <span>
            <span className={styles.cmd}>Uptime:</span> {uptimeYears}+ years
            shipping code
          </span>
          <span>
            <span className={styles.cmd}>Packages:</span> {projects.length}{" "}
            projects, {achievementNotes.length} trophies
          </span>
          <span>
            <span className={styles.cmd}>DE:</span> Aqua (handcrafted)
          </span>
          <span>
            <span className={styles.cmd}>CPU:</span> Caffeine-9000 @ 5.0GHz
          </span>
          <span>
            <span className={styles.cmd}>Memory:</span> mostly hackathon
            stories
          </span>
        </div>
      </div>
    );
  };

  const runLs = () => {
    pushLines(
      <div className={styles.lsGrid}>
        <span className={styles.dir}>About.app</span>
        <span className={styles.dir}>Projects.app</span>
        <span className={styles.dir}>Experience.app</span>
        <span className={styles.dir}>Notes.app</span>
        <span className={styles.file}>resume.pdf</span>
        <span className={styles.file}>secrets.txt</span>
      </div>
    );
  };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();

    pushLines(
      <span className={styles.echoLine}>
        {prompt} <span>{rawInput}</span>
      </span>
    );

    if (!trimmed) return;

    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ");

    switch (command.toLowerCase()) {
      case "help":
        runHelp();
        break;
      case "about":
        runAbout();
        break;
      case "projects":
        runProjects();
        break;
      case "project":
        runProjectDetail(args[0]);
        break;
      case "experience":
        runExperience();
        break;
      case "skills":
        runSkills();
        break;
      case "achievements":
        runAchievements();
        break;
      case "contact":
      case "socials":
        runContact();
        break;
      case "open":
        runOpen(args[0] || "");
        break;
      case "neofetch":
        runNeofetch();
        break;
      case "ls":
        runLs();
        break;
      case "pwd":
        pushLines(<span>/Users/{PROMPT_USER}/portfolio</span>);
        break;
      case "whoami":
        pushLines(
          <span>
            {PROMPT_USER} — but this machine belongs to{" "}
            <span className={styles.highlight}>{personalInfo.name}</span>
          </span>
        );
        break;
      case "date":
        pushLines(<span>{new Date().toString()}</span>);
        break;
      case "echo":
        pushLines(<span>{arg}</span>);
        break;
      case "history":
        pushLines(
          <div className={styles.block}>
            {[...history, trimmed].map((cmd, i) => (
              <span key={i}>
                <span className={styles.index}>
                  {String(i + 1).padStart(3, " ")}
                </span>{" "}
                {cmd}
              </span>
            ))}
          </div>
        );
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        pushLines(<span>logout</span>);
        setTimeout(onClickClose, 300);
        break;
      case "sudo":
        pushLines(
          <span className={styles.error}>
            {PROMPT_USER} is not in the sudoers file. This incident will be
            reported. 😏
          </span>
        );
        break;
      case "rm":
        pushLines(
          <span className={styles.error}>
            rm: refusing to delete a perfectly good portfolio.
          </span>
        );
        break;
      case "cat":
        if (args[0] === "secrets.txt") {
          pushLines(
            <span>
              The real secret is the hackathons we won along the way. Try{" "}
              <span className={styles.cmd}>achievements</span>.
            </span>
          );
        } else if (args[0] === "resume.pdf") {
          runOpen("resume");
        } else {
          pushLines(
            <span className={styles.error}>
              cat: {args[0] || "<file>"}: No such file or directory
            </span>
          );
        }
        break;
      case "hi":
      case "hello":
        pushLines(
          <span>
            Hello there! 👋 Type <span className={styles.cmd}>help</span> to
            explore.
          </span>
        );
        break;
      case "vim":
      case "nano":
      case "emacs":
        pushLines(
          <span className={styles.error}>
            {command}: this terminal is too small for an editor war.
          </span>
        );
        break;
      default:
        pushLines(
          <span className={styles.error}>
            zsh: command not found: {command}. Type{" "}
            <span className={styles.cmd}>help</span> for available commands.
          </span>
        );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (event.key === "Tab") {
      event.preventDefault();
      const current = input.trimStart();
      if (!current || current.includes(" ")) return;
      const matches = COMMAND_NAMES.filter(cmd => cmd.startsWith(current));
      if (matches.length === 1) {
        setInput(matches[0] + " ");
      } else if (matches.length > 1) {
        pushLines(
          <span className={styles.echoLine}>
            {prompt} <span>{input}</span>
          </span>,
          <span className={styles.dim}>{matches.join("   ")}</span>
        );
      }
    } else if (event.key === "c" && event.ctrlKey) {
      pushLines(
        <span className={styles.echoLine}>
          {prompt} <span>{input}</span>
          <span className={styles.dim}>^C</span>
        </span>
      );
      setInput("");
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <WindowBox
      onClickClose={onClickClose}
      onClickMinimize={onClickMinimize}
      setActive={() => setActiveElement("Terminal")}
      zIndexVal={zIndexVal}
      offset={80}
      displayText={`${PROMPT_USER}@${PROMPT_HOST} — zsh`}
      activeElement={activeElement === "Terminal"}
      displayTextMobile="Terminal"
    >
      <div
        className={styles.terminal}
        onClick={() => inputRef.current?.focus()}
        ref={scrollRef}
        role="application"
        aria-label="Interactive terminal. Type help for available commands."
      >
        <div className={styles.output}>
          {lines.map(line => (
            <div key={line.id} className={styles.line}>
              {line.content}
            </div>
          ))}
        </div>
        <div className={styles.inputLine}>
          {prompt}
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </WindowBox>
  );
};

export default Terminal;
