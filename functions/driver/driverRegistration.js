
const Driver=require("../../models/driver");
const bcrypt = require('bcryptjs');

function registerDriver(dFirstName,dLastName,dEmail,dNic,dMobile,dPassword)
{
    var promise = new Promise((resolve,reject)=>{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(dPassword, salt);
        
        const newDriver= new Driver ({

            nic:dNic,
            firstName:dFirstName,
            lastName:dLastName,
            mobile:dMobile,
            email:dEmail,
            password:hash,
        });

        newDriver.save((error,doc)=>{
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

module.exports.registerDriver=registerDriver;