const express = require('express');

const app = express();

//create midleware add string corresponding to end point
app.use('/api/stuff',(req,res,next)=>{
    //create array of stuff
    const stuff=[
        {
            _id: 'randomstring',
            title: 'My First Thing',
            description: 'All of the info about my first thing',
            imageUrl: '',
            price: 4900,
            userId: 'string',
        },
        {
            _id: 'randomstring1',
            title: 'My Second Thing',
            description: 'All of the info about my second thing',
            imageUrl: '',
            price: 5900,
            userId: 'stringOne',
        },
        {
            _id: 'randomstring',
            title: 'My Third Thing',
            description: 'All of the info about my third thing',
            imageUrl: '',
            price: 8200,
            userId: 'string',
        }
    ];
    //sent back as JSON data
    res.status(200).json(stuff);
});

module.exports = app;
