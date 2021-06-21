const express = require('express');

const app = express();

//**********************Add other piece of middleware****************************
//the first logs "Request received" to the console, and hands on execution
app.use((req,res,next)=> {
    console.log('Request recieved !!');
    next();
});

//**********************Add other piece of middleware****************************
//**********************Add http status code ****************************
//the second adds a 201 status code to the response, and hands on execution

app.use('/', (req, res,next)=>{
    res.status(201);
    next();
});

//the third sends the JSON response, and hands on execution
app.use('/', (req, res, next)=>{
    res.json({message: 'Your request was sucessful'});
    next();
})

//**********************Add other piece of middleware****************************
//the final piece of middleware logs "Response sent successfully" to the console
app.use((req,res,next)=>{
    console.log('Reponse sent Successfully !!')
});

module.exports = app;
