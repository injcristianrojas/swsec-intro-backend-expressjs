const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const outputFile = './swagger.json';
const endpointFiles = ['./app.js'];
const template = {
  host: 'localhost:9000'
};

swaggerAutogen(outputFile, endpointFiles, template);