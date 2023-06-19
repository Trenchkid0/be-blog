const express = require('express');
const router = express();
const {
  signup,
  signin,

} = require('./controller');

const { authenticateParticipant } = require('../../../middlewares/auth');

router.post('/auth/signup', signup);
router.post('/auth/signin', signin);


module.exports = router;
