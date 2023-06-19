const express = require('express');
const router = express();
const { create, index, getBlogByParticipant, getWrittenByid,getAllParticipants,getOneParticipants } = require('./controller');
const {
    authenticateUser,
    authorizeRoles,
    authenticateParticipant,
  } = require('../../../middlewares/auth');

router.get('/writer',index);
router.get('/writer/:id',authenticateParticipant,getWrittenByid); 
router.post('/writer',authenticateParticipant,create);
router.get('/writer/:participant',authenticateParticipant,getBlogByParticipant);
router.get('/participants', getAllParticipants);
router.get('/participants/:id', getOneParticipants);

// router.get('/categories/:id',find);
// router.put('/categories/:id', update);
// router.delete('/categories/:id',destroy);
// router.post('/categories',create);

module.exports = router;
