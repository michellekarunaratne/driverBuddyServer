const Driver=require('../../models/driver');



/* function enterDriverDetails(dLicense,dName,dMobile,dEmail)
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
     
} */

function editDriverDetails(nic,newDFirstName,newDLastName,newDMobile,newDEmail)
{
    var promise = new Promise(function(resolve,reject){
        Driver.findOneAndUpdate({nic:nic},{firstName:newDFirstName,lastName:newDLastName,mobile:newDMobile,email:newDEmail},{new:true},function(error,doc){
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

function viewDriverDetails(dNic)
{
    var promise=new Promise(function(resolve,reject){

        Driver.find({nic:dNic},function(error,doc){
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

function deleteDriverDetails(dNic)
{
    var promise = new Promise(function(resolve,reject){
        Driver.deleteOne({nic:dNic},function(error,doc){
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

function findDriver(license)
{
    var promise=new Promise(function(resolve,reject){
        Driver.find({license:license},function(error,doc){
            if(error)
            {
                reject(error);
            }
            else
            {
                resolve(doc[0])
            }
        });
    });

    return promise;
}




module.exports.deleteDriverDetails=deleteDriverDetails;
module.exports.viewDriverDetails=viewDriverDetails;
module.exports.editDriverDetails=editDriverDetails;
module.exports.findDriver=findDriver;
//module.exports.enterDriverDetails=enterDriverDetails;