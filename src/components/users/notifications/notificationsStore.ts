import { Notification } from "@/lib/computedtypes";
import { create } from "zustand";

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;

  setNotifications: (n: Notification[]) => void;
  addNotification: (n: Notification) => void;
  markAllRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  unreadCount: 0,

  setNotifications: (n) =>
    set(() => ({
      notifications: n,
      unreadCount: n.filter((x) => !x.read).length,
    })),

  addNotification: (n) =>
    set((state) => ({
      notifications: [n, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),

  markAllRead: () =>
    set((state) => {
      const hasUnread = state.notifications.some((n) => !n.read);

      if (!hasUnread) {
        // Avoid unnecessary array rebuild
        return { unreadCount: 0 };
      }

      return {
        notifications: state.notifications.map((x) => ({
          ...x,
          read: true,
          read_at: new Date().toISOString(),
        })),
        unreadCount: 0,
      };
    }),
}));
