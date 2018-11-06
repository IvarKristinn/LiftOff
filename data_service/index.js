const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const planetService = require('./service/planet');

app.use(bodyParser.json());

// /api/planets returns list of all planets GET
app.get('/api/planets', (req, res) => {
  const _service = new planetService();
  _service.on(_service.events.GET_ALL_PLANETS, result => {
    if(result === undefined) {
      return res.status(404).send();
    } else if(result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _service.getAllPlanets();
});

// /api/planets/:planetID/coordinates return all coordinates for various locations within a planet GET
app.get('api/planets/:planetId/coordinates', (req, res) => {
  const Id = req.params.planetId;
  const _service = new planetService();
  _service.on(_service.events.GET_PLANET_COORDINATES_BY_ID, result => {
    if(result === undefined) {
      return res.status(404).send();
    } else if(result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _service.getPlanetCoordinatesById(Id);
});

// /api/planets/:planetID/coordinates adds coordinates for a location within a planet POST
app.post('/api/planets/:planetId/coordinates', (req, res) => {
  const Id = req.params.planetId;
  const { body } = req;
  const _service = new planetService();
  _service.on(_service.events.ADD_COORDINATES_TO_PLANET, result => {
    if(result === undefined) {
      return res.status(404).send();
    } else if(result === null) {
      return res.status(500).send();
    } else {
      return res.status(200).json(result);
    }
  });
  _service.addCoordinatesToPlanet(Id, body);
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));