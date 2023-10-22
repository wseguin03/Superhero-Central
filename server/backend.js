const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const fs = require('fs'); 
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Character, Superpower } = require('./blog');
require('dotenv').config();
//connection string

const username = process.env.api_username;
const password = process.env.api_password;


let superhero_info = []
let superhero_powers = []

const filePath = 'superhero_info.json';
const filePath2 = 'superhero_powers.json';
try {
  // Read the JSON file
  const data = fs.readFileSync(filePath, 'utf8');
  const data2 = fs.readFileSync(filePath2, 'utf8');

  // Parse the JSON data into an array
  superhero_info = JSON.parse(data);
  superhero_powers = JSON.parse(data2);

//   console.log(superhero_info);

  // Use superheroArray as needed
//   console.log(superheroInfo);
} catch (err) {
  console.error(`Error reading or parsing the JSON file: ${err}`);
}


db_uri = 'mongodb+srv://'+username+':'+password+'@superherodata.llwdtto.mongodb.net/superhero?retryWrites=true&w=majority'
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('MongoDb Connected');
    return uploadData(); // Return a reference to uploadData
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.log('Error connecting to db: ', err));




app.use('/', express.static('static'));
router.use(express.json());

async function uploadData() {
    try {
        console.log(superhero_info)
        await Character.insertMany(superhero_info);
        console.log('Data inserted into SuperheroInfo collection');
    } catch (err) {
        console.error('Error inserting data into SuperheroInfo collection:', err);
    }

    try {
        await Superpower.insertMany(superhero_powers);
        console.log('Data inserted into SuperheroPowers collection');
    } catch (err) {
        console.error('Error inserting data into SuperheroPowers collection:', err);
    }
}

app.get('/info', (req, res) => {
    // console.log(`GET request for ${req.url}`);
    res.send(superhero_info)

}
);

app.get('/powers', (req, res) => {
    // console.log(`GET request for ${req.url}`);
    res.send(superhero_powers)

}
);
app.use((req, res, next) => {//for all routes
    console.log(`${req.method} request for ${req.url}`);
    next();//keep going
});

