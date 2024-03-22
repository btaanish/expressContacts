import { constants } from '../constants.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  let response = {
    title: "",
    message: err.message,
    stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
  };

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.title = "Validation Failed";
      break;
    case constants.NOT_FOUND:
      response.title = "Not Found";
      break;
    case constants.UNAUTHORIZED:
      response.title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      response.title = "Forbidden";
      break;
    case constants.SERVER_ERROR:
      response.title = "Server Error";
      break;
    default:
      console.log("No specific error handling case matched. Defaulting.");
      response.title = "Error";
      break;
  }

  res.json(response);
};

export default errorHandler;
