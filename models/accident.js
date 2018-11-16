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

var Driver=require('mongoose').model('Driver').schema
var Insurance=require('mongoose').model('Insurance').schema

var Accident=new mongoose.Schema(
    {
        vehicleNo:String,
        driver:[Driver],
        Insurance:[Insurance],
        place:String,
        timeStamp:{ type : Date, default: Date.now }
    }

);

module.exports= mongoose.model('Accident',accidentSchema);