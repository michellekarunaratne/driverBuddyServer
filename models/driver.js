const mongoose=require('mongoose');
const Schema =mongoose.Schema;

mongoose.connect('mongodb://localhost/driverbuddy',{ useNewUrlParser: true });

mongoose.connection.once('open',function()
{
    console.log('Connection has been made');
}).on('error',function(error)
{
    console.log('Connection error:',error);
});


var driverSchema= new mongoose.Schema(
    {
        nic:String,
        firstName:String,
        lastName:String,
        mobile: Number,
        email: String,
        password:String,
    }
);





//var Driver = mongoose.model('Driver',driverSchema);

/* var d1=new Driver({license:'957591051v',name:'Kamal',mobile:778796955,email:'msumalini@gmail.com'})
d1.save(function(error){

    if(error) return ("didnt work");
});

Driver.findOneAndUpdate({license:'957591051v'},{license:'123456789v',name:'Michelle'},{new:true},function(error,doc){
    if(error) console.log("opsie");
    console.log(doc);
}); */

/* function enterDriverDetails(dLicense,dName,dMobile,dEmail)
{
    var d1=new Driver({license:dLicense,name:dName,mobile:dMobile,email:dEmail})
    d1.save(function(error){
        if(error) return ("Didnt work")
    });
    
} */

module.exports= mongoose.model('Driver',driverSchema);