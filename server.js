const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require('method-override')
const favicon = require('serve-favicon');
const path = require('path')

require("dotenv").config();

const app = express();
const db = process.env.MongoURI;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(favicon(path.join(__dirname, 'favicon.png')));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'desc' })
  res.render("articles/index", { articles });
});

// Connect to MongoDB
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log("MongoDb Connected..."))
.catch((err) => console.error(err));

app.use("/articles", articleRouter);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server started on Port: ${PORT}`));
