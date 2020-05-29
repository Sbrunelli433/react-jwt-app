const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config);
const sqlstr = require('./sqlstr.js');

const modules = {};
modules.categories = {};

modules.categories.requiredCol = ['name'];

modules.requiredCol = ['name', 'mcid', 'src'];

/* modules */

modules.list = function(cb) {
  pool.query('SELECT * from modules;', (err, data) => {
    cb(err, data);
  });
};

modules.new = function(moduleObj, cb) {
  var sql = sqlstr.new('modules', modules.requiredCol, moduleObj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data, fields) => {
        if (err) {
          cb(err);
        } else {
          cb(null, data, fields);
        }
      });
  } else {
    cb(new Error('Invalid module'));
  }
};

modules.update = function(moduleObj, cb) {
  var sql = sqlstr.update('modules', 'id', modules.requiredCol, moduleObj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
};

modules.delete = function(moduleObj, cb) {
  var sql = sqlstr.delete('modules', 'id', moduleObj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
};

/* module_categories */

modules.categories.list = function(cb) {
  pool.query('SELECT * from module_categories;', (err, data) => {
    cb(err, data);
  });
};

modules.categories.new = function(catObj, cb) {
  var sql = sqlstr.new('module_categories', modules.categories.requiredCol, catObj);
  if (sql.valid) {
    pool.query(sql.query
      , sql.entries, (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }
    });
  } else {
    cb(new Error('Invalid module category'));
  }
};

modules.categories.update = function(catObj, cb) {
  var sql = sqlstr.update('module_categories', 'id', modules.categories.requiredCol, catObj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
};

modules.categories.delete = function(catObj, cb) {
  var sql = sqlstr.delete('module_categories', 'id', catObj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
};

module.exports = modules;