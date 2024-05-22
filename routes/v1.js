const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

const { getUsersByTypeV1 } = require("../helpers/db.js");

router.get("/users/type/:type", (req, res) => {

  res.json({
    "message": "success",
    "data": getUsersByTypeV1(req.params.type)
  });

});


router.get('/weather/:city', (req, res) => {
  const city = req.params.city;

  command = `./get_weather ${city}`

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the command: ${error}`);
      return res.status(500).send('Internal Server Error');
    }
    if (stderr) {
      console.error(`Script returned an error: ${stderr}`);
      return res.status(500).send('Script Error');
    }
    res.json({
      "message": "success",
      "data": stdout
    });
  });
});

module.exports = router;