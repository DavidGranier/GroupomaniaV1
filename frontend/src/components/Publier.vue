<template>
    <div class="publier">
      
        <form @submit.prevent = newPublication()>
            
            <h1>Bonjour {{ userName.userPrenom }} {{ userName.userNom }}!</h1>
            <br>
            <textarea id="posttext" type="textarea" placeholder="Exprimez-vous!"></textarea>
            <div>{{message}}</div>
            <button type="submit" class="bouton">Publier</button>
            <input type="file" accept="image/jpg,image/jpeg,image/png" ref="uploadImage" id="uploadImage" title="Renseignez une image pour votre publication"/>
            

        </form>
    </div>
</template>

<script>
import {connectedClient} from "@/services/auth.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export default {

  data() {
    return{
      approuvedConnexion: false,      // on déclare une varibale de type boléen, false par défault (contiendra la validation comme quoi un utilisateur est authentifié)
      sessionUserId: 0,               // on déclare une varibale de type nombre, 0 par défault (contiendra le userId du token de la session utilisateur)
      sessionUserAcces: 0,            // on déclare une varibale de type nombre, 0 par défault (contiendra le niveau d'acces du token de la session utilisateur)
      userName:"",
      
      message: ""  ,                   // on déclare une varibale de type string, vide par défault (contiendra les messages d'erreur envoyé par le back)
    };
  },

 created(){                          // hook de cycle de vie qui intervient avant le hook mounted et vérifie la session utilisateur (Item dans le localStorage)
    this.connectedUser()
    this.getName()
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
    connectedUser(){                                        // fonction de vérification de la session utilisateur (Item dans le localStorage)
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Home' })
      } else {
        this.approuvedConnexion = true;
        
      }
    },

    getName(){

      

      connectedClient.get(`/users/name`)
      .then(res => {
            
            this.userName = res.data[0];
            console.log(res);
            })
      .catch((error) => {
            console.log(error);
        })
    },
    

    newPublication(){                                     // fonction qui gère la création d'une nouvelle publication (requête)
        const userId = this.sessionUserId;
        const description = document.getElementById("posttext").value;
        const uploadImage = document.getElementById("uploadImage").files[0];
        console.log(userId, description, uploadImage)
        const fileName = document.getElementById("uploadImage").value;
        const lastDot = fileName.lastIndexOf(".") + 1;
        const extensionFile = fileName.substr(lastDot, fileName.length).toLowerCase();
      
        if (extensionFile=="jpg" || extensionFile=="jpeg" || extensionFile=="png" || uploadImage === undefined){    // vérification de l'extension du fichier
          let formData = new FormData();
          formData.append("userId", userId);
          formData.append("description", description);
          formData.append("image", uploadImage);
          console.log(formData.append);

          connectedClient.post('/publications', formData)
          .then((res) => {
            if(res.status === 201) {
                location.reload();
            }
          })
      } else{
          this.message = "Seul les images de type JPG/JPEG/PNG sont autorisées.";
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.publier{
    background: white;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px auto;
    &>form {
        text-align: center;
        &>img{
          width: 100px;
        }
    }
}

h1{
  font-size: 1.2em;
}

p{
  text-align: justify;
  padding : 20px;
  font-size: 0.9em;
}

textarea {
    width: 250px;
    height: 70px;
    
    font-family: Arial, Helvetica, sans-serif;
    
    resize: none;
    border: groove;
}

#uploadImage{
  margin-bottom: 20px;
}


</style>