<template>

    <div class="settings">

        

        <button class="bouton" @click="logout()">Se déconnecter</button>

        <form @submit.prevent = modifyName()>
          <input id="prenom" ref="prenom" type="text" placeholder="Prenom" title="Prenom">
          <input id="nom" ref="nom" type="text" placeholder="Nom" title="Nom">
          <button class="bouton" type="submit">Modifier mon Nom / Prénom</button>
          <p>{{ errorMessage }}{{ succesMessage }}</p>
        </form>

        <button class="bouton" v-on:click="deleteUser()">Supprimer le compte</button>
         
    </div>

</template>

<script>
import {connectedClient} from "@/services/auth.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export default ({


  data() {
    return{
      approuvedConnexion: false,          // on déclare une varibale de type boléen, false par défault (contiendra la validation comme quoi un utilisateur est authentifié)
      sessionUserId: 0,
      sessionUserAcces:0,
      userProfil: [],
      errorMessage: "",
      succesMessage: ""
    };
  },
    created(){
    this.connectedUser()
  },

  mounted() {
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

    modifyName(){
      
      const prenom = document.getElementById("prenom").value;
      const nom = document.getElementById("nom").value;

      if(prenom !== "" || nom !== ""){
        
        connectedClient.put("/users/update", {prenom, nom}) 
        .then((res) => {
          if(res.status === 200) {
              this.errorMessage = "";
              this.succesMessage = res.data.message;
          }
          if(res.status === 400){
            this.errorMessage = res.data.error;
            this.succesMessage = "";
          }
        })
        .catch((error) => {
              this.errorMessage = error.data.error;
        })
      }
      else{
        this.errorMessage = "Champs vides!"
        }
    },

    logout(){
      localStorage.clear();
      location.reload();
    },

    deleteUser(){
      if(window.confirm("ATTENTION : La suppression de votre compte est définitive ! Voulez-vous vraiment supprimer votre compte ?")){
        const userId = this.sessionUserId;
        connectedClient.delete(`/users/${userId}`)
        .then((res) => {
          if(res.status === 200) {
            this.succesMessage = res.data.message;
            localStorage.clear();
            setTimeout(function() {location.href = '/';}, 2000)
          }
        })
        .catch((error) => {
            this.errorMessage = error.response.data.error;
            setTimeout(function() {location.reload()}, 2000)
        })
      }
    }

  }
})
</script>


<style lang="scss" scoped>

.settings{
    background-color:white ;
    width: 260px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 200px;

}

form{
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

form > input {
    width: 250px;
    height: 40px;
    
    margin-bottom: 30px;
}

</style>