const express = require('express');
const router = express.Router();
const { db, getMessages, loginQuery, getUsersByTypeV2 } = require("../helpers/db.js");
const { isTokenValid, signToken } = require("../helpers/jwt.js");

router.post("/login", (req, res) => {
  let results = loginQuery(req.body.username, req.body.password);

  if (results.length < 1) {
    res.status(401).json({ "error": "unauthorized" });
  } else {
    res.json({ 'token': signToken(req.body.username) });
  }
});

router.get("/users/type/:type", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  res.json({
    "message": "success",
    "data": getUsersByTypeV2(req.params.type)
  });

});

router.get("/messages", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  res.json({
    "message": "success",
    "data": getMessages()
  });

});
router.post("/messages/new", (req, res) => {
  if (!isTokenValid(req)) {
    res.status(401).json({ "error": "unauthorized" });
    return;
  }

  try {
    db.exec(`INSERT INTO messages(message) VALUES ('${req.body.message}')`);
  } catch (err) {
    if (!db.inTransaction) throw err; // (transaction was forcefully rolled back)
    res.status(500).json({
      "message": "Error:" + err
    });
    return;
  }

  res.json({
    "message": "success",
    "data": getMessages()
  });

});

module.exports = router;