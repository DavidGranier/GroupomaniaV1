<template>

    <div class="connexion">
        <h1>Connectez-vous</h1>
        <form @submit.prevent = login()><!--FONCTION login()-->

            <label for="email">E-mail</label>
            <input id="email" ref="email" type="email" placeholder="E-mail" title="E-mail" required>

            <label for="password">Mot de passe</label>
            <input id="password" ref="password" type="password" placeholder="Mot de passe" title="Mot de passe" required>

            <div class="message-erreur">{{ message }}</div>
    
            <button @click='login()' id="login" type="submit" class="bouton">Connexion</button>
            <router-link :to="{name:'Signup'}" id="signup" tag="button"><button class="bouton">Inscription</button></router-link>
            
        </form>
        
    </div>

</template>

<script>

import {notConnectedClient} from "@/services/auth.js"   
export default { 
    data() {
        return {
            message: "",                                        // on déclare une varibale de type string, vide par défault (contiendra les messages d'erreur envoyé par le back)

        };
    },

    created(){                        // hook de cycle de vie qui intervient avant le hook mounted et vérifie la session utilisateur (Item dans le localStorage)
        this.connectedUser()
    },
    
    methods:{
        login(){
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            notConnectedClient.post("/users/login",{email, password})
            .then((res) => {
                if(res.status === 200) {                            // si la requête est validée
                    const groupomaniaUser = {
                        token: res.data.token
                    }
                    

                    localStorage.clear('groupomaniaUser');
                    localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));   //on stockant dans le localStorage un item avec le token
                    
                    this.$router.push({ name:'Home' });                                                        // rechargement de la page pour re-analyser le localStorage  
                }
            })
            .catch((error) => {
                this.message = error.response.data.error;       // si la requête a échouée, on affiche le message d'erreur envoyé par le back
            })
        },


        connectedUser(){                // fonction de vérification de la session utilisateur (Item dans le localStorage)
            if(localStorage.groupomaniaUser == undefined){
                this.approuvedConnexion = false;
                console.log('Utilisateur non connecté !');   
            } 
            else{
                this.approuvedConnexion = true;
                console.log('Utilisateur connecté !');
                this.$router.push({ name:'Home' })
            }
        }
    }
}
</script>



<style  scoped>

.connexion {
    background: #ecf0f3;
    width: 350px;
    margin: auto;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.connexion > form{
    display:flex;
    flex-direction: column;
    margin: 30px auto 30px auto;
}

.connexion > form > input {
    width: 250px;
    height: 40px;
    border: none;
    margin-bottom: 30px;
}

.message-erreur{
    color:red;
}

h1{
    margin: 10px 0px;
}

</style>