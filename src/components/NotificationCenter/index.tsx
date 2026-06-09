import React, { useEffect, useRef, useState } from "react";
import styles from "./NotificationCenter.module.css";
import { AppNotification, onNotify } from "../../utils/notifications";

const DEFAULT_DURATION = 5000;

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const unsubscribe = onNotify(notification => {
      setNotifications(prev => [...prev.slice(-3), notification]);
      const timer = setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
        timers.current.delete(notification.id);
      }, notification.duration ?? DEFAULT_DURATION);
      timers.current.set(notification.id, timer);
    });

    const pendingTimers = timers.current;
    return () => {
      unsubscribe();
      pendingTimers.forEach(timer => clearTimeout(timer));
      pendingTimers.clear();
    };
  }, []);

  const dismiss = (id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className={styles.stack} aria-live="polite">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={styles.banner}
          onClick={() => dismiss(notification.id)}
          role="status"
        >
          <span className={styles.icon}>{notification.icon ?? "💬"}</span>
          <div className={styles.text}>
            <span className={styles.title}>{notification.title}</span>
            <span className={styles.message}>{notification.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
