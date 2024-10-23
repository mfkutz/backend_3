import errors from "../utils/errors/dictionaty.errors.js";

function errorHandler(error, req, res, next) {
  // console.log(error);
  const { internalServerError } = errors;
  return res
    .status(error.statusCode || internalServerError.statusCode)
    .json({ message: error.message || internalServerError.message });
}

export default errorHandler;
