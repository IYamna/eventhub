import users from '@/data/users.json';

// Fonction pour obtenir les utilisateurs du Local Storage ou initialiser avec les données du fichier JSON
const getUsers = () => {
  const usersStr = localStorage.getItem('users');
  if (usersStr) {
    return JSON.parse(usersStr);
  }
  localStorage.setItem('users', JSON.stringify(users));
  return users;
};

// Fonction pour sauvegarder les utilisateurs dans le Local Storage
const saveUsers = (userss) => {
  localStorage.setItem('users', JSON.stringify(userss));
};

export const authService = {
  login(username, password) {
    const user = users.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem('currentUser');
  },

  register(username, password) {
    if (users.users.some(u => u.username === username)) {
      return false; // L'utilisateur existe déjà
    }
    const newUser = {
      id: users.users.length + 1,
      username,
      password
    };
    users.users.push(newUser);
    saveUsers(users);
    return true;
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  },

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  },

  // Nouvelle méthode pour obtenir tous les utilisateurs
  getAllUsers() {
    return getUsers().users;
  }

};