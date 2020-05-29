const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config);

const sqlstr = require('./sqlstr.js');

const users = {};

// username and password must remain first elements of requiredCol
var requiredCol = ['username', 'password', 'first_name', 'last_name', 'address', 'phone', 'city', 'state', 'zip'];
var optionalCol = ['newsletter'];
var adminCol = ['role', 'points'];
users.roles = { 
  super: true, 
  marketing: true, 
  contractor: true, 
  distributor: true, 
  external_rep: true, 
  internal_rep: true 
};

users.list = function(cb){
  pool.query('SELECT id, username, first_name, last_name, address, phone, city, state, zip, newsletter, role, points FROM users;', (err, data, fields) => {
    cb(err, data, fields);
  });
};

users.new = function(userObj, cb) {
  // add some extra validation for the properties of userObj
  // currently just check that all required fields exist on request
  if (!userObj.newsletter) {userObj.newsletter = 0} 
  var sql = sqlstr.new('users', requiredCol, userObj, optionalCol);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
        if (err) {
          cb(err);
        } else {
          cb(null, data);
        }
    });
  } else {
    cb('Missing Fields');
  }
};

users.delete = function(reqObj, cb) {
  pool.query('DELETE FROM users WHERE username=?;', [reqObj.username], (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
}

users.update = function(userObj, cb) {
  var sql = sqlstr.update('users', 'username', requiredCol.slice(2).concat(optionalCol), userObj);
  
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
};

users.readOne = function(username, cb) {
  pool.query(`SELECT * FROM users WHERE username=?`, username, (err, data) => {
    cb(err, data)
  });
};

users.changeRole = function(obj, cb) {
  var sql = sqlstr.update('users', 'username', ['role'], obj);
  if (!users.roles[obj.role]) {
    sql.valid = false;
  }
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
}

module.exports = users;
