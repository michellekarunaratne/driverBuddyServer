const Police=require("../../models/police");
const bcrypt = require('bcryptjs');

function registerPolice(pNic,pFirstName,pLastName,pMobile,pEmail,pPoliceId)
{
    var promise = new Promise((resolve,reject)=>{

        
        const newPolice= new Police ({

            nic:pNic,
            firstName:pFirstName,
            lastName:pLastName,
            mobile:pMobile,
            email:pEmail,
            policeId:pPoliceId
        });

        newPolice.save((error,doc)=>{
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

module.exports.registerPolice=registerPolice;