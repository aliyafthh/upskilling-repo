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

//middleware & static files(css/images)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //takes all url encoded data and pass the object in req
app.use(morgan('dev'));


app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{

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

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create a new Blog'});
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details',{title: 'Blog Details', blog: result});
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect: '/blogs'})
        })
        .catch((err)=>{
            console.log(err);
        });
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