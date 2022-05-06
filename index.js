const express = require('express')
const cors = require("cors");
const app = express()
require ('dotenv').config();
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
    // http://localhost:5000/bikes
    app.get("/bikes" , async(req,res)=>{
      // console.log(req);
      const query = {};
      const cursor = bikeCollection.find(query);
      const result = await cursor.limit(6).toArray();
      res.send(result);
    })

    app.get("/manageInventory" , async(req,res)=>{
      // console.log(req);
      const query = {};
      const cursor = bikeCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/manageInventory/:id',async(req,res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await bikeCollection.findOne(query);
      res.send(result)
  })




   // get api to  single bikeData
  //  http:localhost:5000/bikes/
   app.get('/bikes/:id',async(req,res) =>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result = await bikeCollection.findOne(query);
    res.send(result)
})


// deliver decrease api using put

app.put('/manageInventory/:id' ,async(req,res) =>{
  const id = req.params.id;
  const updateQuantity = req.body;
  const filter = {_id:ObjectId(id)}
  const option = { upsert : true}
  const updateDoc ={
    $set:{
    
      quantity : updateQuantity.quantity
    
    }
  }
  const result = await bikeCollection.updateOne(filter,updateDoc,option);
  res.send(result);
})

// get api to deleteOne

app.delete( '/manageInventory/:id' ,async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const result = await bikeCollection.deleteOne(query);
    res.send(result)

})

app.post('/manageInventory' ,async(req,res)=>{
  const newData = req.body;
  // console.log(newData);
  const result = await bikeCollection.insertOne(newData);
  res.send(result)

})



  }

  finally{
    // await client.close();

  }
}

run().catch(console.dir)





app.get('/', (req, res) => {
  res.send('Eid Mubarak')
})

app.listen(port, () => {
  console.log("done " ,port);
})