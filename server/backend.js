const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const fs = require('fs'); 

app.use('/', express.static('static'));
router.use(express.json());

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

  // Use superheroArray as needed
//   console.log(superheroInfo);
} catch (err) {
  console.error(`Error reading or parsing the JSON file: ${err}`);
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);