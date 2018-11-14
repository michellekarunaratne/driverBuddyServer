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


var spotFineSchema= new Schema(
    {
        fine_id:String,
        name:String,
        amount:String,  
        description:String
    }
);

module.exports= mongoose.model('SpotFine',spotFineSchema);