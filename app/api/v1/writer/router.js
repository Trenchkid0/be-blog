const express = require('express');
const router = express();
const { create,
   index, 
   getWrittenByIdParticipant, 
  getWrittenByParticipant,getAllParticipants,getOneParticipants } = require('./controller');
const {
    authenticateParticipant,
  } = require('../../../middlewares/auth');

router.get('/writer',index);
// router.get('/writer/:participants',authenticateParticipant,getWrittenByParticipant); 
router.get('/writer/:id',getWrittenByIdParticipant);
router.post('/writer',authenticateParticipant,create);
// router.get('/writer/:participant',authenticateParticipant,getBlogByParticipant);
router.get('/participants', getAllParticipants);
router.get('/participants/:id', getOneParticipants);


module.exports = router;
