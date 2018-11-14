const driver=require('../../functions/driver/crudDriver');
const Police=require('../../models/police');
const SpotFine=require('../../models/spotFine');
const FineTicket=require('../../models/fineTicket');


function enterFineDetails(dLicense,dOffense,dAmount,dOfficerId,dVehicleNumber)
{
    const Driver=driver.viewDriverDetails({nic:nic},function(error,doc){
        if(error)
        {
            reject(error);
        }
        else
        {
            resolve(doc[0]);
        }
    });

    var promise = new Promise(function(resolve,reject){

        var fineTicket=new FineTicket({
            vehicleNumber:dVehicleNumber,
            amount:dAmount,
            driver:$push


        });

    });

    return promise;
     
}

module.exports.enterFineDetails=enterFineDetails;