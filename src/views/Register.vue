<template>

  <div class="card">
    <div class="card-body mx-10">
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Username</label>
          <input type="text" class="form-control" id="inputUsername" v-model="username" aria-describedby="usernameHelp">
          <div id="usernameHelp" class="form-text">Do not use your email.</div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="inputPassword">
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
    
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { authService } from '@/services/auth';
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/useAuth';

export default {
  name: 'RegisterForm',
  setup() {
    const username = ref('');
    const password = ref('');
    const { login } = useAuth();
    const router = useRouter();

    const register = () => {
      if (authService.register(username.value, password.value)) {
        // Connexion automatique après l'enregistrement
        if (login(username.value, password.value)) {
          router.push('/dashboard');
        }
      } else {
        alert('Username already exists');
      }
    };

    return { username, password, register };
  }
};
</script>