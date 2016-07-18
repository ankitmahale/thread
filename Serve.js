var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var obj_users     =   require("./models/usersschema");
//var obj_project    =   require("./models/projectschema");
//var obj_school = require("./models/schoolSchema");
var router      =   express.Router();
var dt = new Date().toUTCString()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));



   
   
   router.route("/uniqueusername")
   .get(function(req,res){
       var response = {};
       obj_users.find({"usr_username": req.query.usr_username},{"usr_username":1},function(err,data){
       response = data;
       res.json(response);
       });
   })
   
   router.route("/uniqueemail")
   .get(function(req,res){
       var response = {};
       obj_users.find({"usr_email": req.query.usr_email},{"usr_email":1},function(err,data){
       response = data;
       res.json(response);
       });
   })


  router.route("/userdetails")
   .get(function(req,res){
       var response = {};
       obj_users.find({"_id" : req.query.usr_id},function(err,data){
           
               response = data;
          
           res.json(response);
       });
   })

    
     router.route("/register")
     .post(function(req,res){
        var db = new obj_users();    
        var response = {};
        db.usr_email = req.body.email;
        db.usr_pwd = req.body.password;
        db.usr_fname = req.body.fname;
        db.usr_lname = req.body.lname;
        db.usr_img = req.body.img;
        db.usr_username = req.body.username;
        db.usr_dob = req.body.dob;
        db.usr_created = new Date().toUTCString();
       	db.usr_passion = req.body.passion;
      
       	
        db.save(function(err,val){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            
            res.json(response);
        });
  
})    

      router.route("/updateuserdetails")
      .put(function(req,res){
        var response = {};
        obj_users.findById(req.params.usr_id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                
                data.usr_email = req.query.usr_email;
                data.usr_fname = req.query.usr_fname;
       		    data.usr_lname = req.query.usr_lname;
                data.usr_img = req.query.usr_img;
                data.usr_passion = req.body.usr_passion;
                
                
                
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false, "message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })

router.route("/deleteuser")
.delete(function(req,res){
        var response = {};
       
        obj_users.find({"_id": req.query.usr_id },function(err,data){
        if(err) {
                response = {"error" : true,"message" : "Error fetching data!"};
            }
         if(data==null) {
                response = {"error" : true,"message" : "Data not found!"};
            }   
        if(!err && data!=null)
        {
              response={response , "error" : false ,"message" : "Successfully deleted!"};
        }    
        res.json(response);
        
        }).remove().exec();
    })




















/*
	router.route("/addusrinsch")
     .post(function(req,res){
	var db1 = new obj_school();
      var response = {};
      console.log("in ogher",usr_id)
        db1.sch_usr =[{"usr_id" : usr_id}];
       db1.save(function(err){
       
        if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added in school"+ usr_id};
            }
            res.json(response);
  
});


}) 





   router.route("/login")
   .get(function(req,res){
       var response = {};
       obj_users.find({"email":req.query.email,"password":req.query.password},{fname:1,lname:1,projects:1,_id:1},function(err,data){
        response = data;
           res.json(response);
       });
   })

    
    
    router.route("/accessprojects")
   .get(function(req,res){
       var response = {};
       obj_users.find({ "_id": req.query.id}, {'projects.project_id':1,'projects.pro_name' : 1,'projects.pro_desc':1,'projects.pro_cover_img' : 1,'projects.pro_created':1},function(err,data){
           if(err) {
               response = {"error" : true,"message" : "Error fetching data"};
           } else {
               response = {data};
           }
           res.json(response);
       });
   })
    
    router.route("/adduserdinschool")
    .post(function(req,res){
         var db = new obj_school(); 
         var response ={};
         db.sch_name=req.body.sch_name;
         db.sch_state=req.body.sch_state;
         db.sch_country=req.body.sch_country;
         db.sch_city=req.body.sch_city;
         
         db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"+ req.body.sch_name};
            }
            res.json(response);
        });
         
         
         
         
    });
    
    
    
    
  
   router.route("/projects")
    .get(function(req,res){
        var response = {};
        obj_project.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
  
    
    
    .post(function(req,res){
        var db = new obj_project();
        var response = {};
        db.pname = req.body.pname;
        db.created = req.body.created;
        
        db.posts= null;
        db.description= req.body.description;
        db.rating= req.body.rating;
        db.category=req.body.category;
        
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"+req.body.team_members};
            }
            res.json(response);
        });
    });
    
   
    
    
    
    
    
    
    
    
    
    
    
    
    

router.route("/login")
    .get(function(req,res){
        var response = {};
        obj_users.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        obj_users.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.userEmail !== undefined) {
                    data.userEmail = req.body.userEmail;
                }
                if(req.body.userPassword !== undefined) {
                    data.userPassword = req.body.userPassword;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        obj_users.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                obj_users.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })
    
*/    

app.use('/',router);


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
console.log("Listening to PORT 3000");
