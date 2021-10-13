const passwordSchema = require('../models/Password');        // importation du model Password

module.exports = (req, res, next) => {        
    if (!passwordSchema.validate(req.body.password)) {          // si le mot de passe ne valide pas le schema
        res.status(400).json({ error: "Choisissez un mot de passe de 6 caractères, 1 majuscule, 1 minuscule et 1 chiffre " });
    } else {
        next();
    }
};