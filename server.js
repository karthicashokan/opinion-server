const express = require('express');
const cors = require('cors');
const app = express();
// MySql Db connection and set in globally
global.db = require('./db');

// CORS options
const corsOptions = {
    origin: '*'
};
// Apply CORS options
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(require('./routes'));

// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});