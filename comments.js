// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const comments = require('./comments.json');

app.use(bodyParser.json());

// Create a route that returns all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route that returns a single comment
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  res.json(comment);
});

// Create a route that creates a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.json(comment);
    }
  });
});

// Create a route that updates a single comment
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment.id == id);
  Object.assign(comment, req.body);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.json(comment);
    }
  });
});

// Create a route that deletes a single comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex(comment => comment.id == id);
  comments.splice(commentIndex, 1);
  fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else {
      res.status(204).send();
    }
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Create a route that returns all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route that returns a single comment
app.get