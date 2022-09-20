const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{
    console.log('request made');
    // console.log(req);

    // console.log(req.url);
    // console.log(req.method);

    //LODASH 
    const num = _.random(0,20);
    console.log(num);

    const greet = _.once(()=>{
        console.log('Hello');
    })
    greet();
    greet();

    //Set header content type
    res.setHeader('Content-Type','text/html');

    
    // res.write('<p>lol</p>');
    // res.write('<p>paragraph 2 </p>');

    let path = './';
    switch(req.url){
        case '/' :
            path+='index.html'
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html'
            res.statusCode=200;
            break;

        //Redirecting
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','./about');
            break;
        //404
        default:
             path+='404.html'
             res.statusCode=404;
             break;
    }

    //SEND AN HTML FILE
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        res.end();

        }
        // res.write(data);
        res.end(data); //we can directly pass this to end method as well
    })
    // res.end();
});

server.listen(3000,'localhost',()=>{
    console.log('listining for request on port 3000');
})


