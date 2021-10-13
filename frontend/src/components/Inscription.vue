
<template>

    <div class="inscription">

      <form @submit.prevent = signup()><!--FONCTION signup()-->

        <label for="nom">Nom</label>
        <input id="nom" ref="nom" type="text" placeholder="Nom" title="Nom" required>

        <label for="prenom">Prénom</label>
        <input id="prenom" ref="prénom" type="text" placeholder="Prénom" title="Prénom" required>

        <label for="email">E-mail</label>
        <input id="email" ref="email" type="email" placeholder="E-mail" title="E-mail" required>
        
        <label for="password">Mot de passe</label>
        <input id="password" ref="password" type="password" placeholder="Mot de passe" title="Mot de passe" required>
        <input id="password2" ref="password" type="password" placeholder="Mot de passe" title="Mot de passe" required>

        <div class="message-erreur">{{ message }}</div>
        
          <button id="login" type="submit" v-on:click="signup()" class="bouton">S'inscrire</button>
          <router-link :to="{name:'Login'}" id="signup" tag="button" ><button class="bouton">Retour</button></router-link>
            
        </form>
        
    </div>

</template>


<script>
import {notConnectedClient} from "@/services/auth.js"

export default({
    data() {
        return {
            message: "",
        };
    },

  /*created(){
  this.connectedUser()
  },*/

  methods: {
        connectedUser(){                                    // fonction de vérification de la session utilisateur (Item dans le localStorage)
            if(localStorage.groupomaniaUser == undefined){
                this.approuvedConnexion = false;
                console.log('Utilisateur non connecté !');
            } 
            else {
                this.approuvedConnexion = true;
                console.log('Utilisateur connecté !');
                location.href = '/home';
            }
        },

        signup(){                                        // fonction qui gère la création d'un nouvel utilisateur (requête)
            const nom = document.getElementById("nom").value;
            const prenom = document.getElementById("prenom").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const password2 = document.getElementById("password2").value;

            if(password === password2){             // on vérifie que le mot de passe est confirmé
                notConnectedClient.post("/users/signup", {
                nom,
                prenom,
                email,
                password
                })
                .then((res) => {
                if(res.status === 201) {                    // si l'inscription s'est bien déroulée, on créer l'item dans le localStorage pour créer la session utilisateur
                    const groupomaniaUser = {               
                        token: res.data.token
                    }
                    localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));
                    this.$router.push({ name:'Home' })
                }
                })
                .catch((error) => {
                    this.message = error.response.data.error;
                })
            } else {
                this.message = "Veuillez confirmer votre mot de passe";
            }
        }
    }

})
</script>


<style  scoped>

.inscription {
    background: #ecf0f3;
    width: 350px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inscription > form{
    display:flex;
    flex-direction: column;
    margin: 30px auto 30px auto;
}

.inscription > form > input {
    width: 250px;
    height: 40px;
    border: none;
    margin-bottom: 30px;
}

</style>