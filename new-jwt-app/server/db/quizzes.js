const mysql = require('mysql');
const config = require('./config.js');
const pool = mysql.createPool(config); 
const sqlstr = require('./sqlstr.js');

const quizzes = { };
quizzes.parts = { };

quizzes.parts.requiredCols = ['mid', 'part', 'first_page', 'last_page'];
quizzes.requiredCols = ['pid', 'question', 'answer'];

quizzes.parts.optionalCols = [];
quizzes.optionalCols = ['a', 'b', 'c', 'd', 'e'];

/* quiz_parts CRUD */
quizzes.parts.list = function(cb) {
  pool.query(`SELECT * FROM quiz_parts;`, (err, data) => {
    cb(err, data);
  });
};

quizzes.parts.new = function(obj, cb) {
  var sql = sqlstr.new('quiz_parts', quizzes.parts.requiredCols, obj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    }); 
  } else {
    cb(new Error("Invalid Request"));
  } 
};

quizzes.parts.update = function(obj, cb) {
  var modifiable = quizzes.parts.requiredCols;
  var sql = sqlstr.update('quiz_parts', 'id', modifiable, obj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error("Invalid Request"));
  }
};

quizzes.parts.delete = function(obj, cb) {
  var sql = sqlstr.delete('quiz_parts', 'id', obj);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error("Invalid Request"));
  }
};

quizzes.parts.readMod = function(mid, cb) {
  // given module id (mid), give back all parts
  var valid = true;
    console.log(mid);
    console.log(Number.isInteger(Number(mid)));
  if (!Number.isInteger(Number(mid))) {
    valid = false;
  }
  if (valid) {
    pool.query(`SELECT * FROM quiz_parts WHERE mid=?;`, [mid], (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error("Invalid Request"));
  }
};

/* quizzes CRUD */
quizzes.list = function(cb) {
  pool.query(`SELECT * FROM quizzes;`, (err, data) => {
    cb(err, data);
  });
};

quizzes.new = function(obj, cb) {
  var sql = sqlstr.new('quizzes', quizzes.requiredCols, obj, quizzes.optionalCols);
  if (sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    }); 
  } else {
    cb(new Error("Invalid Request"));
  }
};

quizzes.update = function(obj, cb) {
  var modifiable = quizzes.requiredCols.concat(quizzes.optionalCols);
  var sql = sqlstr.update('quizzes', 'id', modifiable, obj);
  if(sql.valid) {
    pool.query(sql.query, sql.entries, (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error('Invalid Request'));
  }
};

quizzes.readPart = function(pid, cb) {
// given quiz_parts id (pid), list all quiz questions for that part
  var valid = true;
  if (!Number.isInteger(Number(pid))) {
    valid = false;
  }
  if (valid) {
    pool.query(`SELECT * FROM quizzes WHERE pid=?;`, [pid], (err, data) => {
      cb(err, data);
    });
  } else {
    cb(new Error("Invalid Request"));
  }
};

quizzes.readOne = function(id, cb) {
  var valid = true;
  if (!Number.isInteger(Number(id))) {
    valid = false;
  }
  if (valid) {
    pool.query(`SELECT * FROM quizzes WHERE id=?;`, [id], (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(null, data);
      }
    });
  } else {
    cb(new Error("Invalid Request"));
  }
}

module.exports = quizzes;
