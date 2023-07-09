const express = require('express');
const router = express();
const { create,
   index, 
   getWrittenByIdParticipant,
   getAllParticipants,
   deleteOneBlog,
   getOneParticipants,
  } = require('./controller');
const {
    authenticateParticipant,
  } = require('../../../middlewares/auth');

router.get('/writer',index);
router.get('/writer/:id',getWrittenByIdParticipant);
router.post('/writer',authenticateParticipant,create);
router.get('/participants', getAllParticipants);
router.get('/participants/:id', getOneParticipants); 
router.delete('/writer/:id',authenticateParticipant,deleteOneBlog); 


module.exports = router;
