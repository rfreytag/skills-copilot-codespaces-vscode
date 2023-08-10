// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
// Create express app
const app = express();
// Use body parser
app.use(bodyParser.json());
app.use(cors());
// Create comments object
const commentsByPostId = {};
// Create route to get comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
// Create route to create comments
app.post('/posts/:id/comments', (req, res) => {
    // Create random id for comment
    const commentId = randomBytes(4).toString('hex');
    // Get the content of the comment
    const { content } = req.body;
    // Get comments for the post
    const comments = commentsByPostId[req.params.id] || [];
    // Push new comment to comments array
    comments.push({ id: commentId, content });
    // Add comments to post
    commentsByPostId[req.params.id] = comments;
    // Send back the comments
    res.status(201).send(comments);
});
// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});