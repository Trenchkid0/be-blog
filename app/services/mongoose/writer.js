const Writer = require('../../api/v1/writer/model');
const Participant = require('../../api/v1/participants/model');

const { BadRequestError, NotFoundError } = require('../../errors');

const { checkingImage } = require('./images');

const getAllWriter = async (req) => {
  const result = await Writer.find({})
  .populate({ path: 'image', select: '_id name' })
  .populate({ 
    path: 'participant', 
    select: '_id firstName role image',
    populate: { path: 'image', select: '_id  name' },
  })


  return result;
};

const createBlog = async (req) => {
  const {
    image,
    topic,
    date,
    title,
    deskripsi,
    content,
  } = req.body;

 
  const check = await Writer.findOne({ title });

  if (check) throw new BadRequestError('judul acara sudah terdaftar');

  console.log(req.participant)

  

  const result = await Writer.create({
    image,
    topic,
    date,
    title,
    deskripsi,
    content,
    participant: req.participant.id,
  });

  await checkingImage(image);

  return result;
};

// const getWrittenByParticipant = async (req) => {
//   const { participant } = req.params;
//   console.log(req.participant.id)

//   const result = await Writer.findOne({
//     participant: participant,
//   })
    
//   if (!result) throw new NotFoundError(`Tidak ada blog dengan id :  ${id}`);

//   return result;
// };

const getOneWritten = async (req) => {
  const { participants } = req.params;
  // console.log(req.participant.id)

  const result = await Writer.findOne({
    participant: participants,
  })


  if (!result) throw new NotFoundError(`Tidak ada dengan id :  ${id}`);

  return result;
};

const getAllParticipant = async (req) => {
  const result = await Participant.find({})
  

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  return result;
};


const getOneParticipant = async (req) => {
  const { id } = req.params;
  const result = await Participant.findOne({ _id: id })

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllWriter,
  createBlog,
  // getWrittenByParticipant,
  getOneWritten,
  getAllParticipant,
  getOneParticipant,

};
