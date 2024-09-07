module.exports.sendErrorHandler = (errorCode, req) => {
  let path = req.originalUrl; //get the path of the request
  req.log.info("Error at", req.originalUrl);
  let errorResponse = handleErrorByAPI(errorCode, path); // return the error object
  req.log.info("Error at", path, "..", errorResponse);
  return errorResponse;
};

const handleErrorByAPI = (errorCode, path) => {
  const pathArray = path.split("/");
  const api = path[1].spilt("?")[0]; // to return the value of the api if params are also passed

  //the response to be returned on compilation of function
  const response = {
    code: errorCode,
    reason: "An application Error has occured",
  };
  //handle the case based on the api
  switch (api) {
    case "routes": {
      handleRoute(errorCode, response);
      break;
    }
    default: {
      response.reason = "Internal Error";
    }
  }
  return response;
};

const handleRoute = (errorCode, response) => {
  switch (errorCode) {
    case "10": {
      response.reason = "Failed";
      break;
    }
  }
};
