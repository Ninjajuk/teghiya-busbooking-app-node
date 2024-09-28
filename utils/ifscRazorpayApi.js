const axios = require('axios')
  
  
  exports.checkIFSCCode=  async (req, res) => {
  const ifscCode = req.params.code;
  // console.log("IFSC Code:", ifscCode);  // Check if the correct code is received


  try {
    const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
    res.json({data:response.data});
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Invalid IFSC code" });
    } else {
      res.status(500).json({ error: "Internal Server Error" ,error:error});
    }
  }
}

