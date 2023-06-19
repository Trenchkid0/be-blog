const {
  signupParticipant,
  signinParticipant,
} = require('../../../services/mongoose/participants');

const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const signin = async (req, res, next) => {
  try {
    const result = await signinParticipant(req);

    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (err) {
    next(err);
  }
};



module.exports = {
  signup,
  signin,

};
