//MONGODB PASSWORD : 327914@Kanika
//MONGODB CONNECTION : mongodb+srv://kanika:<password>@cluster0.bmeu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

const app = express();
mongoose.connect('mongodb+srv://kanika:327914@Kanika@cluster0.bmeu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
,{useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

//to resolve cors error add headers to response object
app.use((req,res,next)=>{
    //Any Request from any origin will be allowed and should prevent cors errors

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

});

//miidleware => parse the incoming request body 
app.use(bodyParser.json()); //covert body into usable json object 



//middleware to handle post request coming from frontened => SELLER FORM as we dont hve any DB
//BODY_PARSER => Allows us to parse the incoming requests and it will make body 
//available for us to handle
app.post('/api/stuff',(req,res,next)=>{

    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    //to save things to database;    
    //save() method returns a promise, so in our  then()  block, 
    //we send back a success response, and 
    //in catch() block, we send back an error response with the error thrown by Mongoose.
    thing.save().then(
        () => {
            res.status(201).json({
            message: 'Post saved successfully!'
        });
    }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//create midleware add string corresponding to end point
app.use('/api/stuff',(req,res,next)=>{
    //create array of stuff => delete array of stuff
    //to retrieve sata call thing model and find() method, 
    //in find() method we have options object which allow us to search things
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
        //sent back as JSON data
        res.status(200).json(stuff);
});

module.exports = app;
