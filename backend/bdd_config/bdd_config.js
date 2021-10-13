require('dotenv').config();
const mysql = require('mysql');


// Paramètres de connexion au serveur MySQL pour la création de la base de données
const mysqlConnexion = mysql.createConnection({
  host     : process.env.SQL_BDD_HOST,
  user     : process.env.SQL_BDD_USER,
  password : process.env.SQL_BDD_PASSWORD
});

// Paramètres de connexion au serveur MySQL pour la création des tables
const bdd = mysql.createConnection({
  host     : process.env.SQL_BDD_HOST,
  user     : process.env.SQL_BDD_USER,
  password : process.env.SQL_BDD_PASSWORD,
  database : process.env.SQL_BDD_NAME
});


// Base de données
const database = `CREATE DATABASE ${process.env.SQL_BDD_NAME};`

// Table des utilisateurs
const tableUsers = "CREATE TABLE `users` ( `id` int PRIMARY KEY AUTO_INCREMENT, `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), `nom` varchar(30) DEFAULT NULL, `prenom` varchar(30) DEFAULT NULL, `email` varchar(60) NOT NULL UNIQUE, `mot_de_passe` varchar(100) NOT NULL, `niveau_acces` int DEFAULT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;";

// Table des publications
const tablePublications = "CREATE TABLE `publications` ( `id` int AUTO_INCREMENT, `user_id` int NOT NULL, `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), `description` text NOT NULL, `image_url` text DEFAULT NULL, PRIMARY KEY (`id`,`user_id`), CONSTRAINT `fk_publication_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;"

// Table des commentaires
const tableCommentaires= "CREATE TABLE `commentaires` ( `id` int AUTO_INCREMENT, `user_id` int NOT NULL, `publication_id` int NOT NULL, `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), `message` text NOT NULL, PRIMARY KEY (`id`, `user_id`, `publication_id`), CONSTRAINT `fk_commentaire_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_commentaire_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;"

// Table des votes
const tableVotes = "CREATE TABLE `votes` ( `id` int AUTO_INCREMENT, `user_id` int NOT NULL, `publication_id` int NOT NULL, `vote` int DEFAULT NULL, PRIMARY KEY (`id`, `user_id`, `publication_id`), CONSTRAINT `fk_vote_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_vote_publication_id` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;"


// Création d'une fonction pour séquencer nos différentes création de table
const queryCustom = function (query) {
  return new Promise((resolve, reject) => {
    try {
      bdd.query(query, function (err, results, fields) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        resolve(true);
      });
    } catch (error) {
        reject(error);
    }
  });
};

// Création d'une fonction pour la crétion de notre base de données
const bddCreation = function () {
  return new Promise((resolve, reject) => {
    try {
      mysqlConnexion.connect(function (err) {         // Connexion au serveur MySQL
        if (err) throw err;
          console.log("Connexion à MySQL réussie.");
          
          mysqlConnexion.query(database, function (err, result) {     // Création de la base de données
            if (err) {
              return console.error('error: ' + err.message);
            }
            console.log(`Base de données "${process.env.SQL_BDD_NAME}"créée !`);
            resolve(true);
          });
    });
    } catch (err) {
      reject(err);
    }
  });
}

// Fonction qui initialise la configuration globale de la base de données
const launchDatabaseConfig = function() {                                   
  
  // Fonction asynchrone qui permet l'utilisation des "await" (Promise)
  const asyncFunction = async function() {                                  
    
    await bddCreation();                                                    // Création de la BDD
    
    bdd.connect( async function (err) {                                     // Connexion à la BDD
      if (err) {
        return console.error('error: ' + err.message);
      }
      try {
        await queryCustom(tableUsers);                                      // Table users
        console.log(`Table "users"créée.`);

        await queryCustom(tablePublications);                               // Table publications
        console.log(`Table "publications" créée.`);

        await queryCustom(tableCommentaires);                               // Table commentaires
        console.log(`Table "commentaires" créée.`);

        await queryCustom(tableVotes);                                      // Table votes
        console.log(`Table "votes"créée.`);

        process.exit();
                                                             
      } catch (err) {
        console.error('error: ' + err.message);
      }
    });
  };
  asyncFunction();      // Appel de la fonction asynchrone
};
launchDatabaseConfig();  // Appel de la fonction globale