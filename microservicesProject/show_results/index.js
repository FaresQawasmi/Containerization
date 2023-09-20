const express = require('express');
const app = express();
const port = 1209;
const MongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb://root:example@mongo-db:27017";

app.use(express.static(__dirname));

app.get('/ShowResults', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true });
    const db = client.db("maxDB"); //
    const collection = db.collection("max_temp");

    const maxTempRecord = await collection.findOne({}, { sort: { _id: -1 } });
    const maxTemp = maxTempRecord ? maxTempRecord.maxTemp : 'N/A';

    res.send(`Max Temperature: ${maxTemp}`);

    client.close();
  } catch (error) {
    console.error("Error retrieving max temperature:", error);
    res.status(500).send("An error occurred");
  }
});

app.get( '/', ( req, res ) =>
{
    res.sendFile( __dirname + '/login.html' )
} );

app.listen(port, () => {
  console.log(`Show Results Service listening on port ${port}`);
});
