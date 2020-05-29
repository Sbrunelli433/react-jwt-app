const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

const auth = {};

auth.create = async function(req, res, next) {
  // change req.body.password into a hashed and salted version for storage
  try {
    if (!(req.body.username || req.body.password)) {
      res.writeHead(400);
      res.end('Username and password required')
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashedPassword;
      next();
    }
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
}

auth.checkUser = function(req, res, next) {
  db.users.readOne(req.body.username, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (data.length > 0) {
        req.user = data[0].username;
        req.password = data[0].password;
        next();
      } else {
        res.status(401).send();
      }
    }
  });
}

auth.compare = async function(req, res, next) {
  try {
    if (await bcrypt.compare(req.body.password, req.password)) {
      req.login = true;
      next();
    } else {
      res.writeHead(401);
      res.send('Not Allowed');
    }
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
}

auth.authenticateToken = function(req, res, next) {
  // read token from authorization header
  // if the token is valid, set req.user to the user
  
  const authHeader = req.headers['authorization'];
  // currently assumes Bearer scheme authorization header
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user.username;
    next();
  });
}

auth.readRole = function(req, res, next) {
  db.users.readOne(req.user, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      if (data.length > 0) {
        req.role = data[0].role
      }
      console.log('role: ', req.role)
      next();
    }
  });
}

// make sure a user is allowed to make changes to roles
auth.roleChangeCheck = function(req, res, next) {
  if (req.role === 'super' || req.role === 'marketing') {
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = auth;