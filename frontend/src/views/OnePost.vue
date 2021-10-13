<template>
<div class="OnePost">
    <HeaderAuth/>
    <div class="contenu">
        <div class="post" v-if="publication !== 0" :key="publication.publicationId">
          <div class="delete">
            <i v-if="sessionUserId === publication.publicationCreateByUserId || sessionUserAcces === 1" v-on:click="deletePublication(publication.publicationId)" class="fas fa-times delete"></i>
          </div>
                 
          <div class="post__head">
              <i class="fas fa-user-circle fa-4x"></i>
              <div class="post__head__nomdate">
                  
                  <p class="post__head__nomdate__nom"><strong>{{publication.publicationCreateByUserPrenom}} {{publication.publicationCreateByUserNom}}</strong></p>
                  <p class="post__head__nomdate__date">Publié le {{dateFormat(publication.publicationCreationDate)}}</p>
              </div>
          </div>
          
          <p class="post__texte">{{publication.publicationDescription}}</p>
          <img  v-if="publication.publicationImageUrl !== '' " class="post__img" :src="publication.publicationImageUrl" :alt="publication.publicationId">
          
          
          
          <div class="post__count" >

            <div class="post__count__like">
              <i v-on:click="modifyLike()" class="fas fa-thumbs-up" :color="likeColor"></i> <p><strong>{{publication.publicationLikeCount}}</strong></p>
            </div>

            <div class="post__count__comment">
              <i class="fas fa-comment-alt"></i><p><strong>{{publication.publicationCommentCount}}</strong></p>
            </div>

          </div>

          <hr/>

          <div class="post__commentaires" v-for="commentaire in commentaires" :key="commentaire.commentaireId">
            <div class="delete">
            <i v-if="sessionUserId === commentaire.commentaireCreateByUserId || sessionUserAcces === 1" v-on:click="deleteComment(commentaire.commentaireId)" class="fas fa-times delete__croix"></i>
            </div>
            <div class="post__commentaires__head">
              
              <i class="fas fa-user-circle fa-3x"></i>
              <div class="post__commentaires__head__nomdate">
                  <p class="post__commentaires__head__nomdate__nom"><strong>{{commentaire.commentaireCreateByUserPrenom}} {{commentaire.commentaireCreateByUserNom}}</strong></p>
                  <p class="post__commentaires__head__nomdate__date">{{dateFormat(commentaire.commentaireCreationDate)}}</p>
              </div>
            </div>
            <p>{{commentaire.commentaireMessage}}</p>
            <hr/>
          </div>

          <form>
            <input id="imputcomment" type="text" placeholder="Ecrivez un commentaire" required>
            <button type="submit" @click="createComment()"><i class="fas fa-share"></i></button>
        </form>
        </div>
    </div>
</div>
</template> 

<script>
import {connectedClient} from "@/services/auth.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import HeaderAuth from '@/components/HeaderAuth.vue'


export default {
    name : 'OnePost',
    components: {
        HeaderAuth,
        
        
    },

    data() {
    return{
      approuvedConnexion: false,          // on déclare une varibale de type boléen, false par défault (contiendra la validation comme quoi un utilisateur est authentifié)
      sessionUserId: 0,
      sessionUserAcces: 0,
      publication: [],
      commentaires: [],
      likeColor: [],
      message: ""
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
      this.getOnePublication();
    }
  },

  methods: {
    modifyLike(){                                         // fonction qui gère la création ou la modification d'un LIKE sur une publication
      const userVote = this.publication.userVote;
      if(userVote === 2){
        const userId = this.sessionUserId;
        const publicationId = this.publication.publicationId;
        const vote = 1;
        const alreadyVote = true;
        
        connectedClient.post("/publications/vote", {
          userId,
          publicationId,
          vote,
          alreadyVote
        })
          .then(res => {
            console.log(res);
            this.publication.userVote = 1;
            this.publication.publicationLikeCount--;
            this.likeColor = 'black';
          })
      } else {
          if(userVote === null){
            const userId = this.sessionUserId;
            const publicationId = this.publication.publicationId;
            const vote = 2;
            const alreadyVote = false;
            
            connectedClient.post("/publications/vote", {
              userId,
              publicationId,
              vote,
              alreadyVote
            })
              .then(res => {
                console.log(res);
                this.publication.userVote = 2;
                this.publication.publicationLikeCount++;
                this.likeColor = 'green' ;
              })
          }
          
          if(userVote === 1 ){
            const userId = this.sessionUserId;
            const publicationId = this.publication.publicationId;
            const vote = 2;
            const alreadyVote = true;

            connectedClient.post("/publications/vote", {
              userId,
              publicationId,
              vote,
              alreadyVote
            })
              .then(res => {
                console.log(res);
                if(userVote === 1){
                  this.publication.userVote = 2;
                  this.publication.publicationLikeCount++;
                  this.likeColor = { color: 'green lighten-2' };
                }

              })
          }
        }
    },


    
    connectedUser(){                                    // fonction de vérification de la session utilisateur (Item dans le localStorage)
      if(localStorage.groupomaniaUser == undefined){
        this.approuvedConnexion = false;
        console.log('Utilisateur non connecté !');
        this.$router.push({ name:'Home' })
      } else {
        this.approuvedConnexion = true;
        console.log('Utilisateur connecté !');
      }
    },

    getOnePublication(){                                // fonction qui gère la récupération d'une publication avec l'id transmis
      const publicationId = this.$route.params.id;
      connectedClient.get(`/publications/${publicationId}`)
      .then(res => {
          if(res.data.publication[0] === undefined) {
            this.publication = 0;
          } else {
            this.publication = res.data.publication[0];
            if(this.publication.userVote === null || this.publication.userVote === 1) {
            this.likeColor = { color: 'red' };
            
            }
            if(this.publication.userVote === 2) {
            this.likeColor = { color: 'green' };
            
            }
            
          }
          this.commentaires = res.data.commentaires;
      })
    },
    dateFormat(date){                                                       // fonction qui transforme le format de la date reçu pour un meilleur affichage
      const event = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return event.toLocaleDateString('fr-FR', options);
    },

    createComment(){                                    // fonction qui gère la création d'un commentaire pour une publication
      const userId = this.sessionUserId;
      const publicationId = this.publication.publicationId;
      const message = document.getElementById("imputcomment").value;

      connectedClient.post("/publications/commentaire", {
        userId,
        publicationId,
        message
      })
      .then((res) => {
        if(res.status === 201) {
            location.reload();
        }
      })
      .catch((error) => {
            this.message = error.response.data.error;
      })
    },

    deletePublication(id){                              // fonction qui gère la suppression d'une publication en fonction du niveau d'acces et du userId
      const publicationId = id;
      connectedClient.delete(`/publications/${publicationId}`)
      .then((res) => {
        if(res.status === 200) {
            location.href = '/';
        }
      })
    },

    deleteComment(id){                                  // fonction qui gère la suppression d'un commentaire en fonction du niveau d'acces et du userId
      const commentaireId = id;
      connectedClient.delete(`/publications/commentaire/${commentaireId}`)
      .then((res) => {
        if(res.status === 200) {
            location.reload();
        }
      })
    },

  }
}
</script>


<style lang="scss" scoped>

.post {
    background: white;
    width: 260px;
    padding: 20px;
    margin-bottom: 30px ;
    margin-top: 30px;

    &__head{
        display: flex;
        margin-bottom: 40px ;
        &>i{
            margin-right: 10px;
            color:#0a2334;
        }
        &__nomdate{
            display: flex;
            flex-direction: column;
            justify-content: center;
            &__nom{
                margin: 0;
            }
            &__date{
                font-size: 0.8em;
                margin-bottom: 0;
            }
        }
    }
    &__img{width: 100%;}
    &>p{
        font-size: 1em;
        word-wrap: break-word;
    }

    &__count{
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__like{
          display: flex;
          justify-content: center;
          align-items: center;
          &>i{
            
            margin-right: 10px;
          }
        }
        &__comment{
          display: flex;
          justify-content: center;
          align-items: center;
          &>i{
            color:#0a2334;
            margin-right: 10px;
          }
        }
        
    }

    &>form{
        display: flex;
        &>input{
            flex:1;
        }
        &>button{
            background: #0a2334;
            color: white;
            border: none;

        }
    }

    &__commentaires{
      &__head{
        display: flex;
        margin-bottom: 10px ;
        &>i{
            margin-right: 10px;
            color:#0a2334;
        }
        &__nomdate{
            display: flex;
            flex-direction: column;
            justify-content: center;
            &__nom{
                margin: 0;
            }
            &__date{
                font-size: 0.8em;
                margin-bottom: 0;
            }
        }
      }
      &>p{
        word-wrap: break-word;
      }
    }

    .delete{
      text-align: right;
    }
}
</style>