
const Route = require("../model/route");
const { addPickUpAndDropPoints } = require("../controllers/route");

const routeHelper = {
  generateUniqueRouteId: (startLocation, endLocation) => {
    // Function to format city names by removing spaces and converting to lowercase
    const formatLocation = (location) => {
      return location.city.replace(/\s+/g, "").toUpperCase();
    };

    const start = formatLocation(startLocation);
    const end = formatLocation(endLocation);

    return `${start}-${end}`;
  },
  
  pickUpAndDropPoint: async (route) => {
    try {
      //find pickUpandDropPoint from the route
      const checkPickupAndDropPoint = await Route.findById({route})

      return checkPickupAndDropPoint

    } catch (error) {

    }

  }
};
module.exports = routeHelper;
