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
    //create a new instance of your  Thing  model, 
    //That model has a  save()  method which simply saves your Thing to the database.
    //to save things to database;    
    //save() method returns a promise, so in our  then()  block, 
    thing.save().then(
        () => {
            //we send back a success response, and succefull data creation 
            res.status(201).json({
            message: 'Post saved successfully!'
        });
    }
    ).catch(
        //in catch() block, we send back an error response with the error thrown by Mongoose.

        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//Retrieving a specific Thing
app.get('/api/stuff/:id', (req,res,next)=>{
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing)=>{
            res.status(200).json(thing);
        }
    ).catch(
        (error)=>{
            res.status(404).json({
                error:error
            });
        }
    );
});
//Now we can implement our GET route to return all of the Things in the database:
app.use('/api/stuff',(req,res,next)=>{
    //create array of stuff => delete array of stuff
    
    /***************
    find()  method on Mongoose model to return an array containing all of the  Things  in our database. 
    Now, if you add a new  Thing , it should appear immediately in your Stuff for Sale page.
    **************/
    
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
});

module.exports = app;
