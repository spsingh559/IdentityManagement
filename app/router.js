var router = require('express').Router();

router.use('/user', require('./webserver/api/User/User.router'));
router.use('/task', require('./webserver/api/Task/Task.router'));

exports = module.exports = router;
