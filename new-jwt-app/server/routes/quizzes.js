const express = require('express');
const router = express.Router();
const quizzes = require('../db/quizzes.js');

/* quizzes */
router.get('/', (req, res, next) => {
  quizzes.list((err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.json(data);
    }
  });
});

router.post('/', (req, res, next) => {
  quizzes.new(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(201);
      res.end(JSON.stringify({id: data.insertId}));
    }
  });
});

router.patch('/', (req, res, next) => {
  quizzes.update(req.body, (err, data) => {
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

router.delete('/', (req, res, next) => {
  quizzes.delete(req.body, (err, data) => {
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

router.get('/pid/:pid', (req, res, next) => {
  // read all quiz questions given a part id
  quizzes.readPart(req.params.pid, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.json(data);
    }
  });
});

/* quiz_parts */

router.get('/parts', (req, res, next) => {
  quizzes.parts.list((err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.json(data);
    }
  });
});

router.post('/parts', (req, res, next) => {
  quizzes.parts.new(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(201);
      res.end(JSON.stringify({id: data.insertId}));
    }
  });
});

router.patch('/parts', (req, res, next) => {
  quizzes.parts.update(req.body, (err, data) => {
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

router.delete('/parts', (req, res, next) => {
  quizzes.parts.delete(req.body, (err,data) => {
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

router.get('/parts/:mid', (req, res, next) => {
  // given module id, list quiz parts
  quizzes.parts.readMod(req.params.mid, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
