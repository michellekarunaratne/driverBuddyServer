const Police=require('../../models/police');


function editPoliceDetails(nic,newDFirstName,newDLastName,newDMobile,newDEmail)
{
    var promise = new Promise(function(resolve,reject){
        Police.findOneAndUpdate({nic:nic},{firstName:newDFirstName,lastName:newDLastName,mobile:newDMobile,email:newDEmail},{new:true},function(error,doc){
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

function viewPoliceDetails(dNic)
{
    var promise=new Promise(function(resolve,reject){

        Police.find({nic:dNic},function(error,doc){
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

function deletePoliceDetails(dNic)
{
    var promise = new Promise(function(resolve,reject){
        Police.deleteOne({nic:dNic},function(error,doc){
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




module.exports.deletePoliceDetails=deletePoliceDetails;
module.exports.viewPoliceDetails=viewPoliceDetails;
module.exports.editPoliceDetails=editPoliceDetails;