<script setup>

</script>

<template>
  <section aria-label="Contact Section" id="contact-section">
    <div class="container" id="contact-wrapper">
      <div id="contact-left">
        <div>
          <h2>Contact Information</h2>
          <div class="mb-3">Have an inquiry? Fill out the form to contact our team.</div>
        </div>
        <div>
          <div>
            <img src="../assets/images/phone.svg" alt="Phone Icon">
            <div>+36 30 123 4567</div>
          </div>
          <div>
            <img src="../assets/images/email.svg" alt="Email Icon">
            <div>support@dineease.com</div>
          </div>
          <div>
            <img src="../assets/images/location-filled.svg" alt="Location Icon">
            <div>132 Dartmouth Street Boston, Massachusetts 02156 United States</div>
          </div>
        </div>
        <div class="social-icons">
          <img src="../assets/images/Facebook Icon.png" alt="Facebook Icon">
          <img src="../assets/images/Instagram Icon.png" alt="Instagram Icon">
          <img src="../assets/images/Twitter Icon.png" alt="Twitter Icon">
        </div>
      </div>
      <div id="contact-right">
        <h1>Contact Us</h1>
        <small class="mb-2">Have an inquiry? Fill out the form to contact our team.</small>
        <form action="" method="post" id="form-contact">
          <div class="form-2">
            <div>
              <label for="fname" class="visually-hidden"></label>
              <input type="text" name="fname" id="fname" class="form-control" placeholder="First Name">
            </div>
            <div>
              <label for="lname" class="visually-hidden"></label>
              <input type="text" name="lname" id="lname" class="form-control" placeholder="First Name">
            </div>
          </div>
          <div class="form-2">
            <div>
              <label for="email" class="visually-hidden"></label>
              <input type="email" name="email" id="email" class="form-control" placeholder="Email">
            </div>
            <div>
              <label for="phone" class="visually-hidden"></label>
              <input type="text" name="phone" id="phone" class="form-control" placeholder="Phone Number">
            </div>
          </div>
          <div>
            <label for="message" class="visually-hidden"></label>
            <textarea placeholder="Message" name="message" id="message"  rows="10" class="form-control">
                        </textarea>
          </div>

          <div>
            <button class="btn">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>