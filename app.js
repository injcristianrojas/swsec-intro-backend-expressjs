const express = require('express');
const cors = require('cors');

const PORT = 9000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: '*'
}));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
  swaggerOptions: {
      url: "/api-docs/swagger.json",
  },
}
app.get("/api-docs/swagger.json", (_, res) => res.json(swaggerDocument));
app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));

app.get("/", (_, res) => {
  res.json({ "message": "Index. Nothing to see here." })
});

app.listen(PORT, () => {
  console.log("API server running on port 9000");
});


const v1router = require('./routes/v1');
const v2router = require('./routes/v2');
app.use('/api/v1', v1router);
app.use('/api/v2', v2router);

module.exports = app