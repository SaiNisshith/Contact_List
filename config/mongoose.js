//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');
// }

//acquire the connection
const db =mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//up and running
db.once('open', function() {
  console.log('dB Running Fine')
});