<script setup>

</script>

<template>
  <!--    header-->
  <header>
    <nav class="navbar" role="navigation">
      <div class="logo">
        <a href="index.html"><img src="../assets/images/Logo@3x.png" alt="DineEase"></a>
      </div>
      <label for="toggle-menu" id="menu-icon" role="button"><img src="../assets/images/Menu Icon@3x.png" alt="Menu Icon"></label>
      <input type="checkbox" name="toggle-menu" id="toggle-menu" aria-hidden="true" hidden>
      <ul class="navbar-nav" role="menubar">
        <li role="menuitem"><router-link :to="{name: 'Home'}">Home</router-link></li>
        <li role="menuitem"><router-link :to="{name: 'About'}">About Us</router-link></li>
        <li role="menuitem"><router-link :to="{name: 'Contact'}">Contact</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>

</style>