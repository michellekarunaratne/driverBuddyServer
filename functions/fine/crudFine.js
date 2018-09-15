const Fine=require('../../models/fine');

function enterFineDetails(dLicense,dOffense,dAmount,dOfficerId)
{
    var promise = new Promise(function(resolve,reject){

        var f1=new Fine({license:dLicense,offense:dOffense,amount:dAmount,officerId:dOfficerId})
        f1.save(function(error,doc){
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

module.exports.enterFineDetails=enterFineDetails;