const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));


let posts = [
    {
        id: uuidv4(),
        username: "subham",
        content: "I love my life",
        url: "https://cdn.pixabay.com/photo/2023/11/08/20/11/mountains-8375693_1280.jpg"
    },
    {
        id: uuidv4(),
        username: "raja",
        content: "every thing is moho maya, so keep away from those things.",
        url: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
    },
    {
        id: uuidv4(),
        username: "pabitra",
        content: "I am a coding champ!",
        url: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg"
    },
    {
        id: uuidv4(),
        username: "subham",
        content: "Focus on your studies",
        url: "https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_1280.jpg"
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { username, url, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content, url });
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newCont = req.body.content;
    let newUrl = req.body.url;
    let post = posts.find((p) => id === p.id);
    post.content = newCont;
    post.url = newUrl;
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});

app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});