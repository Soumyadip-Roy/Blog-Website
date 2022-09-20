const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs')
//express app
const app = express();

// connect to MongoDB
// async fn 
// const dbURI = "mongodb+srv://royboylab:traO0suR2yLJRfWt@cluster0.xbilmtw.mongodb.net/?retryWrites=true&w=majority";
const dbURI = "mongodb+srv://royboylab:traO0suR2yLJRfWt@cluster0.xbilmtw.mongodb.net/BlogSite?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser: true , useUnifiedTopology:true})
.then((result) => {
  console.log('connected to server')
  app.listen(5000);
})
.catch(err=>console.log(err));

//REGISTER VIEW ENGINE 
app.set('view engine','ejs');
// app.set('views','filename');

//listen for request
// app.listen(5000);


//MIDDLEWARE

//broweser hangs when we run this middleware - it dosent automatically know how to move on to the next function 

// app.use((req,res,next)=>{
//   console.log('new request made');
//   console.log('host : ',req.hostname);
//   console.log('path : ',req.path);
//   console.log('method : ',req.method);
//   next();
// })

//TP MIDDLEWARE - to do the above thing 
app.use(morgan('dev'));

// app.use((req,res,next)=>{
//   console.log('in the next middleware');
//   next();
// })

//MIDDLEWARE & STATIC FILES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})); //take all the url encoding data that comes along and passes into an object that we can use as the req object
app.use(express.json());


//mongoose and mongodb sandbox routes
// app.get('/add-blog',(req,res)=>{
//   const blog = new Blog({ //creating a new instance
//     title:'new blog 2022',
//     snippet:'This is a new blog',
//     body:'this is more about my new blog'
//   });

//   blog.save() //async fn - returns promise
//   .then(result=>{
//     res.send(result);
//   })
//   .catch(err=>console.log(err));
// })

// app.get('/all-blogs',(req,res)=>{
//   Blog.find()
//   .then(result=>{
//     res.send(result);
//   })
//   .catch(err=>console.log(err));
// })

// app.get('/single-blog',(req,res)=>{
//   Blog.findById('6327144fdd8e6837635b3801')
//   .then(result=>{
//     res.send(result);
//   })
//   .catch(err=>console.log(err));
// })



//Express automatically infers status code and header content
//sending HTML

//routes
app.get("/", (req, res) => {
   
  // res.send('<p> Home Page </p>');
  // res.sendFile(__dirname + "/index.html");  ---------- using express 

  // const blogs = [
  //   {title:'Yoshi finds Sea',snippet:'Yosihs shhh what are there going to sleep in the sea '},
  //   {title:'Mario can See !',snippet:'Yosihs shhh what are there going to sleep in the sea '},
  //   {title:'Nasa vs Isro',snippet:'Yosihs shhh what are there going to sleep in the sea '},
  // ]

  // res.render('./index',{title:'Home',blogs});       //--------- using ejs - passing props to index.ejs
  
  res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  // res.send('<p> Home Page </p>');
  // res.sendFile(__dirname + "/about.html");
  res.render('about',{title:'About'});
});


app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//Blog routes//

app.get("/blogs",(req, res) => {
    Blog.find().sort({createdAt:-1})
    .then(result=>{
      res.render('index',{title:'Home',blogs:result}) //result is the array of blogs
    })
    .catch(err=>{
      console.log(err);
    })
});

app.post('/blogs',(req,res)=>{
  const blog = new Blog(req.body);
  blog.save()
  .then(result=>{
    res.redirect('/blogs');
  })
  .catch(err=>console.log(err));

})
app.get("/blogs/create",(req, res) => {
  res.render('create',{title:'Create Blog'});
});

app.get('/blogs/:id',(req,res)=>{
  const id = req.params.id; 
  console.log(id);

  Blog.findById(id)  //Blog model
    .then(result=>{
      // console.log(result);
      res.render('details',{title : 'Blog Details', blog : result});
    })
    .catch(err=>console.log(err));
})

app.delete('/blogs/:id',(req,res)=>{
  const id = req.params.id; 

  Blog.findByIdAndDelete(id)
  .then(result=>res.json({redirect:"/blogs"}))
  .catch(err=>console.log(err));

})


//404 - use fires whenever we dont get any valid url - this should be at the very bottom of the page

app.use((req, res) => {
  // res.sendFile(__dirname + "/404.html");
  res.render('404',{title:'404'});
});