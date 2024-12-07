import express from "express";
import bodyParser from "body-parser";
import { addPosts, deletePosts } from './utils/utils.js';

const app = express();
const port = 3000;
export var titles = [];
export var texts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));



app.get("/",(req,res) =>{
   res.render("index.ejs");
});

app.get("/create",(req,res) =>{
    res.render("create.ejs");
});

app.get("/posts",(req,res) =>{
    res.render("posts.ejs",{titles : titles, texts : texts});
});

app.post("/posts",(req,res) =>{
    var title = req.body["title"];
    var text = req.body["text"];

    addPosts(title,text);

    res.render("posts.ejs",{titles : titles, texts : texts});
});

app.get("/posts/readmore/:blogID",(req,res) =>{
    var index = req.params.blogID;

    res.render("readmore.ejs",{title : titles[index], text : texts[index]});
});

app.get("/posts/edit/:blogID",(req,res) =>{
    var index = req.params.blogID;

    res.render('edit.ejs',{
        title: titles[index],
        text: texts[index],
        index: index,
    });
});

app.post("/posts/edit/:blogID",(req,res) =>{
    var index = req.params.blogID;

    deletePosts(index);

    var title = req.body["title"];
    var text = req.body["text"];

    addPosts(title,text);

    res.render("posts.ejs",{titles : titles, texts : texts});
});

app.get("/posts/delete/:blogID",(req,res) =>{
    var index = req.params.blogID;

    deletePosts(index);

    res.render("posts.ejs",{titles : titles, texts : texts});
});

app.listen(port,() => {
    console.log("Server is running");
});
