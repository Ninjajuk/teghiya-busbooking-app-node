const routeHelper = {
  generateUniqueRouteId: async (startLocation, endLocation) => {
    const start = `${startLocation.city}-${startLocation.state}`;
    const end = `${endLocation.city}-${endLocation.state}`;
    return `${start}--${end}`;
  },
};
module.exports = routeHelper;
