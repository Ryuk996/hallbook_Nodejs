console.log("hell o")

const express= require('express')
require('dotenv').config()
const app = express();
const cors = require('cors')
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const url = process.env.MongoDb_url
const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: "*"
  }))

  app.use(express.json())
  console.log("hello")

app.get("/customers",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action
        let data =await db.collection("customer").find({userid : req.userid}).toArray()
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.get("/customers/:id",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and populate it
 
        let data =await db.collection("customer").findOne({_id : mongodb.ObjectId(req.params.id)});
        
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.get("/hall-details/:id",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and populate it
        let data =await db.collection("customer").findOne({_id : mongodb.ObjectId(req.params.id)});
        console.log(data._id)
        let data2 = await db.collection("hall").findOne({id:data._id})
        console.log(data2)
        //close the database
        client.close();

        res.json([data2])
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.post("/create-customer",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action
        req.body.userid=req.userid;
        let data =await db.collection("customer").insertOne(req.body)
        console.log(data)
        console.log(req.body)
        //close the database
        client.close();

        res.json({
            message : "task created"
        })

    }
    catch{
        console.log(error)
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.put("/update-customer/:id",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and update it
        let data =await db.collection("customer").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : req.body})
        //close the database
        client.close();

        res.json({
            message : "task updated"
        })

    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
    
})



app.delete("/delete-customer/:id", async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and delete it
        let data =await db.collection("customer").deleteOne({_id : mongodb.ObjectId(req.params.id)});
        //close the database
        client.close();

        res.json({
            message : "Task deleted"
        })
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }

})
//////////////////////////////////////////////////Halls/////////////////////////////////////

app.get("/halls",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action
        let data =await db.collection("hall").find({userid : req.userid},{"_id" : 1}).toArray()
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.get("/halls/:id",async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and populate it
        let data =await db.collection("hall").findOne({_id : mongodb.ObjectId(req.params.id)});
        // console.log(data)
        //close the database
        client.close();

        res.json(data)
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.post("/create-hall",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action
        req.body.userid=req.userid;
        let data =await db.collection("hall").insertOne(req.body)
        //close the database
        client.close();

        res.json({
            message : "task created"
        })

    }
    catch{
        console.log(error)
        res.status(500).json({
            message : "something went wrong"
        })
    }
})

app.put("/update-hall/:id",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and update it
        // let data1 =await db.collection("customer").findOne({_id : mongodb.ObjectId(req.params.id)},{"_id":1, "subject": 1});
        // let data =await db.collection("hall").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$push : {"customerName":(data1)}})
        let data =await db.collection("hall").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : req.body})
        // let data =await db.collection("hall").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : {customerId:mongodb.ObjectId(data1)}})
        //close the database
        client.close();

        res.json({
            message : "task updated"
        })

    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
    
})

app.put("/book-customer/:id",async function(req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and update it
        let data1 =await db.collection("customer").insertOne(req.body);
        console.log(req.body);
        
        let data =await db.collection("hall").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set : {customersName:(req.body.customerName),id:(req.body._id)}})
        
        client.close();

        res.json({
            message : "task updated"
        })

    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }
    
})

app.delete("/delete-hall/:id", async function (req,res){
    try{
        //connect the database
        let client= await mongoClient.connect(url);
        //select the database
        let db= client.db("hall_app")
        //select  the collection and perform action => find the particular ID and delete it
        let data =await db.collection("hall").deleteOne({_id : mongodb.ObjectId(req.params.id)});
        //close the database
        client.close();

        res.json({
            message : "Task deleted"
        })
    }
    catch{
        res.status(500).json({
            message : "something went wrong"
        })
    }

})

app.use('http://localhost:3000/login',(req,res,next) => {
    res.json({msg:"hello all"})
}) 
  app.listen(PORT,function(){
    console.log(`The app is listening in port ${PORT}`)
})