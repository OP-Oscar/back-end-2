//importing packages
const express = require('express'); // => importing express 
const cors = require('cors');  // => importing cors
const controller = require('./controllers/controller'); // => importing controllers file


//invoke express
const app = express();

//middleware
app.use(cors());
app.use(express.json());

// destructuring from controller
const {getHouses, createHouse, updateHouse, deleteHouse} = controller;


//endpoints....routes?
app.get('/api/houses', getHouses);
app.post(`/api/houses`, createHouse);
app.put(`/api/houses/:house_id`, updateHouse);
app.delete(`/api/houses/:house_id`, deleteHouse);



//listening
app.listen(4004, () => console.log('Listening on port 4004 ...All Clear'));