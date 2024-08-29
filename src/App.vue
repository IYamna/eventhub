<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">EventHub</a>
      <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
      
      <div class="btn-group" role="group" aria-label="Basic example">
        <div v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/register">
            <button class="nav-item btn btn-primary">Register</button>
          </router-link>
        </div>
        <div v-if="!isLoggedIn" class="nav-item mx-2">
          <router-link class="nav-link" to="/login">
            <button class="nav-item btn btn-primary">Login</button>
          </router-link>
        </div>
        <div v-if="isLoggedIn" class="navbar-text mr-3">
          <router-link class="nav-link" to="/profile">
            <button class="nav-item btn btn-primary">Profile</button>
          </router-link>
        </div>
        <div v-if="isLoggedIn" class="navbar-text">
          <button @click="handleLogout" class="nav-item btn btn-primary">Logout</button>
        </div>
      </div>
    </div>
  </nav>

  <NotificationList />

  <div class="container mt-5">
    <router-view/>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import NotificationList from '@/views/NotificationList.vue';
import { eventService } from '@/services/eventService';
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/useAuth';

export default {
  components: {
    NotificationList
  },
  setup() { 
    const { isLoggedIn, logout, currentUser } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
      logout();
      router.push('/');
    };

    onMounted(() => {
      // Vérifier les événements à venir toutes les heures
      setInterval(() => {
        if (currentUser.value) {
          eventService.checkUpcomingEvents(currentUser.value.id);
        }
      }, 3600000); // 3600000 ms = 1 heure
    });

    return { isLoggedIn, handleLogout };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.custom-navbar {
  background-color: #2c3e50;
  padding: 10px 0;
}

.navbar-brand {
  font-weight: bold;
  font-size: 24px;
}

.navbar-nav .nav-link {
  color: black;
  margin: 0 10px;
  font-size: 16px;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: #3498db !important;
}

.btn-outline-light {
  margin-left: 10px;
}

.btn-outline-light:hover {
  background-color: #3498db;
  border-color: #3498db;
}
</style>