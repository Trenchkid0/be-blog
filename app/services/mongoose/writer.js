const Writer = require('../../api/v1/writer/model');
const Participant = require('../../api/v1/participants/model');

const { BadRequestError, NotFoundError } = require('../../errors');

const { checkingImage } = require('./images');

const getAllWriter = async (req) => {
  console.log(req.query)
  const {keyword} = req.query;
  let condition = {};


  if (keyword) {
    condition = {...condition, title: { $regex: keyword, $options: 'i' } };
  }

  const result = await Writer.find(condition)
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




const getOneWrittenById = async (req) => {
  const { id } = req.params;

  const result = await Writer.find ({
    _id: id,
  })

  .populate({ path: 'image', select: '_id name' })
  .populate({ 
    path: 'participant', 
    select: '_id firstName role image',
    populate: { path: 'image', select: '_id  name' },
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

const deleteBlog = async (req) => {
  const { id } = req.params;

  const result = await Writer.findOne({
    _id: id,
    participant: req.participant.id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  await result.remove();

  return result;
};

module.exports = {
  getAllWriter,
  createBlog,
  getOneWrittenById,
  getAllParticipant,
  getOneParticipant,
  deleteBlog,
};
