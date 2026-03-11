const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", schoolRoutes);

app.listen(3333, () => {
  console.log("Server running on port 3333");
});