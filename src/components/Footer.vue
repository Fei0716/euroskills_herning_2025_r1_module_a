<script setup>

</script>

<template>
  <footer role="contentinfo">
    <div class="container" id="footer-wrapper">
      <div>
        <img src="../assets/images/Logomark.png" alt="Logo Mark of Dine Ease" id="img-logo">
<!--        <a href="privacy_policy.html">Privacy Policy</a>-->
        <router-link :to="{name: 'Privacy'}">Privacy Policy</router-link>
        <div>
          +36 30 123 4567 &nbsp;&nbsp; support@dineease.com
        </div>
        <div>
          © 2024 - All rights reserved
        </div>
      </div>
      <div>
        <h2>Follow Us</h2>
        <div class="social-icons">
          <img src="../assets/images/Facebook Icon.png" alt="Facebook Icon">
          <img src="../assets/images/Instagram Icon.png" alt="Instagram Icon">
          <img src="../assets/images/Twitter Icon.png" alt="Twitter Icon">
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>