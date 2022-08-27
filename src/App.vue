<template>
  <div id="app">
    <nav>
      <router-link to="/" exact-active-class="active">Home</router-link> |
      <router-link to="/login" active-class="active">Login</router-link> |
      <router-link to="/profile" exact-active-class="active">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
}

nav {
  padding: 30px;
  margin-bottom: 30px !important;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.active {
  color: #42b983;
}
</style>
