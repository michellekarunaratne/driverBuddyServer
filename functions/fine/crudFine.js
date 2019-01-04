const Driver=require('../../models/driver');
const Police=require('../../models/police');
const SpotFine=require('../../models/spotFine');
const FineTicket=require('../../models/fineTicket');
const nodemailer = require('nodemailer');


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

function sendEmail(email)
{
    var promise=new Promise(function(resolve,reject){

            nodemailer.createTestAccount((err, account) => {
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user:"driverbuddyemail@gmail.com",
                        pass:"driverbuddy_1" 
                    }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"No Reply" <driverbuddyemail@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Payement Reciept', // Subject line
                    text: 'Your fine has been successfully paid,Thank you for using driver buddy', // plain text body
                    html: '<b>SUCCESSFUL</b><p>Your fine has been successfully paid,Thank you for using driver buddy</p>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        //return console.log(error);
                        reject(error);
                    }
                    else
                    {
                        resolve(info)
                    }
                    //console.log('Message sent: %s', info.messageId);
                    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
            });
        })
        return promise;
}

function getMonthlyTickets(nic)
{

    var date=new Date()
    var currentMonth=date.getMonth()
    var currentYear=date.getFullYear()
    var promise=new Promise(function(resolve,reject){
        FineTicket.find({"driver.nic":nic,month:currentMonth,year:currentYear},function(error,doc){
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

function getMonthlyIssuedTickets(policeId)
{
    var date=new Date()
    var currentMonth=date.getMonth()
    var currentYear=date.getFullYear()
    var promise=new Promise(function(resolve,reject){
        FineTicket.find({"police.policeId":policeId,month:currentMonth,year:currentYear},function(error,doc){
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




module.exports.enterFineDetails=enterFineDetails;
module.exports.findFineTicketDriver=findFineTicketDriver;
module.exports.findFineTicketPolice=findFineTicketPolice;
module.exports.sendEmail=sendEmail;
module.exports.getMonthlyTickets=getMonthlyTickets;
module.exports.getMonthlyIssuedTickets=getMonthlyIssuedTickets

