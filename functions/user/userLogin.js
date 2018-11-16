const User=require("../../models/user");
const bcrypt = require('bcryptjs');
const Driver=require("../../models/driver");
const Police=require("../../models/police");
const Insurance=require("../../models/insurance");



function loginAccountType(userId)
{
    var promise=new Promise(function(resolve,reject){

        User.find({userId:userId},function(error,doc){
            if(error)
            {
                reject(error);
            }
            else
            {
                resolve(doc[0]);
            }
        });
    });

    return promise;
}

function loginUser(userId,password)
{
    var promise = new Promise((resolve,reject)=>{

        User.find({userId:userId})
        .then(function(users){

            if(users.length==0)
            {
                reject({status: 404, message: 'User Not Found !' });
            }
            else
            {
                return users[0];
            }

        })
        .then(function(user){

            const hashedPassword=user.hashedPassword;
            const type=user.type;
            const userId=user.userId;
            

            if(bcrypt.compareSync(password,hashedPassword))
            {
                if(type=="Driver")
                {
                    Driver.find({nic:userId},(error,doc)=>{
                        if(error)
                        {
                            reject(error);
                        }
                        else
                        {
                        resolve(doc[0]);
                        }
                    });
                }
               

                else if(type=="Police")
               {
                    Police.find({nic:userId},(error,doc)=>{
                        if(error)
                        {
                            reject(error);
                        }
                        else
                        {
                            resolve(doc[0]);
                        }
                    });
               }

                else
               {
                    Insurance.find({nic:userId},(error,doc)=>{
                        if(error)
                        {
                            reject(error);
                        }
                        else
                        {
                            resolve(doc[0]);
                        }
                     });
               }
            }

            
        })
        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });

    return promise;
}

module.exports.loginUser=loginUser;
module.exports.loginAccountType=loginAccountType;