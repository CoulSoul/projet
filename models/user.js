let connection = require('../config/db')

class User {
    
    static create(prenom, nom, phone, email, code, cb){

        connection.query("INSERT  INTO user  SET prenom = ?, nom = ?, phone = ?, email = ?, code = ?", [prenom, nom, phone, email, code], function(err, result){

            if(err) throw err
            cb(result)
        })

    }

    

}

module.exports = User