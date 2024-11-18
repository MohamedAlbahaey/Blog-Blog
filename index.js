import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = new Map();


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/",(req,res) =>{
   res.render("index.ejs");
});

app.get("/posts",(req,res) =>{
    res.render("posts.ejs",{map:posts});
});

app.get("/create",(req,res) =>{
    res.render("create.ejs");
});

app.post("/posts",(req,res) => {
    var title1 = req.body["title"];
    var text1 = req.body["text"];
    if(title1){
        posts.set(title1 , text1)
    }

    res.render("posts.ejs",{map : posts});
});

app.listen(port,() => {
    console.log("Server is running");
});
