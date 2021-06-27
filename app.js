//MONGODB PASSWORD : 327914@Kanika
//MONGODB CONNECTION : mongodb+srv://kanika:<password>@cluster0.bmeu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
    console.log(req.body);
    res.status(201).json({
        message: 'Thing created sucessfully !!'
    })
})
//create midleware add string corresponding to end point
app.use('/api/stuff',(req,res,next)=>{
    //create array of stuff
    const stuff=[
        {
            _id: 'randomstring',
            title: 'My First Thing',
            description: 'All of the info about my first thing',
            imageUrl: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
            price: 4900,
            userId: 'string',
        },
        {
            _id: 'randomstring1',
            title: 'My Second Thing',
            description: 'All of the info about my second thing',
            imageUrl: 'https://images.unsplash.com/photo-1528553744039-c1dcef33574f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGd1aXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            price: 5900,
            userId: 'stringOne',
        },
        {
            _id: 'randomstring',
            title: 'My Third Thing',
            description: 'All of the info about my third thing',
            imageUrl: 'data:image/jpeg;base64,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',
            price: 8200,
            userId: 'string',
        }
    ];
    //sent back as JSON data
    res.status(200).json(stuff);
});

module.exports = app;
