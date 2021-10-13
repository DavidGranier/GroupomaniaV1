<template>
  <div class="signup">
    <Header/>
    <Inscription/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Inscription from '@/components/Inscription.vue'

export default {
  name: 'Signup',
  components: {
    Header,
    Inscription
  }
}
</script>

<style scoped>

.signup {
  width: 100%;
  min-height: 100vh;
}
</style>