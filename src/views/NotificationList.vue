<template>
  <div class="notification-list">
    <div v-for="notification in notifications" :key="notification.id" class="alert alert-info alert-dismissible fade show" role="alert">
      {{ notification.message }}
      <button @click="dismissNotification(notification.id)" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { notificationService } from '@/services/notificationService';

export default {
  setup() {
    const notifications = ref([]);

    const loadNotifications = () => {
      notifications.value = notificationService.getNotifications();
    };

    const dismissNotification = (id) => {
      notificationService.removeNotification(id);
      loadNotifications();
    };

    onMounted(loadNotifications);

    return { notifications, dismissNotification };
  }
}
</script>