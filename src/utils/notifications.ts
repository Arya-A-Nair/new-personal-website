export interface AppNotification {
  id: number;
  title: string;
  message: string;
  icon?: string;
  duration?: number;
}

type NotificationInput = Omit<AppNotification, "id">;
type Listener = (notification: AppNotification) => void;

let listeners: Listener[] = [];
let counter = 0;
// Notifications fired before the UI mounts (e.g. boot achievements) are
// buffered and flushed to the first subscriber.
let pending: AppNotification[] = [];

export function notify(input: NotificationInput): void {
  const notification: AppNotification = { ...input, id: counter++ };
  if (listeners.length === 0) {
    pending.push(notification);
    return;
  }
  listeners.forEach(listener => listener(notification));
}

export function onNotify(listener: Listener): () => void {
  listeners.push(listener);
  if (pending.length > 0) {
    const buffered = pending;
    pending = [];
    buffered.forEach(notification => listener(notification));
  }
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}
