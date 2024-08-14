const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 8008;
const app = express();

const mainRouter = require("./routes");
app.use(express.json());
app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`Server started at: http://localhost:${port}`);
});

