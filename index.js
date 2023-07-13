const express = require("express");
const env = require("env2")("./.env");
const cors = require("cors");
const app = express();
const { connection } = require("./db.js");
const { UserRouter } = require("./Routes/UserRoutes.js");
const { EmpRouter } = require("./Routes/EmpRoutes.js");
//console.log(process.env.DB_PORT);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// app.get("/", function (req, res) {
//   res.send("Welcome to Mock Backend!");
// });

app.use("/", UserRouter, EmpRouter);

app.listen(process.env.DB_PORT, "localhost", async () => {
  try {
    console.log("listening on port " + process.env.DB_PORT);
    await connection;
    console.log("connected to db", process.env.DB_HOST);
  } catch (err) {
    console.log("error listen", err);
  }
});
