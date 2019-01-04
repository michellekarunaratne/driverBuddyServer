const Accident=require('../../models/accident');
const Insurance=require('../../models/insurance');
const Driver=require('../../models/driver');

function enterAccidentDetail(nic,agentID,vehicleNo,place,description,insuranceNumber)
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

   function createReport(vehicleNo,place,description,insuranceNumber)
   {
    
    return new Promise(function(resolve,reject){
        const newReport=new Accident({
            vehicleNo:vehicleNo,
            place:place, 
            description:description,
            insuranceNumber:insuranceNumber,
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
       return createReport(vehicleNo,place,description,insuranceNumber)
   })




}

function viewAccidentReport(nic,agentId)
{
    
    
    var promise=new Promise(function(resolve,reject){

        Accident.find({$and:[{"driver.nic":nic},{"insurance.agentId":agentId}],},function(error,doc){
            if(error)
            {
                reject(error);
            }
            else
            {
                resolve(doc[0])
            }
        }).sort({timeStamp:-1}); 

    });

    return promise;
}


function getMonthlyIssuedReports(agentId)
{
    var date=new Date()
    var currentMonth=date.getMonth()
    var currentYear=date.getFullYear()
    var promise=new Promise(function(resolve,reject){
        Accident.find({"insurance.agentId":agentId,month:currentMonth,year:currentYear},function(error,doc){
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
    return promise 
}

module.exports.enterAccidentDetail=enterAccidentDetail;
module.exports.viewAccidentReport=viewAccidentReport;
module.exports.getMonthlyIssuedReports=getMonthlyIssuedReports;
