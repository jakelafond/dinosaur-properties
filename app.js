const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mustacheExpress = require('mustache-express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('views', './templates');
app.set('view engine', 'mustache');

var dinosaurs = [
  {
    id: 1,
    name: 'TYRANNOSAURUS',
    image: 'http://www.activewild.com/wp-content/uploads/2016/07/Tyrannosaurus-Rex.jpg',
    size: '23 ft.',
    weight: '16,000 pounds',
    period: 'Late Cretaceous',
    habitats: 'coastal,tropical,forest'
  },
  {
    id: 2,
    name: 'STEGASAURUS',
    image:
      'https://vignette1.wikia.nocookie.net/dino/images/4/4c/Stegosaurus-detail-header.png/revision/latest?cb=20150407211604',
    size: '11 ft.',
    weight: '6,000 pounds',
    period: 'Late Jurassic',
    habitats: 'sub-tropical,forest'
  },
  {
    id: 3,
    name: 'TRICERATOPS',
    image: 'https://vignette2.wikia.nocookie.net/dino/images/f/f6/JW_triceratops.png/revision/latest?cb=20150407211112',
    size: '9.5 ft.',
    weight: '14,0000 pounds',
    period: 'Late Cretaceous',
    habitats: 'tropical'
  },
  {
    id: 4,
    name: 'TITANOSAURUS',
    image: 'http://images.dinosaurpictures.org/titanosaurus-colberti-2_4c21.jpg',
    size: '50 ft.',
    weight: '30,000 pounds',
    period: 'Late Cretaceous',
    habitats: 'forest'
  }
];
//dino homepage
app.get('/', (req, res) => {
  res.render('index', { dinosaurs });
});

//click dinosaur and get dino info!
app.get('/dinosaurs/:id', (req, res) => {
  res.render('dino');
});

//create a new dino page!
app.get('/newdino', (req, res) => {
  res.render('newdino');
});

app.post('/newdino', (req, res) => {
  res.render('newdino');
});

app.post('/', (req, res) => {
  const newDino = {
    id: dinosaurs.length + 1,
    name: req.body.name,
    image: req.body.image,
    size: req.body.size,
    weight: req.body.weight,
    period: req.body.period,
    habitats: req.body.habitats
  };
  dinosaurs.push(newDino);
  res.render('index', { dinosaurs });
});

//edit a dino!

app.get('/editdino/:id', (req, res) => {
  res.render('editdino');
});

// GET /api/dinosaurs
app.get('/api/dinosaurs', (req, res) => {
  res.json(dinosaurs);
});

// GET /api/dinosaurs/:id
app.get('/api/dinosaurs/:id', (req, res) => {
  const dinoID = parseInt(req.params.id);
  const myDino = dinosaurs.find(dino => {
    return dino.id === dinoID;
  });
  res.json(myDino);
});

// GET /api/dinosuars/:id/habitats
app.get('/api/dinosaurs/:id/habitats', (req, res) => {
  const dinoID = parseInt(req.params.id);
  const myDino = dinosaurs.find(dino => {
    return dino.id === dinoID;
  });
  res.json(myDino.habitats);
});

// POST /api/dinosaurs
app.post('/api/dinosaurs', (req, res) => {
  const newDino = {
    id: dinosaurs.length + 1,
    name: req.body.name,
    size: req.body.size,
    weight: req.body.weight,
    period: req.body.period,
    habitats: req.body.habitats
  };
  dinosaurs.push(newDino);
  res.json(newDino);
});

// PUT /api/dinosaurs/:id
app.put('/api/dinosaurs/:id', (req, res) => {
  const dinoID = parseInt(req.params.id);

  const myDino = dinosaurs.find(dino => {
    return dino.id === dinoID;
  });

  if (myDino !== undefined) {
    myDino.name = req.body.name;
    myDino.size = req.body.size;
    myDino.weight = req.body.weight;
    myDino.period = req.body.period;
    myDino.habitats = req.body.habitats;
  } else {
    const newDino = {
      id: dinosaurs.length + 1,
      name: req.body.name,
      size: req.body.size,
      weight: req.body.weight,
      period: req.body.period,
      habitats: req.body.habitats
    };
    dinosaurs.push(newDino);
  }
  res.json(dinosaurs);
});

// DELETE /api/dinosaurs/:id
app.delete('/api/dinosaurs/:id', (req, res) => {
  const dinoID = parseInt(req.params.id);
  dinosaurs = dinosaurs.filter(dino => dino.id !== dinoID);
  res.render('index', { dinosaurs });
});

app.listen(3000, () => {
  console.log('Awaiting your command...');
});
