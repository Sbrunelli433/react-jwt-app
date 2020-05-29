const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const db = require('../db');
const auth = require('../middleware/auth.js');

/* GET users listing. */

router.get('/', (req, res, next) => {
  db.users.list((err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.json(data);
    }
  });
});

router.get('/:username', (req, res, next) => {
  db.users.readOne(req.params.username, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      if (data.length > 0) {
        delete data[0].password;
      }
      res.json(data);
    }
  });
});

/* POST new user listing */
router.post('/', auth.create, (req, res, next) => {
  db.users.new(req.body, (err, data) => {
    if (err) {
      console.log(err);
      // if (err.errno === 1062) {
      //  res.writeHead(409);
      //  res.end();
      // } 
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(201);
      res.end();
    }
  });
});

/* POST login */
router.post('/login', auth.checkUser, auth.compare, auth.readRole, (req, res, next) => {
  const accessToken = jwt.sign({username: req.user}, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken, role: req.role });
});

/* DELETE user listing */
router.delete('/', (req, res, next) => {
  console.log(req.body);
  db.users.delete(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200);
      res.end();
    }
  });
});

/* PATCH partial user update */
router.patch('/', (req, res, next) => {
  console.log(req.body);
  db.users.update(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      console.log(data);
      res.writeHead(200);
      res.end();
    }
  });
});

/* PATCH for changing roles of users */
router.patch('/role', auth.authenticateToken, 
auth.readRole, auth.roleChangeCheck, (req, res, next) => {
  db.users.changeRole(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200);
      res.end();
    }
  });
});

module.exports = router;