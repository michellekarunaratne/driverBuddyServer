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


var fineSchema= new mongoose.Schema(
    {
        license:String,
        offense :String,
        amount: Number,
        officerId: String,
        timeStamp:{ type : Date, default: Date.now }

    }
);

module.exports= mongoose.model('Fine',fineSchema);