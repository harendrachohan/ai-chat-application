const express = require('express');
const cors = require('cors')

const {generate} = require('./chatbot');

const app = express()
const port = 3000

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/chat', async(req, res) => {
    const { message } = req.body;
    console.log("message",message)

    const results = await generate(message);
    res.json({"message":results})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})