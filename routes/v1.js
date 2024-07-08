const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

const { getMessages, getUsersByTypeV1 } = require("../helpers/db.js");

router.get("/users/type/:type", (req, res) => {

  res.json({
    "message": "success",
    "data": getUsersByTypeV1(req.params.type)
  });

});

router.get("/messages", (req, res) => {

  res.json(getMessages());

});


router.get('/healthcheck/:file?', (req, res) => {
  const file = req.params.file ? req.params.file : 'healthcheck';

  command = `cat ${file}`

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