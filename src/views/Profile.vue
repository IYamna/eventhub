<template>
  <div class="card">
    <div class="card-body mx-10">
      <form >
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Username</label>
          <input type="text" disabled class="form-control" id="inputUsername" v-model="username" aria-describedby="usernameHelp">
        </div>
        </form>

    </div>
  </div>

  <div class="card mt-5">
    <div class="card-body mx-10">
      <form>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Current password</label>
            <input type="password" v-model="password" class="form-control" id="inputPassword">
          </div>
          <div class="my-3">
            <label for="inputPassword" class="form-label">New password</label>
            <input type="password" v-model="password" class="form-control" id="inputPassword">
          </div>
          <div class="mb-3">
            <label for="inputPassword" class="form-label">Confirm password</label>
            <input type="password" v-model="password" class="form-control" id="inputPassword">
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">Change password</button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/services/useAuth';
import { ref } from 'vue';

export default {
  

  setup() {
    const { currentUser } = useAuth();
    const username = ref('');
    const password = ref('');

    username.value = currentUser.value.username;
    password.value = currentUser.value.password;


    return {currentUser, username, password}
  },
  name: 'ProfilePage',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
