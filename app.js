var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const driver=require('./functions/driver/crudDriver');
const insurance=require('./functions/insurance/crudInsurance');
const police=require('./functions/police/crudPolice');
const fineTicket=require('./functions/fine/crudFine');
const driverRegistration=require('./functions/driver/driverRegistration');
const policeOfficerRegistration=require("./functions/police/policeRegistration");
const insuranceAgentRegistration=require("./functions/insurance/insuranceRegistration");
const userRegistration=require("./functions/user/userRegistration");
const userLogin=require("./functions/user/userLogin");
const router 	   = express.Router();
/* var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
 */
var app = express();
var jsonencodedParser = bodyParser.json({ extended: false });

/* // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */


//app.get('/',jsonencodedParser,(req,res)=> res.send('Hello World'));
app.listen(3000,()=>console.log("Listening on port 3000"));



/* app.post('/',jsonencodedParser,(req,res)=>{

  driver.enterDriverDetails(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email,req.body.password,req.body.license)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
}); */

app.post('/driverRegister',jsonencodedParser,(req,res)=>{

  driverRegistration.registerDriver(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email,req.body.license)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/policeRegister',jsonencodedParser,(req,res)=>{

  policeOfficerRegistration.registerPolice(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email,req.body.policeId)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/insuranceRegister',jsonencodedParser,(req,res)=>{

  insuranceAgentRegistration.registerInsurance(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email,req.body.agentId)

  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});


app.post('/driverEdit',jsonencodedParser,(req,res)=>{

  driver.editDriverDetails(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/driverView',jsonencodedParser,(req,res)=>{

  driver.viewDriverDetails(req.body.nic)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/driverDelete',jsonencodedParser,(req,res)=>{

  driver.deleteDriverDetails(req.body.nic)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});


app.post('/insuranceEdit',jsonencodedParser,(req,res)=>{

  insurance.editInsuranceDetails(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/insuranceView',jsonencodedParser,(req,res)=>{

  insurance.viewInsuranceDetails(req.body.nic)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/insuranceDelete',jsonencodedParser,(req,res)=>{

  insurance.deleteInsuranceDetails(req.body.nic)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});


app.post('/policeEdit',jsonencodedParser,(req,res)=>{

  police.editPoliceDetails(req.body.nic,req.body.firstName,req.body.lastName,req.body.mobile,req.body.email)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/policeView',jsonencodedParser,(req,res)=>{

  police.viewPoliceDetails(req.body.nic)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

app.post('/policeDelete',jsonencodedParser,(req,res)=>{

  police.deletePoliceDetails(req.body.nic)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});
/*  app.post('/',jsonencodedParser,(req,res)=>{

 fine.enterFineDetails(req.body.license,req.body.offense,req.body.amount,req.body.officerId)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
  //res.send(req.body.date);
}); */

app.post('/userRegister',jsonencodedParser,(req,res)=>{

  userRegistration.registerUser(req.body.userId,req.body.type,req.body.password)
  .then(function(doc){
    res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })

});

app.post('/userLogin',jsonencodedParser,(req,res)=>{

  userLogin.loginUser(req.body.userId,req.body.password)
  .then(function(doc){
    res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })

});

app.post('/userAccountType',jsonencodedParser,(req,res)=>{

  userLogin.loginAccountType(req.body.userId)
  .then(function(doc){
    res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
});

module.exports = app;
