const Accident=require('../../models/accident');
const Insurance=require('../../models/insurance');
const Driver=require('../../models/driver');

function enterAccidentDetail(nic,agentID,vehicleNo,place,description)
{
   const $Vals={};
   
   

   function getDriver(nic)
   {
    
       return new Promise(function(resolve,reject){
   
           Driver.find({nic:nic},function(error,doc){
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

   function getInsurance(agentID)
   {
    
       return new Promise(function(resolve,reject){
   
           Insurance.find({agentId:agentID},function(error,doc){
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

   function createReport(vehicleNo,place,description)
   {
    
    return new Promise(function(resolve,reject){
        const newReport=new Accident({
            vehicleNo:vehicleNo,
            palce:place, 
            description:description,
            driver:$Vals.driver,
            insurance:$Vals.insurance,
        })

        newReport.save(function(error,doc){
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

  
   return getDriver(nic)
   .then(function(doc){
       $Vals.driver=doc;
       return getInsurance(agentID);
   })
   .then(function(doc){
       $Vals.insurance=doc;
       return createReport(vehicleNo,place,description)
   })




}

module.exports.enterAccidentDetail=enterAccidentDetail;