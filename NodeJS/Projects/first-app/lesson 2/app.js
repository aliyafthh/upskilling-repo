const express = require('express');

//express app
const app = express();

// listen for requests
app.listen(3000);

//path to listen to
app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{ root: __dirname});
    // res.send('<p> home page </p>'); // dont need to set content type & status code
});

app.get('/about',(req,res)=>{
    // res.send('<p> about page </p>');
    res.sendFile('./views/about.html',{ root: __dirname});
});

//redirect
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

// 404 page
// will only run this if cant find on top
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{ root: __dirname});
});