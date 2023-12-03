const express = require('express');
const app = express();
const port = 5000;
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Info = require('./models/info');
const Power = require('./models/powers');
const List = require('./models/lists');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const reviewRoutes = require('./routes/reviewRoute');
const flag = require('./routes/flagReviewRoute');
const policyRoutes = require('./routes/policyRoute');
const disputeRoute = require('./routes/disputeRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

require('dotenv').config();

const username = process.env.api_username;
const password = process.env.api_password;

let superhero_info = [];
let superhero_powers = [];


const db_uri = 'mongodb+srv://' + 'superhero_user' + ':' + 'Qk2G1Dt93LiZawv5' + '@superherodata.llwdtto.mongodb.net/superhero?retryWrites=true&w=majority';

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
// router.use(express.json());
app.use(express.json())
const path = require('path');
const dispute = require('./models/dispute');

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
app.route('/info-db/:id') 
.get((req, res) => {
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
      })
    })
    .post((req, res) => {
      
  });
  app.route('/create-list/:name') 
  .get((req, res) => {
      const listName = req.params.name;
    
      List.findOne({"name": listName})
        .then((result) => {
          if (result) {
            res.send(result);
          } else {
            res.status(404).send("List not found");
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Internal Server Error");
        })
      })

app.delete('/delete-list/:name', (req, res) => {
    const listName = req.params.name;
  
    List.findOneAndDelete({"name": listName})
      .then((result) => {
        if (result) {
          res.send(result);
        } else {
          res.status(404).send("List not found");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      })
  });
  app.route("/create-list")
  .put((req, res) => {
    const listName = req.body.name;
    console.log(listName.length)

    // Validate that 'name' is provided and has a reasonable length
    if (!listName || typeof listName !== 'string' || listName.length < 1 || listName.length > 255 || listName.indexOf('<') !== -1 || listName.indexOf('>') !== -1) {
      return res.status(400).send("Invalid request: 'name' is missing or invalid.");
    }

    // Filter (sanitize) the 'listName' to prevent unintended side effects
    const sanitizedListName = sanitizeInput(listName);

    List.findOne({ "name": sanitizedListName })
      .then((result) => {
        if (result) {
          return res.status(400).send("List already exists.");
        } else {
          const list = new List(req.body);

          list.name = sanitizedListName; // Store the sanitized name
          list.save()
            .then(() => {
              console.log('List document saved.');
              res.status(201).send(req.body);
            })
            .catch((err) => {
              console.error('Error saving List document: ', err);
              res.status(500).send("Internal Server Error");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  })
  .get((req, res) => {
    List.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  })
  .post((req, res) => {
    const listName = req.body.name;

    // Validate that 'name' is provided and has a reasonable length
    if (!listName || typeof listName !== 'string' || listName.length < 1 || listName.length > 255) {
      return res.status(400).send("Invalid request: 'name' is missing or invalid.");
    }

    // Filter (sanitize) the 'listName' to prevent unintended side effects
    const sanitizedListName = sanitizeInput(listName);

    const list = new List(req.body);
    console.log(list)
    List.findOne({ "name": sanitizedListName })
      .then((result) => {
        if (result) {
          result.name = req.body.name; // Update the name data
          result.list = req.body.list; // Update the list data
          result.user = req.body.user; // Update the user data
          result.description = req.body.description; // Update the description data
          result.rating = req.body.rating; // Update the ratings data
          result.public = req.body.public; // Update the public data
          result.lastChanged = new Date()     // Prevent unintended side effects by ensuring the name remains the same
          if (result.name !== sanitizedListName) {
            return res.status(400).send("Invalid request: 'name' cannot be changed.");
          }

          result.save()
            .then(() => {
              console.log('List document updated.');
              res.send(result);
            })
            .catch((err) => {
              console.error('Error updating List document: ', err);
              res.status(500).send("Internal Server Error");
            });
        } else {
          res.status(404).send("List not found");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });

// Input sanitization function
function sanitizeInput(input) {
  // Use a library or implement custom sanitization based on your needs
  // Example using DOMPurify library:
  const createDOMPurify = require("dompurify");
  const { JSDOM } = require("jsdom");
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  return DOMPurify.sanitize(input);
}


app.get('/list-db/:name', (req, res) => {
  List.findOne({ 'name': req.params.name })
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: 'List not found' });
        return;
      }

      const listIds = result.list;
      const combinedResults = [];

      // Use Promise.all to fetch Info and Power data for each ID in parallel
      Promise.all(
        listIds.map((id) => {
          return Info.findOne({ "id": id })
            .then((infoResult) => {
              if (!infoResult) {
                return null; // If Info data is not found, return null
              }

              // Retrieve the Power data
              return Power.findOne({ "hero_names": infoResult.name })
                .then((powerResult) => {
                  if (!powerResult) {
                    return null; // If Power data is not found, return null
                  }
                  const filteredResult = {};
                    for (const key in powerResult) {
                        if (powerResult[key] == "True") {//only returns powers with a True value
                            filteredResult[key] = powerResult[key];
                            }
                        }
                  // Combine Info and Power data for this ID
                  const combinedData = {
                    id: id,
                    info: infoResult,
                    power: filteredResult,
                  };
                  combinedResults.push(combinedData);
                });
            });
        })
      )
      .then(() => {
        res.json({ 
          results: combinedResults,
          user: result.user, // Add user property
          description: result.description, // Add description property
          public: result.public, // Add public property
          rating: result.rating, // Add rating property
          lastChanged: result.lastChanged, // Add lastChanged property
          name: result.name, // Add name property
        });
        // console.log(result)
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
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
                        // console.log(filteredResult)
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

app.get('/search-info', (req, res) => {
  const field = req.query.field;  // Get the field from the query parameters
  const pattern = req.query.pattern;  // Get the pattern from the query parameters
  const n = req.query.n ? parseInt(req.query.n) : -1;  // Get n from the query parameters or set to -1 if not provided

  // Construct a query to find matching superhero IDs based on the field and pattern
  const query = {};
  query[field] = new RegExp(pattern, 'i'); // Case-insensitive search

  Info.find(query)
      .then((results) => {
          // Limit the results to the first n if n is provided and positive
          if (n > 0) {
              results = results.slice(0, n);
          }

          res.send(results.map(info => info.id));
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send("Internal Server Error");
      });
});

app.get('/searchbypower', (req, res) => {
  const powerName = req.query.power; // Get the power name from the query parameters
  const limit = parseInt(req.query.n); // Get the limit from query parameters, default to 10 if not provided or invalid

  // Construct a query to find heroes with the specified power
  const query = {};
  query[powerName] = "True";

  // Add the limit to the query
  Power.find(query)
    .limit(limit)
    .then((results) => {
      if (results.length > 0) {
        // Extract hero names from the results
        const heroNames = results.map(result => result.hero_names);

        // Send the list of hero names with the specified power
        res.send(heroNames);
      } else {
        res.status(404).send("No heroes found with the specified power");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

app.get('/info-db-name/:name', (req, res) => {
  const heroName = req.params.name; // Get the hero name from the request parameters

  Info.findOne({ name: heroName }) // Find the document by hero name and select only the 'id' field
    .then((result) => {
      if (result) {
        res.send(result.id.toString()); // Send the numeric ID as a string
      } else {
        res.status(404).send("Hero not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/lists/:id/reviews', reviewRoutes);
app.use('/api/reviews', flag)
app.use('/api/admin', policyRoutes);
app.use('/api/dispute', disputeRoute);

app.use(notFound);
app.use(errorHandler);
