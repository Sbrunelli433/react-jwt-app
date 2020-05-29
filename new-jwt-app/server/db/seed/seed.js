const faker = require('faker');
const mysql = require('mysql');
const config = require('../config.js');
const pool = mysql.createPool(config);
const bcrypt = require('bcrypt');

const userList = [];

const db = require('../index.js');
const roles = Object.keys(db.users.roles);

const genUsers = function(err, password) {
  for (var i = 0; i < roles.length; i++) {
    entry = {};
    entry.username = roles[i];
    entry.role = roles[i];
    entry.first_name = faker.name.firstName();
    entry.last_name = faker.name.lastName();
    entry.password = password;
    entry.address = faker.address.streetAddress();
    entry.phone = faker.phone.phoneNumberFormat();
    entry.city = faker.address.city();
    entry.state = faker.address.state();
    entry.zip = faker.address.zipCode();
    entry.newsletter = Math.random() >= 0.5;

    userList.push(entry);
  }

  for (var i = 0; i < 100; i++) {
    var entry = {};
    entry.username = faker.internet.userName();
    entry.first_name = faker.name.firstName();
    entry.last_name = faker.name.lastName();
    entry.password = password;
    entry.address = faker.address.streetAddress();
    entry.phone = faker.phone.phoneNumberFormat();
    entry.city = faker.address.city();
    entry.state = faker.address.state();
    entry.zip = faker.address.zipCode();
    entry.newsletter = Math.random() >= 0.5;
    entry.role = roles[Math.floor(Math.random() * roles.length)];

    userList.push(entry);
  }

  for (var i = 0; i < userList.length; i++) {
    pool.query('INSERT INTO users (username, first_name, last_name, password, address, phone, city, state, zip, newsletter, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [userList[i].username, userList[i].first_name, userList[i].last_name, userList[i].password, userList[i].address, userList[i].phone, userList[i].city, userList[i].state, userList[i].zip, userList[i].newsletter, userList[i].role], (err, data) => {
      if(err){console.log(err)}
    });
  }
}

const generateCategories = function(i = 1, cb) {
  if (i === 6) {
    cb()
  } else {
    db.modules.categories.new({
      name: `category ${i + 1}`
    }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        generateCategories(i + 1, cb)
      }
    });
  }
}

const generateModules = function() {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 4; j++) {
      db.modules.new({name: `module${i}_${j}`,
                      mcid: i,
                      src: `/module${i}_${j}`}, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (i === 5 && j === 3) { 
          console.log('done')
        }
      });
    }
  }
}

bcrypt.hash('password', 12, genUsers);
generateCategories(1, generateModules);