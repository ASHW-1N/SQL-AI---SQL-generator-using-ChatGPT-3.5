const express = require('express');
const cors = require('cors');
const generate = require('./generate');

const app = express();
app.use(express.json()); 

app.use(cors(
  { origin: "*" }
));

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/generate", async (req, res) => {
  const { queryDescription } = req.body;
  try {
    const sqlQuery = await generate(queryDescription);
    res.json({ sqlQuery });
  } catch (error) {
    console.error('Error in /generate endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

