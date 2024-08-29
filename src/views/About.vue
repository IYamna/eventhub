<template>
  <div class="container">
    <h1 class="text-center mb-4">À propos d'EventHub</h1>
    
    <p>EventHub est une plateforme de gestion d'événements.</p>
    
    <h2>Les Fonctionnalités</h2>
    <ul>
      <li>Création et gestion d'événements</li>
      <li>Inscription aux événements de son choix</li>
      <li>Tableau de bord personnalisé pour suivre vos événements</li>
      <li>Système de notifications</li>
      <li>Interface intuitive et responsive</li>
    </ul>
    
    <p>Retrouvez tout un tas d'évènements pour correspondre à tous les goûts!.</p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  props: {
    msg: String
  }
}
</script>

<!-- L'attribut scoped permet de limiter le CSS à ce component -->
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
