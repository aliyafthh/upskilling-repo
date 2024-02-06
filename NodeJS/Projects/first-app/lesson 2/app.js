const express = require('express');

//express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

//path to listen to
app.get('/',(req,res)=>{
    // res.sendFile('./views/index.html',{ root: __dirname});
    // res.send('<p> home page </p>'); // dont need to set content type & status code
    
    //render a view
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index',{title: 'Home', blogs});
});

app.get('/about',(req,res)=>{
    // res.send('<p> about page </p>');
    // res.sendFile('./views/about.html',{ root: __dirname});

    res.render('about',{title: 'About'});
});

app.get('/blogs/create',(req,res)=>{
    // res.send('<p> about page </p>');
    // res.sendFile('./views/about.html',{ root: __dirname});

    res.render('create',{title: 'Create a new Blog'});
});

//redirect
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

// 404 page
// will only run this if cant find on top
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{ root: __dirname});
    res.render('404',{title: '404'});

});