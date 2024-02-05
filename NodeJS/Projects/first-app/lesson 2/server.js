const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//create server
const server = http.createServer((req,res)=>{
    
    // lodash
    const num  = _.random(0,20);
    console.log(num);

    //only allow function to be called once
    const greet = _.once(()=>{
        console.log('hello');
    });

    greet();
    greet();

    // set header content type
    // res.setHeader('Content-Type', 'text/plain'); //can be JSON/ or anything
    // res.write('hello, ninjas');
    // res.end();

    // res.setHeader('Content-Type','text/html');
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<h1>hello, sleepy heads</h1>');
    // res.end();

    //sending an html file
    res.setHeader('Content-Type','text/html');

    // fs.readFile('./views/index.html',(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         res.end();
    //     }else{
    //         // res.write(data); //use if sending multiple things
    //         res.end(data); //if return one item only
    //     }
    // });

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about'); //redirect user
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            // res.write(data); //use if sending multiple things
            res.end(data); //if return one item only
        }
    });

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000');
});