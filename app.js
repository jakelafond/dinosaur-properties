const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dinosaurs = [
  {
    id: 1,
    name: 'TYRANNOSAURUS',
    size: '23 ft.',
    weight: '16,000 pounds',
    period: 'Late Cretaceous',
    habitats: ['coastal', 'tropical', 'forest']
  },
  {
    id: 2,
    name: 'STEGASAURUS',
    size: '11 ft.',
    weight: '6,000 pounds',
    period: 'Late Jurassic',
    habitats: ['sub-tropical', 'forest']
  },
  {
    id: 3,
    name: 'TRICERATOPS',
    size: '9.5 ft.',
    weight: '14,0000 pounds',
    period: 'Late Cretaceous',
    habitats: ['tropical']
  },
  {
    id: 4,
    name: 'TITANOSAURUS',
    size: '50 ft.',
    weight: '30,000 pounds',
    period: 'Late Cretaceous',
    habitats: ['forest']
  }
];

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
    myDino.habitats = req.body.habitat;
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
  res.json(dinosaurs);
});

app.listen(3000, () => {
  console.log('Awaiting your command...');
});
