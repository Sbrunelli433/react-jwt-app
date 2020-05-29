const fs = require('fs');
const express = require('express');
const router = express.Router();
const db = require('../db');
const modules = db.modules;


const upload_dir = './public/uploads';
if (!fs.existsSync(upload_dir)) {
  fs.mkdirSync(upload_dir);
}

// const formidable = require('formidable');
const multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });

/* modules */
router.get('/', (req, res, next) => {
  modules.list((err, data) => {
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
  modules.new(req.body, (err, data, fields) => {
    if (err) {
      console.log(err);
      // handle duplicate module error
      if (err.errno = 1062) {
        res.writeHead(400);
        res.end('Module already exists');
      } else {
        res.writeHead(500);
        res.end();
      }
    } else {
      res.writeHead(201);
      res.end(JSON.stringify({id: data.insertId}));
    }
  });
});

router.post('/upload', upload.single('pdf'), (req, res, next) => {
  // note: probably want to set limits on uploads

  // Commented out part was using formidable.  Currently using multer
  //
  // var form = new formidable.IncomingForm();
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
  //   res.json({ fields, files });
  // });
  res.writeHead(201);
  res.end(JSON.stringify({src: `/uploads/${req.file.filename}`}));
});

router.patch('/', (req, res, next) => {
  modules.update(req.body, (err, data) => {
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
  modules.delete(req.body, (err, data) => {
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

/* module_categories */
router.get('/categories', (req, res, next) => {
  modules.categories.list((err, data) => {
    if (err) {
      cosnole.log(err);
      res.writeHead(500);
      res.end();
    } else {
      res.json(data);
    }
  });
});

router.post('/categories', (req, res, next) => {
  modules.categories.new(req.body, (err, data) => {
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

router.patch('/categories', (req, res, next) => {
  modules.categories.update(req.body, (err, data) => {
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

router.delete('/categories', (req, res, next) => {
  modules.categories.delete(req.body, (err, data) => {
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