const express = require('express');
const app = express();
const port = 3000;
const Post = require('./model/Post');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let isConnected = false;

const connectDb = async () => {
  await mongoose
    .connect('mongodb+srv://LelonDev:YddfZyILO98c602M@cluster0.qbzbwjo.mongodb.net/?retryWrites=true&w=majority')
    .then(console.log('Connected to the db'), (isConnected = true))
    .catch((err) => {
      console.log(err, 'could not connect to the database'),
        (isConnected = false);
    });
};

connectDb();

app.get('/', async (req, res) => {
  const posts = await Post.find({}).sort({ dateCreated: -1 });
  console.log(posts)
  res.render('index', {
    posts,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/add_post', async (req, res) => {
  console.log(req.body);

  await Post.create(req.body);
  res.redirect('/');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.listen(3000, () => {
  console.log(`App is listening on port ${port}`);
});
