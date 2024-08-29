<template>

  <div class="card">
    <div class="card-body mx-10">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Username</label>
          <input type="text" class="form-control" id="inputUsername" v-model="username" aria-describedby="usernameHelp">
          <div id="usernameHelp" class="form-text">Do not use your email.</div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="inputPassword">
        </div>
        <div class="my-5 form-check text-left">
          <input type="checkbox" class="form-check-input" id="inputStayLoggedIn">
          <label class="form-check-label" for="inputStayLoggedIn">Remember me</label>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuth } from '@/services/useAuth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const login = () => {
      const {  login } = useAuth();

      if (login(username.value, password.value)) {
        router.push('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    };

    return { username, password, login };
  }
};
</script>