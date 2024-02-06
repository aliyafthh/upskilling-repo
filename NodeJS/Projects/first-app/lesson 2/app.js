const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

//Middleware
/** 
app.use((req,res,next)=>{
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next(); //telling the function that its done & to move to next function
});
*/

//if move this under .get, it will not execute as the response has already been sent
/** 
app.use((req,res,next)=>{
    console.log('in the next middleware');
    next(); //telling the function that its done & to move to next function
});
*/

//middleware & static files(css/images)
app.use(express.static('public'));

//morgan example
//https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

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
    res.status(404).render('404',{title: '404'});

});