const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser"); 
var mongoose = require("mongoose"); 
mongoose.connect('mongodb://localhost/Crud',{useNewUrlParser:true});
const port = 8080;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// Define mongoose schema
var employeSchema = new mongoose.Schema({
    employeName : String,
    departmentName : String,
    salary : String,
    
});
var employeModal = mongoose.model('employes',employeSchema);


// ENDPOINTS



app.post('/employeAdd',(req,res)=>{
    var myData = new employeModal(req.body);
    // console.log("sss",req.body)
    myData.save().then(()=>{
        res.send("This items has been add to your database")
    }).catch(()=>{
        res.status(200).send("Oooops! item was not saved to the database")
    });

});

app.get('/getEmploye',(req,res)=>{
    employeModal.find({}).then((data)=>{
        // console.log("dtaaa",data)
        res.status(200).send(data)
    }).catch((err)=>{
        console.log("eer",err)
    })
})
app.get('/getEmployeById',(req,res)=>{
    employeModal.findOne({_id:req.query.id}).then((data)=>{
        // console.log("ussss",data)
        res.status(200).send(data)
    }).catch((err)=>{
        console.log("eer",err)
    })
   
})

app.put('/updateEmploye',(req,res)=>{
    // console.log("upidd",req.query.id)
    // console.log("updBdy",req.body)
    employeModal.findOneAndUpdate({_id:req.query.id},req.body).then((data)=>{
        // console.log("getDtaa",data)
        res.send("update")
    }).catch((err)=>{
        res.send(err)
    })
    // res.send("uppdd")
})

app.delete('/deleteEmploye',(req,res)=>{
    // console.log("redDell",req.params.id)
    // console.log("idddd",req.query.id)
    employeModal.findOneAndDelete({_id:req.query.id}).then((data)=>{
        res.send("delete")
    }).catch((err)=>{
        res.send(err)
    })
    // res.send("delll")
})


app.get('/dpartmentFilter',(req,res)=>{
    console.log('departmewnmt',req.query.department)
    employeModal.find({departmentName:req.query.department}).then((data)=>{
        // console.log('deprt',data)
        res.send(data)
    }).catch((err)=>{
        console.log("deprrrERRRR",err)
    })
    // res.send("find")
})

app.get('/salaryFilter',(req,res)=>{
    // console.log("slary",req.query.salary)
    if(req.query.salary=="Highest"){

        employeModal.find().sort({salary:-1}).then((data)=>{
            // console.log("salryyy1111",data)
            res.send(data)
        }).catch((err)=>{
            console.log("sl;ryErrrr",err)
        })
    }else if(req.query.salary=="Lowest"){
        employeModal.find().sort({salary:+1}).then((data)=>{
            // console.log("salryyy222",data)
            res.send(data)
        }).catch((err)=>{
            console.log("slryErrrr",err)
        })
    }
    // res.send("slsy")
})

app.listen(port, ()=>{
    console.log(`The application started succesfully on port ${port}`);
})