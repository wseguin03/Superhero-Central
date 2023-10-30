const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Info = require('./info');
const Power = require('./powers');

require('dotenv').config();

const username = process.env.api_username;
const password = process.env.api_password;

let superhero_info = [];
let superhero_powers = [];

// const filePath = 'superhero_info.json';
// const filePath2 = 'superhero_powers.json';

// try {
//   const data = fs.readFileSync(filePath, 'utf8');
//   const data2 = fs.readFileSync(filePath2, 'utf8');

//   superhero_info = JSON.parse(data);
//   superhero_powers = JSON.parse(data2);
// } catch (err) {
//   console.error(`Error reading or parsing the JSON file: ${err}`);
// }

const db_uri = 'mongodb+srv://' + username + ':' + password + '@superherodata.llwdtto.mongodb.net/superhero?retryWrites=true&w=majority';

mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');

  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to db: ', err);
  });

app.use('/', express.static('static'));
router.use(express.json());

// app.get('/info', (req, res) => {
//   res.send(superhero_info);
// });

// app.get('/powers', (req, res) => {
//   res.send(superhero_powers);
// });

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

app.get('/info-db', (req, res) => {
  Info.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/power-db', (req, res) => {
    Power.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });



  

function uploadData(){
     // Import superhero_info into Info collection
     superhero_powers.forEach((infoData) => {
        const power = new Power(infoData);
        power.save()
          .then(() => {
            console.log('Power document saved.');
          })
          .catch((err) => {
            console.error('Error saving Info document: ', err);
          });
      });
  
      superhero_info.forEach((infoData) => {
          const info = new Info(infoData);
          info.save()
            .then(() => {
              console.log('Info document saved.');
            })
            .catch((err) => {
              console.error('Error saving Info document: ', err);
            });
        });
}