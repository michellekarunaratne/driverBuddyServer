
const Driver=require("../../models/driver");
const bcrypt = require('bcryptjs');

function registerDriver(dNic,dFirstName,dLastName,dMobile,dEmail,dLicense)
{
    var promise = new Promise((resolve,reject)=>{
        
        const newDriver= new Driver ({

            nic:dNic,
            firstName:dFirstName,
            lastName:dLastName,
            mobile:dMobile,
            email:dEmail,
            license:dLicense
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