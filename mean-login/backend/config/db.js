const mongoose = require('mongoose');
const dbURL = require('./propertis').DB;

module.exports = () => {
  mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(() => console.log(`Mongo conected on ${dbURL}` ))
    .catch( err => console.log(`Connection has ${err}`))

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
          console.log(`Mongo is disconnected`);
          process.exist(0);          
      })
    })
}