const express = require('express');
const app = express();
const port = 3000;

const blog = { id: 1, title: 'Blog title', description: 'Blog description' };

app.get('/', (req, res) => {
  res.send(blog);
});

app.listen(3000, () => {
  console.log(`App is listening on port ${port}`);
});
