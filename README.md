# GROUPOMANIA #


## PREVIEW ##
![Sans titre (1)](https://user-images.githubusercontent.com/79712595/138067561-096824e5-a2e9-4ae9-8c52-cf27c0cb8f91.png)


Bienvenue sur la première version de l'application Groupomania.
Cette application est un réseau social d'entreprise qui permet aux collaborateurs de : 
- créer un compte
- s'inscrire et se connecter manière sécurisée, se déconnecter
- poster des publications, images
- les liker et les commenter
- supprimer son compte et/ou supprimer ses publications et ses commentaires
- un compte modérateur pour gerer les comptenus non-appropriés



Pour lancer l'application vous devrez télécharger ce repository.

## BACKEND ##

1- Une fois le téléchargement terminé, vous devez personnaliser le fichier `backend/.env` en renseignant les informations de la base de données que vous souhaitez construire. 
_HOST =
_USER =
_PASSWORD =
_NAME =

Enregistrez les modifications.
(Vous pouvez également modifier le TOKEN ainsi que sa durée de validité, en veillant à le modifier également dans le fichier `frontend/env`)



2- Ouvrez le terminal dans le dossier backend et exécutez la commande : 
`npm install`

3- Une fois les dépendances installées vous pouvez créer la base de données, toujours depuis le dossier `backend` avec la commande : 
`node bdd_config/bdd_config.js`

4- Enfin, pour lancer le serveur backend : 
`nodemon server`


## FRONTEND ##

5- Rendez-vous dans le fichier `frontend` depuis le terminal pour installer les dépendances : 
`npm install`

6- Puis lancez l'application frontend (en Vue.JS) :
`npm run serve`

7- Rendez-vous dans votre navigateur à l'adresse: `http://localhost:8080/`



## Compte Modérateur ##
Pour donner les droits de modérateur à un utilisateur vous devez depuis le terminal MySQL effectuer la commande: 
`UPDATE users SET niveau_acces="1" WHERE id="1";` 
(Mettre l'id du compte que l'on souhaite passer Modérateur, une déconnection/reconnection est nécessaire si l'utilisateur est connecté)


### Production et configurations ###
- Compiles and minifies for production
npm run build
- Lints and fixes files
npm run lint
- Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
