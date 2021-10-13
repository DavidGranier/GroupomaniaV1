<template>
    
    <div class="parametres">
      <HeaderAuth/>
      <div class="contenu">
        <h1>Paramètres</h1>
        <Parametres/>
      </div>

    </div>
</template>

<script>
// @ is an alias to /src
import HeaderAuth from '@/components/HeaderAuth.vue'
import Parametres from '@/components/Parametres.vue'


export default {
  name: 'Settings',
  components: {
    HeaderAuth,
    Parametres

  },

  created(){                        // hook de cycle de vie qui intervient avant le hook mounted et vérifie la session utilisateur (Item dans le localStorage)
    this.connectedUser()
  },

  methods: {
    connectedUser(){                // fonction de vérification de la session utilisateur (Item dans le localStorage)
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Login' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
      }
    },

    
  }
}
</script>

<style lang="scss" scoped>


</style>