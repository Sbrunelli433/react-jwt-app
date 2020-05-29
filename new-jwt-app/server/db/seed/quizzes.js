const mysql = require('mysql');
const config = require('../config.js');
const pool = mysql.createPool(config);

const db = require('../index.js');
const parts = db.quizzes.parts;

var insertId = 0;

db.modules.categories.new({name: 'quizTest'}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    db.modules.new({name: 'Test Quiz Category', mcid: `${data.insertId}`, src:'/pdf/example.pdf'}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        db.quizzes.parts.new({mid: data.insertId, part: 1, first_page: 1, last_page: 3}, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            db.quizzes.new({pid: data.insertId, question: 'What is up?', a: 'My cholesterol', b: 'The sky', c: 'My stocks', answer: 'a'}, (err, data1) => {
              db.quizzes.new({pid: data.insertId, question: 'Another question', a: 'a', b: 'b', c: 'c', answer: 'c'}, (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('done');
                }
              })
            });
          }
        });
      }
    });
  }
});