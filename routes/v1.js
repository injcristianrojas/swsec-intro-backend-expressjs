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

module.exports = router;
