app.get("/api/ifsc/:code", async (req, res) => {
  const ifscCode = req.params.code;

  try {
    const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Invalid IFSC code" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
