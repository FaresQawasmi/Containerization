const express = require("express");
const app = express();
const port = 1210;
const mysql = require("mysql2");
const mongodb = require("mongodb");

const configuration = {
    host: "mysqldb",
    user: "root",
    password: "fares123",
    database: "Data",
    port: 3306
};

app.use(express.static(__dirname));

function getMaxTemperature(callback) {
  const connection = mysql.createConnection(configuration);
  connection.connect((err) => {
    if (err) throw err;
    const query = "SELECT MAX(temp) AS max_temp FROM Temps";
    connection.query(query, (err, results) => {
      connection.end();
      if (err) {
        console.error("Error querying MySQL:", err);
        callback(err, null);
      } else {
        callback(null, results[0].max_temp);
      }
    });
  });
}

function saveMaxTemperatureToMongoDB(maxTemp) {
  const mongoURL = "mongodb://mongo-db:27017";  // Use the correct MongoDB service name
  const client = new mongodb.MongoClient(mongoURL, { useNewUrlParser: true });

  client.connect((err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      return;
    }

    const db = client.db("analyticsdb");  // Use the appropriate database name
    const collection = db.collection("max_temp");

    const newMaxTemp = { maxTemp: maxTemp };

    collection.insertOne(newMaxTemp, (err) => {
      if (err) {
        console.error("Error inserting max temperature into MongoDB:", err);
      } else {
        console.log("Max temperature inserted into MongoDB:", maxTemp);
      }
      client.close();
    });
  });
}

app.get("/Analytics", (req, res) => {
  getMaxTemperature((err, maxTemp) => {
    if (err) {
      res.status(500).send("Error fetching max temperature");
    } else {
      saveMaxTemperatureToMongoDB(maxTemp);
      res.send(`Max Temperature: ${maxTemp}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Analytics Service listening on port ${port}`);
});
