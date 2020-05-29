DROP DATABASE IF EXISTS db_modine_hvacr;
CREATE DATABASE IF NOT EXISTS db_modine_hvacr;
USE db_modine_hvacr;


CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(64) UNIQUE NOT NULL,
  first_name VARCHAR(64) NOT NULL,
  last_name VARCHAR(64),
  password VARCHAR(128),
  address VARCHAR(128),
  phone VARCHAR(32),
  city VARCHAR(32),
  state VARCHAR(32),
  zip VARCHAR(32),
  newsletter BOOLEAN DEFAULT 0,
  role VARCHAR(32),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  points INTEGER DEFAULT 0 
);

CREATE TABLE module_categories(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) UNIQUE NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modules(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) UNIQUE NOT NULL,
  mcid INTEGER,
  src VARCHAR(128),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mcid) REFERENCES module_categories(id) ON DELETE CASCADE 
);


CREATE TABLE user_progress(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  uid INTEGER, 
  topic VARCHAR(64),
  src VARCHAR(128),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_parts (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  mid INTEGER,
  part INTEGER,
  first_page INTEGER,
  last_page INTEGER,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mid) REFERENCES modules(id)
);

CREATE TABLE quizzes(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  pid INTEGER,
  question VARCHAR(512),
  a VARCHAR(128),
  b VARCHAR(128),
  c VARCHAR(128),
  d VARCHAR(128),
  e VARCHAR(128),
  answer CHAR(1),
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pid) references quiz_parts(id) ON DELETE CASCADE
);