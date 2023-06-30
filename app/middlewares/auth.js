const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');


const authenticateParticipant = async (req, res, next) => {
  try {
    let token;
    // check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new UnauthenticatedError('Authentication invalid');
    }

    const payload = isTokenValid({ token });
    console.log(payload.email)
    // Attach the user and his permissions to the req object
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
