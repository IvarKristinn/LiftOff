const mongoose = require('mongoose');
const planetSchema = require('../schemas/planet');
const coordinateSchema = require('../schemas/coordinate');
const connectionString = process.env.DB || "mongodb://liftoffdev:abc123@ds013589.mlab.com:13589/lift-off-dev";
//TEST 
// mongodb://liftofftest:abc123@ds219983.mlab.com:19983/lift-off-test
//PROD
// mongodb://liftoffprod:abc123@ds147390.mlab.com:47390/lift-off-prodveft

const connection = mongoose.createConnection(connectionString, {
  useNewUrlParser: true });

module.exports = {
  Planet: connection.model('Planet', planetSchema),
  Coordinate: connection.model('Coordinate', coordinateSchema) 
};
