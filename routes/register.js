var router = require('express').Router();

router.get('/', (req, res) => {
  res.render('./register.ejs');
});

module.exports = router;
