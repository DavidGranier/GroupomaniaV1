<template>
  <div class="home">
    <HeaderAuth/>
    <div class="contenu">
      
      <Publier/>
      <Post/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import HeaderAuth from '@/components/HeaderAuth.vue'

import Publier from '@/components/Publier.vue'
import Post from '@/components/Post.vue'


export default {
  name: 'Login',

  components: {
    HeaderAuth,
    
    Publier,
    Post

  },

  data() {
    return{
      approuvedConnexion: false,      // on déclare une varibale de type boléen, false par défault (contiendra la validation comme quoi un utilisateur est authentifié)
      sessionUserId: 0,               // on déclare une varibale de type nombre, 0 par défault (contiendra le userId du token de la session utilisateur)
      sessionUserAcces: 0,            // on déclare une varibale de type nombre, 0 par défault (contiendra le niveau d'acces du token de la session utilisateur)
      message: ""                     // on déclare une varibale de type string, vide par défault (contiendra les messages d'erreur envoyé par le back)
    };
  },

  created(){                        // hook de cycle de vie qui intervient avant le hook mounted et vérifie la session utilisateur (Item dans le localStorage)
    this.connectedUser()
    
  },

  mounted(){
    if(this.approuvedConnexion === true) {
      const token = JSON.parse(localStorage.groupomaniaUser).token                            // on récupère le token dans le localstorage
      let decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_AUTH_SECRET_TOKEN);        // on décode le token avec la fonction verify qui prend le token et la clé secrète
      this.sessionUserId = decodedToken.userId                                                // on récupère le UserId
      this.sessionUserAcces = decodedToken.niveau_acces                                       // on récupère le niveau d'acces
    }
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

<style>

</style>