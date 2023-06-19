const Writer = require('../../api/v1/writer/model');
const Participant = require('../../api/v1/participants/model');

const { BadRequestError, NotFoundError } = require('../../errors');

const { checkingImage } = require('./images');

const getAllWriter = async (req) => {
  const result = await Writer.find({});

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

  await checkingImage(image);


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

  return result;
};

const getWrittenByParticipant = async (req) => {
  const { participant } = req.params;

  const result = await Writer.find({ participant: participant });

  return result;
};

const getOneWritten = async (req) => {
  const { id } = req.params;
  console.log(req.participant.id)

  const result = await Writer.findOne({
    _id: id,
  })


  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

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
// const createCategories = async (req) => {
//   const { name } = req.body;

//   // cari categories dengan field name
//   const check = await Categories.findOne({
//     name,
//     organizer: req.user.organizer,
//   });

//   // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
//   if (check) throw new BadRequestError('kategori nama duplikat');

//   const result = await Categories.create({
//     name,
//     organizer: req.user.organizer,
//   });

//   return result;
// };

// const getOneCategories = async (req) => {
//   const { id } = req.params;

//   const result = await Categories.findOne({
//     _id: id,
//     organizer: req.user.organizer,
//   });

//   if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//   return result;
// };

// const updateCategories = async (req) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   // cari categories dengan field name dan id selain dari yang dikirim dari params
//   const check = await Categories.findOne({
//     name,
//     organizer: req.user.organizer,
//     _id: { $ne: id },
//   });

//   // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
//   if (check) throw new BadRequestError('kategori nama duplikat');

//   const result = await Categories.findOneAndUpdate(
//     { _id: id },
//     { name },
//     { new: true, runValidators: true }
//   );

//   // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
//   if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//   return result;
// };

// const deleteCategories = async (req) => {
//   const { id } = req.params;

//   const result = await Categories.findOne({
//     _id: id,
//     organizer: req.user.organizer,
//   });

//   if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//   await result.remove();

//   return result;
// };

// const checkingCategories = async (id) => {
//   const result = await Categories.findOne({
//     _id: id,
//   });

//   if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//   return result;
// };

module.exports = {
  getAllWriter,
  createBlog,
  getWrittenByParticipant,
  getOneWritten,
  getAllParticipant,
  getOneParticipant,
  // createCategories,
  // getOneCategories,
  // updateCategories,
  // deleteCategories,
  // checkingCategories,
};
