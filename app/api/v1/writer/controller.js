const { StatusCodes } = require('http-status-codes');

const {
  getAllWriter,
  createBlog,
  getWrittenByParticipant,
  getOneWritten,
  getAllParticipant,
  getOneParticipant,
  // getOneCategories,
  // updateCategories,
  // deleteCategories,
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

const getBlogByParticipant = async (req, res, next) =>{
  try {
    const result = await getWrittenByParticipant(req);

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



// const find = async (req, res, next) => {
//   try {
//     const result = await getOneCategories(req);

//     res.status(StatusCodes.OK).json({
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     const result = await updateCategories(req);

//     res.status(StatusCodes.OK).json({
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// const destroy = async (req, res, next) => {
//   try {
//     const result = await deleteCategories(req);
//     res.status(StatusCodes.OK).json({
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  index,
  create,
  getBlogByParticipant,
  getWrittenByid,
  getAllParticipants,
  getOneParticipants,
  // find,
  // update,
  // destroy,
  // create,
};
