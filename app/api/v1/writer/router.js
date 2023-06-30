const express = require('express');
const router = express();
const { create,
   index, 
  //  getBlogByParticipant, 
   getWrittenByid,getAllParticipants,getOneParticipants } = require('./controller');
const {
    authenticateUser,
    authorizeRoles,
    authenticateParticipant,
  } = require('../../../middlewares/auth');

router.get('/writer',index);
router.get('/writer/:participants',authenticateParticipant,getWrittenByid); 
router.post('/writer',authenticateParticipant,create);
// router.get('/writer/:participant',authenticateParticipant,getBlogByParticipant);
router.get('/participants', getAllParticipants);
router.get('/participants/:id', getOneParticipants);


module.exports = router;
