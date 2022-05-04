const express = require('express')
const cors = require("cors");
const app = express()
require ('dotenv').config();
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.obepz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try{

    const client = new MongoClient(uri);
    const bikeCollection = client.db("bike_data").collection("bikewarehouse")
    console.log("db-connected");

  }

  finally{

  }
}

run().catch(console.dir)





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("done " ,port);
})