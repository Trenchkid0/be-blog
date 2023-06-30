const { StatusCodes } = require('http-status-codes');

const {
  getAllWriter,
  createBlog,
  // getWrittenByParticipant,
  getOneWritten,
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


const getWrittenByid = async (req, res, next) =>{
  try {
    const result = await getOneWritten(req);

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



module.exports = {
  index,
  create,
  // getBlogByParticipant,
  getWrittenByid,
  getAllParticipants,
  getOneParticipants,
};
