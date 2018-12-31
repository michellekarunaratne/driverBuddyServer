const Driver=require('../../models/driver');
const Police=require('../../models/police');
const SpotFine=require('../../models/spotFine');
const FineTicket=require('../../models/fineTicket');


const details={}

function enterFineDetails(dNic,policeId,fineName,amount,vehicleNumber)
{    

   const $Vals={};

   function getDriver(dNic)
   {
       return new Promise(function(resolve,reject){
   
           Driver.find({nic:dNic},function(error,doc){
               if(error)
               {
                   reject(error)
               }
               else
               {
                   resolve(doc[0]);
               }
           })
       })
   }

   function getPolice(policeId)
   {
       return new Promise(function(resolve,reject){

            Police.find({policeId:policeId},function(error,doc){
                if(error)
                {
                    reject(error)
                }
                else
                {
                    resolve(doc[0]);
                }
            })
        })
    }

    function getFine(fineName)
    {
        return new Promise(function(resolve,reject){

            SpotFine.find({name:fineName},function(error,doc){
                if(error)
                {
                    reject(error)
                }
                else
                {
                    resolve(doc[0]);
                }
            })
        })
    }

    function createFineTicket(amount,vehicleNumber)
    {
        return new Promise(function(resolve,reject){
            const newfineTicket=new FineTicket({
                vehicleNumber:vehicleNumber,
                amount:amount, 
                fine:$Vals.fine,
                driver:$Vals.driver,
                police:$Vals.police,
            })

            newfineTicket.save(function(error,doc){
                if(error)
                {
                    reject(error)
                }
                else
                {
                    resolve(doc)
                }
            })
        })
    }


    return getDriver(dNic)
    .then(function(doc){
        $Vals.driver=doc;
        return getPolice(policeId);
    })
    .then(function(doc){
        $Vals.police=doc;
        return getFine(fineName);
    })
    .then(function(doc){
        $Vals.fine=doc;
        return createFineTicket(amount,vehicleNumber)
    })
    
    

}

function getRecentTicketAndUpdate(policeId,nic,amount,vehicleNumber,fineName)
{
    var ObjectID = require('mongodb').ObjectID

    FineTicket.findOneAndUpdate({policeId:policeId,_id:{$gt:ObjectID.createFromTime(Date.now()/1000-15*60)}}, )   
}

function findFineTicketDriver(nic)
{
    var promise=new Promise(function(resolve,reject){

        FineTicket.find({"driver.nic":nic},function(error,doc){
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

function findFineTicketPolice(policeId)
{
    var promise = new Promise(function(resolve,reject){
        FineTicket.find({"police.policeId":policeId},function(error,doc){
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
module.exports.findFineTicketDriver=findFineTicketDriver;
module.exports.findFineTicketPolice=findFineTicketPolice;
