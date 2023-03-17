// Use the dotenv package, to create environment variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const morgan = require('morgan');
const server = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const { client } = require("./db");

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(cors());

const apiRouter = require("./api");
server.use('/api', apiRouter);

server.use((req, res, next) => {
    res.status(404).send("Request failed with status code 404");
});

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Request failed with status code 500');
})

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
    client.connect();
  });
  



// Create custom error handling that sets the status code to 500
// and returns the error as an object