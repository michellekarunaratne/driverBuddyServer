const mongoose=require('mongoose');
const Schema =mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/driverbuddy',{ useNewUrlParser: true });

mongoose.connection.once('open',function()
{
    console.log('Connection has been made');
}).on('error',function(error)
{
    console.log('Connection error:',error);
});


var driverSchema= new Schema(
    {
        nic:String,
        firstName:String,
        lastName:String,
        mobile: Number,
        email: String,
        license:Number
    }
);





/* var Driver = mongoose.model('Driver',driverSchema);

var d1=new Driver({nic:"957591051v",firstName:'Kamal',lastName:"perera",mobile:778796955,email:'msumalini@gmail.com',password:"abc",license:957591051})
d1.save(function(error){

    if(error) return ("didnt work");
}); */

/* Driver.findOneAndUpdate({license:'957591051v'},{license:'123456789v',name:'Michelle'},{new:true},function(error,doc){
    if(error) console.log("opsie");
    console.log(doc);
}); */

/*  function enterDriverDetails(dLicense,dName,dMobile,dEmail,)
{
    var d1=new Driver({license:dLicense,name:dName,mobile:dMobile,email:dEmail})
    d1.save(function(error){
        if(error) return ("Didnt work")
    });
    
} */

module.exports= mongoose.model('Driver',driverSchema);