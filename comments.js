// Create web server
// Create a web server that listens on port 3000. When a user visits the root of your website, they should see a list of all comments that have been added so far. You should also display a form that the user can use to add a new comment. The form should have a field for the user's name and a field for the comment itself. When the user submits the form, the comment should be added to the list of comments and the user should be redirected back to the root of the website.

const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readFile('comments.txt', 'utf8', (err, data) => {
        if (err) {
            res.send('No comments yet');
        } else {
            const comments = data.split('\n').filter(Boolean);
            res.send(`
                <h1>Comments</h1>
                <ul>
                    ${comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
                <form action="/" method="post">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="text" name="comment" placeholder="Your Comment" required>
                    <button type="submit">Add Comment</button>
                </form>
            `);
        }
    });
});

app.post('/', (req, res) => {
    const name = req.body.name;
    const comment = req.body.comment;
    fs.appendFile('comments.txt', `${name}: ${comment}\n`, (err) => {
        if (err) {
            res.send('Error adding comment');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Run the server using node comments.js and visit http://localhost:3000 in your browser. You should see a list of comments and a form to add a new comment. Try adding a few comments to see if they are displayed correctly.