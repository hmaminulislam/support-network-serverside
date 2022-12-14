const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000

// midleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wpflsxi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try{
        const Services = client.db("SupportNetwork").collection('services');

        app.get('/services', async(req, res) => {
            const query = {}
            const cursor = Services.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
    }
    finally{

    }
}

run().catch(error=> console.log(error))


app.get('/', (req, res) => {
    res.send('Support Network Server Running...')
})

app.listen(port, () => {
    console.log(`Support Netework Port: ${port}`)
})