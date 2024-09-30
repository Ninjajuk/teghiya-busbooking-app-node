const validateRequiredFields = (data, requiredFields) => {
    const missingFields = [];
  
    requiredFields.forEach((field) => {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        missingFields.push(field);
      }
    });
  
    return missingFields;
  };
  module.exports = validateRequiredFields;