const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test1234@nodeexpressprojects.umrukhi.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI).then((result)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})

// register view engine
app.set('view engine', 'ejs');


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

/** 
//mongoose & mongo sandbox routes
//save data 
app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title: 'moo',
        snippet: 'about cows',
        body: 'a cow is an animal'
    });
    blog.save()
    .then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});

//retrieve data
app.get('/all-blogs', (req,res)=>{
    //return everything in the collection
    Blog.find() 
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/single-blog', (req,res)=>{
    //retrieve single item
    Blog.findById('65c37735c25122ceb61e9917') 
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});
*/

//path to listen to
app.get('/',(req,res)=>{
    // res.sendFile('./views/index.html',{ root: __dirname});
    // res.send('<p> home page </p>'); // dont need to set content type & status code
    
    //render a view
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index',{title: 'Home', blogs});
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    // res.send('<p> about page </p>');
    // res.sendFile('./views/about.html',{ root: __dirname});

    res.render('about',{title: 'About'});
});

//blog routes
app.get('/blogs',(req,res)=>{
    //sort by createdAt in descending order
    Blog.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('index',{title: 'All Blogs', blogs: result});
        })
        .catch((err)=>{
            console.log(err)
        });
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