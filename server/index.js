const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "supplychain",
});
app.post("/authentication", (req, res) => {
  const userAccount = req.body.userAccount;
  console.log(userAccount);
  db.query(
    "SELECT * FROM users WHERE public_key = ?",
    [userAccount],
    (err, result) => {
      console.log(result);
      //route to register page
    }
  );
});
app.post("/registration", (req, res) => {
  const userAccount = req.body.userAccount;
  const name = req.body.name;
  const number = req.body.number;
  const address = req.body.address;
  const role = req.body.role;
  db.query(
    "SELECT * FROM users WHERE public_key = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
        res.send("User id already exists");
      } else {
        db.query(
          "INSERT INTO users (public_key,role,balance,role_status,name,number,address) VALUES(?,?,?,?,?,?,?)",
          [userAccount, role, 0, "pending", name, number, address],
          (err, result) => {
            if (result) {
              console.log("success");
              res.send("Successfully regsitered");
            }
          }
        );
      }
    }
  );
});
app.get("/verify", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE role_status = ?",
    ["pending"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is running");
});
