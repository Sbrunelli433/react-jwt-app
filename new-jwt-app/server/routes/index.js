var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/loginuser', function(req, res, next) {
//  if(req.session.user){
//      res.json(req.session.user);
//  } else {
//    res.json("no user");
//  }
// });

router.get('/backtest', function(req, res, next) {
  res.json("back test response");
})

module.exports = router;