const createTokenParticipant = (participant) => {
  
  return {
    lastName: participant.lastName,
    idParticipant: participant._id,
    firstName: participant.firstName,
    email: participant.email,
    profile:participant.image?.name,
  };
  
};

module.exports = {createTokenParticipant };
