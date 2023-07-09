const { StatusCodes } = require('http-status-codes');

const {
  getAllWriter,
  createBlog,
  getOneWrittenById,
  deleteBlog,
  getAllParticipant,
  getOneParticipant,
} = require('../../../services/mongoose/writer');

const create = async (req, res, next) => {
  try {
    const result = await createBlog(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllParticipants = async(req, res, next) => {
  try {
    const result = await getAllParticipant(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const index = async (req, res, next) =>{
  try {
    const result = await getAllWriter(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}



const getWrittenByIdParticipant = async (req, res, next) =>{
  try {
    const result = await getOneWrittenById(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const getOneParticipants = async(req, res, next) => {
  try {
    const result = await getOneParticipant(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const deleteOneBlog = async(req, res, next) => {
  try {
    const result = await deleteBlog(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}






module.exports = {
  index,
  create,
  getWrittenByIdParticipant,
  getAllParticipants,
  getOneParticipants,
  deleteOneBlog,
};
