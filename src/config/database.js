require("dotenv").config();
const mysql = require("mysql2/promise");
const CustomError = require("./customError");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Create a connection pool
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: "ss",
});

const executeQuery = async (query, params) => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Konek ke database");

    const [rows] = await connection.query(query);
    console.log("Eksekusi query: ", rows);

    return rows;
  } catch (error) {
    console.log("Gagal koneksi ke database");
    throw new CustomError(error.message, 500);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
      console.log("Connection release");
    }
  }
};

const closeConnection = () => {
  pool.end();
  console.log("Connection closed");
};

module.exports = {
  executeQuery,
  closeConnection,
};
