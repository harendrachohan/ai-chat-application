const express = require('express');
const {generate} = require('./chatbot');
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/chat', async(req, res) => {
    const { message } = req.body;

    const results = await generate(message);
    res.json({"message":results})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})