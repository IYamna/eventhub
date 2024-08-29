import { ref, computed } from 'vue';
import { authService } from '@/services/auth';

const currentUser = ref(null);

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value);

  function login(username, password) {
    const success = authService.login(username, password);
    if (success) {
      currentUser.value = authService.getCurrentUser();
    }
    return success;
  }

  function logout() {
    authService.logout();
    currentUser.value = null;
  }

  function checkAuth() {
    currentUser.value = authService.getCurrentUser();
  }

  // Appeler checkAuth immédiatement pour initialiser l'état
  checkAuth();

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
    checkAuth
  };
}