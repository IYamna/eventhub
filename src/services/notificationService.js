const NOTIFICATIONS_KEY = 'user_notifications';

export const notificationService = {
  getNotifications() {
    const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
    return notifications ? JSON.parse(notifications) : [];
  },

  addNotification(notification) {
    const notifications = this.getNotifications();
    notifications.push(notification);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  },

  removeNotification(id) {
    const notifications = this.getNotifications().filter(n => n.id !== id);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  },

  clearNotifications() {
    localStorage.removeItem(NOTIFICATIONS_KEY);
  }
};