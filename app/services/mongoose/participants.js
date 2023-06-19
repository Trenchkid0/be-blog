const Participant = require('../../api/v1/participants/model');


const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');

const { announcementMail } = require('../mail');
const { checkingImage } = require('./images');



const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role,image } = req.body;

  let result = await Participant.findOne({
    email
  });
  if (result) throw new BadRequestError('email sudah terdaftar');
  result = await Participant.create({
        firstName,
        lastName,
        email,
        password,
        role,
        image,
  })

  await checkingImage(image)

  await announcementMail(email,result)


  delete result._doc.password;
  delete result._doc.otp;

  return result;
};



const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  if (result.status === 'tidak aktif') {
    throw new UnauthorizedError('Akun anda belum aktif');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};






module.exports = {
  signupParticipant,
  signinParticipant,


};