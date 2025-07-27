const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500' // Allow requests from this origin
}));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/login', (req, res) => {
  res.send('Login endpoint');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
