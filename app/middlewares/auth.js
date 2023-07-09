const { UnauthenticatedError} = require('../errors');
const { isTokenValid } = require('../utils/jwt');


const authenticateParticipant = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    console.log(token);

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const payload = isTokenValid({ token });


    req.participant = {
      email: payload.email,
      lastName: payload.lastName,
      firstName: payload.firstName,
      id: payload.idParticipant,
    };

    next();
  } catch (error) {
    next(error);
  }
};


module.exports = {authenticateParticipant };
