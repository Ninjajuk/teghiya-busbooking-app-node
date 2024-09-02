const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hi Samsu! How are you?");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
