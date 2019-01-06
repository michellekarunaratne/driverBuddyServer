
const Insurance=require("../../models/insurance");
const bcrypt = require('bcryptjs');

function registerInsurance(iNic,iFirstName,iLastName,iMobile,iEmail,iAgentId)
{
    var promise = new Promise((resolve,reject)=>{

        const newInsurance= new Insurance ({

            nic:iNic,
            firstName:iFirstName,
            lastName:iLastName,
            mobile:iMobile,
            email:iEmail,
            agentId:iAgentId
        });

        newInsurance.save((error,doc)=>{
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

module.exports.registerInsurance=registerInsurance;