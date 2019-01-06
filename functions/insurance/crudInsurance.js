const Insurance=require('../../models/insurance');

function editInsuranceDetails(nic,newDFirstName,newDLastName,newDMobile,newDEmail)
{
    var promise = new Promise(function(resolve,reject){
        Insurance.findOneAndUpdate({nic:nic},{firstName:newDFirstName,lastName:newDLastName,mobile:newDMobile,email:newDEmail},{new:true},function(error,doc){
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

function viewInsuranceDetails(dNic)
{
    var promise=new Promise(function(resolve,reject){

        Insurance.find({nic:dNic},function(error,doc){
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

function deleteInsuranceDetails(dNic)
{
    var promise = new Promise(function(resolve,reject){
        Insurance.deleteOne({nic:dNic},function(error,doc){
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




module.exports.deleteInsuranceDetails=deleteInsuranceDetails;
module.exports.viewInsuranceDetails=viewInsuranceDetails;
module.exports.editInsuranceDetails=editInsuranceDetails;
