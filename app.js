var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// App Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Introducing my dog, Yppi!",
//     image: "https://images.unsplash.com/photo-1436658040953-a21ef6596481?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4cf2ea5d08cef2d24d85985bee63628f&auto=format&fit=crop&w=800&q=60",
//     body: "He's name is Yppi, and he is 14-year-old dog. He is shy little boy.",
    
// })

// RESTful Routes 
// 1. Index Routes
app.get("/", function(req, res){
    res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});
// 2. NEW ROUTE
app.get("/new", function(req, res){
    res.render("new");
});
// 3. CREATE ROUTE
app.post("/blogs", function(req, res){
   //create a blog
   
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           console.render("new");
       }else{
           res.redirect("/blogs");
       }
   })
});

// 4. SHOW ROUTE

app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.render("show", {blog : foundBlog});
       }
    });
    
})




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is started!");
});

