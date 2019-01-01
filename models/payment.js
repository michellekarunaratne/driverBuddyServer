const mongoose=require('mongoose');
const Schema =mongoose.Schema;

//mongoose.connect('mongodb://localhost:27017/driverbuddy',{ useNewUrlParser: true });
mongoose.connect('mongodb+srv://driver-1:driver_1@driverbuddy-of8hf.mongodb.net/driverbuddy?retryWrites=true',{ useNewUrlParser: true });

mongoose.connection.once('open',function()
{
    console.log('Connection has been made');
}).on('error',function(error)
{
    console.log('Connection error:',error);
});

var FineTicket = require('mongoose').model('FineTicket').schema

var Payment=new mongoose.Schema(
    {
        fineTicket:[FineTicket],
        timeStamp:{ type : Date, default: Date.now }
    }
);

module.exports= mongoose.model('Payment',paymentSchema);