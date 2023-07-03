require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {executeQuery, closeConnection} = require("../config/database");
const routeV1 = require("./routes/index");

const app = express();

const { NODE_PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use("/v1", routeV1);

app.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM admin";
    const execute = await executeQuery(query);
    console.log("Controller: ", execute)
    // closeConnection();
    res.send(execute);
  } catch (error) {
    throw error;
  }
});

app.listen(NODE_PORT, () => {
  console.log(`Server running at port ${NODE_PORT}`);
});
