import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Container.module.css";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar/Navbar";
import WindowRenderer from "./WindowRenderer";
import CommandCentre from "../CommandCentre";
import DesktopApp from "../DesktopApp/DesktopApp";
import BootScreen from "../BootScreen/BootScreen";
import MobileHomeScreen from "../MobileHomeScreen";
import NotificationCenter from "../NotificationCenter";
import TrophyPanel from "../TrophyPanel";
import MatrixRain from "../MatrixRain";
import ContextMenu, { ContextMenuItem } from "../ContextMenu";
import { useWindowManager } from "../../hooks/useWindowManager";
import { useIsMobile } from "../../hooks/useIsMobile";
import { unlock } from "../../utils/achievements";
import { notify } from "../../utils/notifications";

const WALLPAPERS = ["lofi", "aurora", "synthwave", "graphite"] as const;
type Wallpaper = (typeof WALLPAPERS)[number];
const WALLPAPER_KEY = "aryaos-wallpaper";

const KONAMI = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const SCREENSAVER_IDLE_MS = 90000;

function readWallpaper(): Wallpaper {
  try {
    const stored = window.localStorage.getItem(WALLPAPER_KEY) as Wallpaper;
    return WALLPAPERS.includes(stored) ? stored : "lofi";
  } catch {
    return "lofi";
  }
}

const Container: React.FC = () => {
  const {
    windowStates,
    activeElement,
    brightness,
    showPreloader,
    showCommandCentre,
    slug,
    searchParams,
    setBrightness,
    activateWindow,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleCommandCentre,
    closeCommandCentre,
    updateSlug,
    appConfig,
    windowComponentsConfig,
  } = useWindowManager();

  const isMobile = useIsMobile(600);
  const [wallpaper, setWallpaper] = useState<Wallpaper>(readWallpaper);
  const [matrixActive, setMatrixActive] = useState(false);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [trophiesOpen, setTrophiesOpen] = useState(false);
  const [powerState, setPowerState] = useState<"on" | "shutting" | "off">("on");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const wallpaperRef = useRef<HTMLDivElement>(null);
  const konamiIndex = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  const cycleWallpaper = useCallback(() => {
    setWallpaper(prev => {
      const next =
        WALLPAPERS[(WALLPAPERS.indexOf(prev) + 1) % WALLPAPERS.length];
      try {
        window.localStorage.setItem(WALLPAPER_KEY, next);
      } catch {
        // Preference simply won't persist.
      }
      return next;
    });
    unlock("wallpaper");
  }, []);

  const shutDown = useCallback(() => {
    unlock("shutdown");
    setPowerState("shutting");
    setTimeout(() => setPowerState("off"), 750);
  }, []);

  const powerOn = useCallback(() => {
    try {
      window.sessionStorage.removeItem("aryaos-booted");
    } catch {
      // Boot flag could not be cleared; reload still replays the app.
    }
    window.location.replace("/");
  }, []);

  // Global system events (terminal commands, menus, springboard).
  useEffect(() => {
    const handleMatrix = () => setMatrixActive(true);
    const handleShutdown = () => shutDown();
    const handleCommandCentre = () => toggleCommandCentre();
    const handleWallpaper = () => cycleWallpaper();

    window.addEventListener("aryaos-matrix", handleMatrix);
    window.addEventListener("aryaos-shutdown", handleShutdown);
    window.addEventListener("aryaos-command-centre", handleCommandCentre);
    window.addEventListener("aryaos-wallpaper", handleWallpaper);
    return () => {
      window.removeEventListener("aryaos-matrix", handleMatrix);
      window.removeEventListener("aryaos-shutdown", handleShutdown);
      window.removeEventListener("aryaos-command-centre", handleCommandCentre);
      window.removeEventListener("aryaos-wallpaper", handleWallpaper);
    };
  }, [shutDown, toggleCommandCentre, cycleWallpaper]);

  // Konami code listener.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === KONAMI[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI.length) {
          konamiIndex.current = 0;
          unlock("konami");
          setMatrixActive(true);
        }
      } else {
        konamiIndex.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Idle screensaver.
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setScreensaverActive(true);
        unlock("matrix");
      }, SCREENSAVER_IDLE_MS);
    };

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "wheel",
    ];
    events.forEach(event => window.addEventListener(event, resetIdle));
    resetIdle();

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach(event => window.removeEventListener(event, resetIdle));
    };
  }, []);

  // Wallpaper parallax (desktop pointers only).
  useEffect(() => {
    if (isMobile || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const handleMouseMove = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const dx = (event.clientX / window.innerWidth - 0.5) * 2;
        const dy = (event.clientY / window.innerHeight - 0.5) * 2;
        if (wallpaperRef.current) {
          wallpaperRef.current.style.transform = `scale(1.06) translate3d(${
            dx * -8
          }px, ${dy * -6}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, showPreloader]);

  // Welcome experience after first boot of the session.
  useEffect(() => {
    if (showPreloader) return;
    unlock("welcome");
    const timer = setTimeout(() => {
      try {
        if (window.sessionStorage.getItem("aryaos-welcomed")) return;
        window.sessionStorage.setItem("aryaos-welcomed", "true");
      } catch {
        // Without storage the welcome may repeat; harmless.
      }
      notify({
        title: "Welcome to AryaOS 👋",
        message: isMobile
          ? "Open the Terminal and type `help`. There are 13 trophies hidden around here."
          : "Press ⌘K to explore, or open the Terminal and type `help`. 13 trophies are hidden around here.",
        icon: "🍎",
        duration: 8000,
      });
    }, 900);
    return () => clearTimeout(timer);
  }, [showPreloader, isMobile]);

  const handleContextMenu = (event: React.MouseEvent) => {
    if (isMobile) return;
    const target = event.target as HTMLElement;
    // Only the desktop itself gets the custom menu — not windows or chrome.
    if (target.closest("[data-window], [role='toolbar'], [data-chrome]")) {
      return;
    }
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const contextMenuItems: ContextMenuItem[] = [
    {
      label: "New Terminal",
      onClick: () => activateWindow("Terminal"),
    },
    {
      label: "Change Wallpaper",
      onClick: cycleWallpaper,
      separatorAfter: true,
    },
    {
      label: "Trophy Room",
      onClick: () => setTrophiesOpen(true),
    },
    {
      label: "Start Screensaver",
      onClick: () => setScreensaverActive(true),
      separatorAfter: true,
    },
    {
      label: "About This Portfolio",
      onClick: () => activateWindow("AboutUs"),
    },
    {
      label: "Shut Down...",
      onClick: shutDown,
      separatorAfter: true,
    },
    {
      label: "Do Not Click This",
      onClick: () => {
        unlock("forbidden");
        document.body.classList.add("aryaos-glitch");
        setTimeout(() => document.body.classList.remove("aryaos-glitch"), 1200);
      },
      danger: true,
    },
  ];

  if (showPreloader) {
    return <BootScreen duration={appConfig.preloader.duration} />;
  }

  if (powerState === "off") {
    return (
      <div className={styles.powerOffScreen} onClick={powerOn}>
        <span className={styles.powerSymbol}>⏻</span>
        <span className={styles.powerHint}>click anywhere to power on</span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${
        powerState === "shutting" ? styles.crtOff : ""
      }`}
      style={{
        opacity: brightness,
      }}
      onContextMenu={handleContextMenu}
    >
      <div
        ref={wallpaperRef}
        className={`${styles.wallpaper} ${styles[wallpaper]}`}
        aria-hidden="true"
      />

      <Navbar
        setBrightness={setBrightness}
        brightness={brightness}
        onCommandCentreToggle={toggleCommandCentre}
        activeElement={activeElement}
        onOpenApp={activateWindow}
        onTrophiesToggle={() => setTrophiesOpen(prev => !prev)}
      />

      {isMobile ? (
        !activeElement && (
          <MobileHomeScreen
            windowConfigs={windowComponentsConfig}
            onAppOpen={activateWindow}
            onTrophiesOpen={() => setTrophiesOpen(true)}
          />
        )
      ) : (
        <DesktopApp />
      )}

      {windowComponentsConfig.map(config => (
        <WindowRenderer
          key={config.id}
          config={config}
          isVisible={windowStates[config.id]?.isVisible || false}
          zIndex={windowStates[config.id]?.zIndex || config.defaultZIndex}
          activeElement={activeElement}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          setActiveElement={focusWindow}
          slug={slug}
          searchParams={searchParams}
          updateSlug={updateSlug}
        />
      ))}

      {!isMobile && (
        <Toolbar
          selectActiveItem={activateWindow}
          activeElement={activeElement}
          windowStates={windowStates}
        />
      )}

      <CommandCentre
        isVisible={showCommandCentre}
        onClose={closeCommandCentre}
        windowConfigs={windowComponentsConfig}
        onApplicationSelect={activateWindow}
        windowStates={windowStates}
      />

      <NotificationCenter />

      <TrophyPanel
        isOpen={trophiesOpen}
        onClose={() => setTrophiesOpen(false)}
      />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}

      {(matrixActive || screensaverActive) && (
        <MatrixRain
          onDismiss={() => {
            setMatrixActive(false);
            setScreensaverActive(false);
          }}
          showClock={screensaverActive}
          caption={
            screensaverActive
              ? "AryaOS — touch anything to wake"
              : "you took the red pill — press any key to exit"
          }
        />
      )}
    </div>
  );
};

export default Container;
