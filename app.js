var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const driver=require('./functions/driver/crudDriver');
const fine=require('./functions/fine/crudFine');
const driverRegistration=require('./functions/driver/driverRegistration');

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


app.get('/',(req,res)=> res.send('Hello World'));
app.listen(3000,()=>console.log("Listening on port 3000"));



/*  app.post('/',jsonencodedParser,(req,res)=>{

  driver.enterDriverDetails(req.body.license,req.body.name,req.body.mobile,req.body.email)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
}); */

app.post('/',jsonencodedParser,(req,res)=>{

  driverRegistration.registerDriver(req.body.firstName,req.body.lastName,req.body.email,req.body.nic,req.body.mobile,req.body.password)
  .then(function(doc){
    res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })

});


/* app.post('/',jsonencodedParser,(req,res)=>{

  driver.editDriverDetails(req.body.oldLicense,req.body.newLicense,req.body.name,req.body.mobile,req.body.email)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
}); */

/* app.post('/',jsonencodedParser,(req,res)=>{

  driver.viewDriverDetails(req.body.license)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
}); */

/*  app.post('/',jsonencodedParser,(req,res)=>{

  driver.deleteDriverDetails(req.body.license)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
}); */

 app.post('/',jsonencodedParser,(req,res)=>{

 fine.enterFineDetails(req.body.license,req.body.offense,req.body.amount,req.body.officerId)
  .then(function(doc){
     res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
  //res.send(req.body.date);
});



module.exports = app;
