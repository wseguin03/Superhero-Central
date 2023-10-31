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

// app.use('/', express.static('client'));
app.use(express.json());

const path = require('path');

app.use('/', express.static(path.join(__dirname, '..', 'client')));

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

// GET INFO BY ID
app.get('/info-db/:id', (req, res) => {
    const itemId = req.params.id;
  
    Info.findOne({"id": itemId})
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
          res.status(404).send("Item not found");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });
//##############################################################################

//GET POWER BY ID
  app.get('/power-db/:id', (req, res) => {
    const itemId = req.params.id;
  
    Info.findOne({"id": itemId})
      .then((result_one) => {
        console.log(result_one.name)
        if (result_one) {
            Power.findOne({"hero_names": result_one.name})
            .then((result) => {
                const filteredResult = {};
                    for (const key in result) {
                        if (result[key] == "True") {//only returns powers with a True value
                            filteredResult[key] = result[key];
                            }
                        }
                        console.log(filteredResult)
                        res.send(filteredResult);
            })
        } else {
          res.status(404).send("Item not found");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });
//##############################################################################
//GET ALL UNIQUE PUBLISHERS
  app.get('/publishers', (req, res) => {
        Info.distinct("Publisher")
        .then((result)=>{
        if(result){
            result = result.filter(Boolean)//remove null values
        console.log(result);
        res.send(result);
        }
        else {
            res.status(404).send("Item not found");
          }
  })
  .catch((err) => {
    console.log(err)
    res.status(404500).send("Internal Server Error")
  });
});
//##############################################################################
  

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