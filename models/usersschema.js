var mongoose    =   require("mongoose");
mongoose.connect('mongodb://threadsapp:threads123@ds049935.mlab.com:49935/threads');

var mongoSchema =   mongoose.Schema;
var userSchema  = {
    "usr_img" : String,
    "usr_email" : String,
    "usr_pwd" : String,
    "usr_fname" : String,
    "usr_lname" : String,
    "usr_dob" : String,
    "usr_created" : String,
    "usr_passion" : [],
    "usr_projs" : [
    {
    		
    		"proj_id" : String
    		
    }],
    "usr_school" : [{
            "sch_id" : String,
            "sch_type" : String,
            "sch_grad_date" : String
    
    }],
  
   
};
module.exports = mongoose.model('users',userSchema);;
