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
    await client.connect();
    const bikeCollection = client.db("bike_data").collection("bikewarehouse");
    // console.log("db-connected");


    // get api to read all bikeData
    app.get("/bikes" , async(req,res)=>{
      console.log(req);
      const query = {};
      const cursor = bikeCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);



      res.send("send")
    })

  }

  finally{
    // await client.close();

  }
}

run().catch(console.dir)





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("done " ,port);
})