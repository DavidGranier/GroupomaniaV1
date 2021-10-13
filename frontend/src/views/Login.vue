<template>
  <div class="login">
    <Header/>
    <Connexion/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Connexion from '@/components/Connexion.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Connexion
  },
}
</script>


<style scoped>

.login {
  width: 100%;
  min-height: 100vh;
}
</style>
