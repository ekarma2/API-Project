// Get express object
const express = require('express');
// set app object
const app = express();

app.set('view engine', 'ejs');
// middleware  
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// memory for posts (not persistent)
let posts = [];
let nextID = 1;
// define route
app.get('/', (req, res) => 
{
  res.render('index', { posts });
});
// add route to display all posts
app.get('/posts/new', (req, res) => 
{
  res.render('new');
});
// show create post form
app.get('/posts/new', (req, res) =>
{
  res.render('new');
});
// handle post form submission
app.post('/posts', (req, res) =>
{
  // Create post object
  const newPost = 
  {
    id: nextID++,
    author : req.body.author,
    title : req.body.title,
    body : req.body.body,
    createdAt : new Date()
  }


  // Add new post to post array
  posts.push(newPost);
  // redirect to posts page
  res.redirect('/');
});

// add route to edit form
app.get('/posts/:id/edit', (req, res) =>
{
  // search for post with matching id in array 
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('edit', {post});
});
// listen to post requests  
app.post('/posts/:id', (req, res) =>
{
  // search for post with matching id in array 
  const post = posts.find(p => p.id === parseInt(req.params.id));
  // update post content 
  post.author = req.body.author;
  post.title = req.body.title;
  post.body = req.body.body;
  res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) =>
{
  // match url with text and capture ID
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

// start server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
