import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var titles = [];
var texts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/",(req,res) =>{
   res.render("index.ejs");
});

app.get("/posts",(req,res) =>{
    res.render("posts.ejs",{titles : titles, texts : texts});
});

app.get("/posts/delete/:blogID",(req,res) =>{
    var index = req.params.blogID;
    titles.splice(index,1);
    texts.splice(index,1);

    res.redirect("../../posts");
});

app.get("/posts/edit/:blogID",(req,res) =>{
    var index = req.params.blogID;
    res.render("create.ejs",{title : titles[index], text : texts[index]});
});

app.get("/posts/readmore/:blogID",(req,res) =>{
    var index = req.params.blogID;
    res.render("readmore.ejs",{title : titles[index], text : texts[index]});
});

app.get("/create",(req,res) =>{
    res.render("create.ejs");
});

app.post("/posts",(req,res) =>{
    var title = req.body["title"];
    var text = req.body["text"];
    if(title){
        titles.push(title);
        texts.push(text);
    }
    res.render("posts.ejs",{titles : titles, texts : texts});
});

app.listen(port,() => {
    console.log("Server is running");
});
