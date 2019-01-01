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


var userSchema= new Schema(
    {
        userId:{type:String,required: true,unique:true},
        type:String,
        hashedPassword:String
    }
);

module.exports= mongoose.model('Users',userSchema);
