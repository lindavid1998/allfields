const express = require('express');
const cors = require('cors');
const PORT = 8000;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'hello world'})
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))