module.exports.sendErrorHandler = (errorCode, req) => {
  let path = req.originalUrl; //get the path of the request
  // req.log.info("Error at", req.originalUrl);
  console.log("Error at", req.originalUrl);
  let errorResponse = handleErrorByAPI(errorCode, path); // return the error object
  // req.log.info("Error at", path, "..", errorResponse);
  console.log("Error at", path, "..", errorResponse);
  return errorResponse;
};

const handleErrorByAPI = (errorCode, path) => {
  const pathArray = path.split("/");

 // const api = pathArray[3].split("?")[0]; // error response not occured properly if more subroute passed so changed to below

 // Check for length to avoid accessing undefined elements
const api = pathArray.length > 0 ? pathArray[pathArray.length - 1].split("?")[0] : null;

  console.log('api', api)
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
    case "getRouteById": {
      handlegetRouteById(errorCode, response);
      break;
    }
    case "addNewBus": {
      handleaddNewBus(errorCode, response);
      break;
    }
    case "searchBus": {
      handleBusSearch(errorCode, response);
      break;
    }
    case "getScheduleByDateAndRoute": {
      handlegetScheduleByDateAndRoute(errorCode, response);
      break;
    }
    case "manualSchedule": {
      handlemanualSchedule(errorCode, response);
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
const handlegetRouteById = (errorCode, response) => {
  switch (errorCode) {
    case "101": {
      response.reason = "routeId is required and should not be empty";
      break;
    }
    case "102": {
      response.reason = "Route does not exists";
      break;
    }
    case "103": {
      response.reason = "Does not find the Bus with the given Route ";
      break;
    }
  }
};


const handleaddNewBus = (errorCode, response) => {
  switch (errorCode) {
    case "55": {
      response.reason = "operatorName is required";
      break;
    }
    case "56": {
      response.reason = "Same Bus Number is already present. busNumber should be unique";
      break;
    }

  }
};

const handleBusSearch = (errorCode, response) => {
  switch (errorCode) {
    case "50": {
      response.reason = "routeName and dateOfJourney required";
      break;
    }
    case "51": {
      response.reason = "The given routeName does not exist in the database.";
      break;
    }
    case "52": {
      response.reason = "Not available route for this date";
      break;
    }
    case "101": {
      response.reason = "Route Name is required and should not be empty";
      break;
    }
    case "102": {
      response.reason = "Route does not exist";
      break;
    }
    case "103": {
      response.reason = "Does not find the Bus in this date";
      break;
    }
    case "104": {
      response.reason = "Error occured searching Bus";
      break;
    }
  }
};

const handlegetScheduleByDateAndRoute = (errorCode, response) => {
  switch (errorCode) {
    case "50": {
      response.reason = "routeName and dateOfJourney required";
      break;
    }
    case "51": {
      response.reason = "The given routeName does not exist in the database.";
      break;
    }
    case "52": {
      response.reason = "Not available route for this date";
      break;
    }

  }
};

const handlemanualSchedule = (errorCode, response) => {
  switch (errorCode) {
    case "53": {
      response.reason = "Bus number is already assigned to this route";
      break;
    }
    case "54": {
      response.reason = "Bus number is already assigned to another route on this date.";
      break;
    }

  }
};
