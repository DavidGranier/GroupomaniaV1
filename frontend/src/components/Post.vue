<template>
<div >
    <div v-if="publications.length === 0">
        <div class="aucunpost">Commencez par publier quelque chose ! </div>
    </div>

    <div class="post" v-for="publication in publications" :key="publication.publicationId">
        <router-link class="router-link" :to="{ name : 'OnePost', params: { id: publication.publicationId }}">
        <div class="post__head">
            <i class="fas fa-user-circle fa-4x"></i>
            <div class="post__head__nomdate">
                <p class="post__head__nomdate__nom"><strong>{{publication.publicationCreateByUserPrenom}} {{publication.publicationCreateByUserNom}}</strong></p>
                <p class="post__head__nomdate__date">Publié le {{dateFormat(publication.publicationCreationDate)}}</p>
            </div>
        </div>
        
        <p class="post__texte">{{publication.publicationDescription}}</p>
        <img  v-if="publication.publicationImageUrl !== '' " class="post__img" :src="publication.publicationImageUrl" :alt="publication.publicationId">
        
        
        
            <div class="post__count">

            <div class="post__count__like">
              <i class="fas fa-thumbs-up"></i> <p><strong>{{publication.publicationLikeCount}}</strong></p>
            </div>

            <div class="post__count__comment">
              <i class="fas fa-comment-alt"></i><p><strong>{{publication.publicationCommentCount}}</strong></p>
            </div>

          </div>
    </router-link>      
    </div>
</div>
</template>

<script>
import {connectedClient} from "@/services/auth.js"      // importation de la configuration de requête pour un client connecté

export default {
    name: 'Publications',

    data(){
        return {
            publications: [],                           // on déclare une varibale de type tableau, vide par défault (contiendra les 10 publications)
            
        }
    },

    mounted() {                                         // hook de cycle de vie qui intervient après le hook created de vérification de session
        this.getAllPublications();                      // fonction qui récupère les publications
        
    },

    methods: {
        getAllPublications(){
            connectedClient.get(`/publications`)
            .then(res => {
                this.publications = res.data[0];                            // récupération des publications
            })
        },

        dateFormat(date){                                                       // fonction qui transforme le format de la date reçu pour un meilleur affichage
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        }
    }
}
</script>


<style lang="scss" scoped>

.aucunpost{
    height: 250px;
    margin-top: 50px;
}

.post {
    background: white;
    width: 260px;
    padding: 20px;
    margin-bottom: 30px;

    &__head{
        display: flex;
        margin-bottom: 40px;
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
        font-size: 1.5em;
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
            color:#0a2334;
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
}

a{
    text-decoration: none;
    color: black;
}

input {
    width: 250px;
    height: 40px;
    border: none;
}



</style>