<script setup>
</script>

<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/reservas">Reservas</router-link>
    <router-link to="/clientes">Clientes</router-link>
    <router-link to="/servicios">Servicios</router-link>
  </nav>

  <main class="content">
    <router-view />
  </main>
</template>

<style>
/* Barra de navegación */
.navbar {
  display: flex;
  gap: 20px;
  background: #2c3e50;
  padding: 15px 25px;
  font-size: 18px;
  border-bottom: 3px solid #1a252f;
}

/* Enlaces normales */
.navbar a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
}

/* Hover bonito */
.navbar a:hover {
  color: #1abc9c;
  transform: translateY(-2px);
}

/* Página activa */
.router-link-active {
  color: #1abc9c;
  font-weight: bold;
}

/* Contenido principal */
.content {
  padding: 30px;
  font-family: Arial, sans-serif;
}
</style>
