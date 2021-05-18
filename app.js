//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')

const homeStartingContent = "Welcome to the daily journal home page! Log your life today and Tomorrow is another day! ";
const aboutContent = "Hi, my name is Hanwen Zhang, a programmer.";
const contactContent = "Welcome to connect me via linkedIn or email me.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get('/', function(req, res){
  res.render('home', {              //pass a variable, javascript object, key value pair in {}
    StartingContent: homeStartingContent,   //the key must be the same as home.ejs in the <%= %>
    posts: posts    //the key posts from home.ejs, value posts from the js array above that comes from the app.post /compose route
  });   
});

app.get('/about', function(req, res){
  res.render('about', {AboutContent: aboutContent}); 
});

app.get('/contact', function(req, res){
  res.render('contact', {ContactContent: contactContent}); 
});

app.get('/compose', function(req, res){
  res.render('compose'); 
});

app.post('/compose', function(req, res){
  const post = {                // a js object(key, value pair)
    title: req.body.postTitle,
    content: req.body.postBody    // req.body.{name of the input/textarea} 
  };
  posts.push(post);   //push to the posts array
  res.redirect('/');
});

app.get('/posts/:postName', function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);    //npm lodash, convert to lower case
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle){
      res.render('post', {
        title: post.title,
        content: post.content
      });
    };
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
