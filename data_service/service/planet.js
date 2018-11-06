const EventEmitter = require('events');
const Schema = require('mongoose').Schema;
const { Coordinate, Planet } = require('./db');

class PlanetService extends EventEmitter {
  constructor() {
    super();
    this.events = {
      GET_ALL_PLANETS: 'GET_ALL_PLANETS',
      GET_PLANET_COORDINATES_BY_ID: 'GET_PLANET_COORDINATES_BY_ID',
      ADD_COORDINATES_TO_PLANET: 'ADD_COORDINATES_TO_PLANET'
    };
  }
  getAllPlanets() {
    Planet.find({}, (err, planet) => {
      if(err) {
        if(err.reason === undefined) {
          this.emit(this.events.GET_ALL_PLANETS, -1);
        } else {
        this.emit(this.events.GET_ALL_PLANETS);
        }
      }
      this.emit(this.events.GET_ALL_PLANETS, planet);
    });
  };
  getPlanetCoordinatesById(id) {
    Coordinate.find({planetId: id}, (err, coordinates) => {
      if(err) {
        if(err.reason === undefined) {
          this.emit(this.events.GET_PLANET_COORDINATES_BY_ID, -1);
        } else {
          this.emit(this.events.GET_PLANET_COORDINATES_BY_ID);
        }        
      }
      this.emit(this.events.GET_PLANET_COORDINATES_BY_ID, coordinates);
    });
  };
  addCoordinatesToPlanet(id, body) {
    Planet.findById(id, (err, planet) => {
      if(err) {
        if(err.reason === undefined) {
          this.emit(this.events.ADD_COORDINATES_TO_PLANET, -1);
        }
      } else if(planet === null) {
        this.emit(this.events.ADD_COORDINATES_TO_PLANET, -2);
      } else {
        Coordinate.create(
          {
            latitude: body.latitude,
            longitude: body.longitude,
            planetId: id
          },
          (err, newCoordinate) => {
            if(err) {
              if(err.reason === undefined) {
                this.emit(this.events.ADD_COORDINATES_TO_PLANET, -1);
              } else {
                this.emit(this.events.ADD_COORDINATES_TO_PLANET);
              }
            } else {
              this.emit(this.events.ADD_COORDINATES_TO_PLANET, newCoordinate);
            }
          }
        )
      }
    });
  };
};
module.exports = PlanetService;