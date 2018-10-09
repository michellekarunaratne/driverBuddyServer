const User=require("../../models/user");
const bcrypt = require('bcryptjs');

function registerUser(userId,type,password)
{
    var promise = new Promise((resolve,reject)=>{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        
        const newUser= new User ({

            userId:userId,
            type:type,
            hashedPassword:hash
        });

        newUser.save((error,doc)=>{
            if(error)
            {
                reject(error);
            }
            else
            {
                resolve(doc);
            }
        });

    });

    return promise;
}

module.exports.registerUser=registerUser;