require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routeV1 = require("./routes/index");
const httpStatus = require("http-status");
const CustomError = require("./config/customError");

const app = express();

const { NODE_PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());

app.use("/v1", routeV1);

app.response.sendWrapped = function (
  message,
  statusCode = httpStatus.OK,
  data
) {
  return this.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
};

app.use((req, res, next) => {
  res.sendWrapped("Sorry can't find that!", httpStatus.NOT_FOUND);
});

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({
      status: err.statusCode,
      message: err.message,
    });
  } else {
    res.sendWrapped(err.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
});

app.listen(NODE_PORT, () => {
  console.log(`Server running at port ${NODE_PORT}`);
});
