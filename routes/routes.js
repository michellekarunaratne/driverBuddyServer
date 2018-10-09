
const userLogin = require('../functions/user/userLogin');
var bodyParser = require('body-parser');
var express = require('express')


var jsonencodedParser = bodyParser.json({ extended: false });

module.exports = router => {

    router.post('/userLogin',jsonencodedParser,(req,res)=>{

        userLogin.loginUser(req.body.userId,req.body.password)
        .then(function(doc){
          res.send(doc);
        })
        .catch(function(error){
          res.send(error);
        })

    });

}