const Driver=require('../../models/driver');



function enterDriverDetails(dLicense,dName,dMobile,dEmail)
{
    var promise = new Promise(function(resolve,reject){

        var d1=new Driver({license:dLicense,name:dName,mobile:dMobile,email:dEmail})
        d1.save(function(error,doc){
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

function editDriverDetails(oldDLicense,newDLicense,newDName,newDMobile,newDEmail)
{
    var promise = new Promise(function(resolve,reject){

        Driver.findOneAndUpdate({license:oldDLicense},{license:newDLicense,name:newDName,mobile:newDMobile,email:newDEmail},{new:true},function(error,doc){
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

function viewDriverDetails(dLicense)
{
    var promise=new Promise(function(resolve,reject){

        Driver.find({license:dLicense},function(error,doc){
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

function deleteDriverDetails(dLicense)
{
    var promise = new Promise(function(resolve,reject){
        Driver.deleteOne({license:dLicense},function(error,doc){
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




module.exports.deleteDriverDetails=deleteDriverDetails;
module.exports.viewDriverDetails=viewDriverDetails;
module.exports.editDriverDetails=editDriverDetails;
module.exports.enterDriverDetails=enterDriverDetails;