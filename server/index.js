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
  db.query(
    "SELECT * FROM users WHERE public_key = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
        res.send(result[0].role);
      } else {
        res.send("Register yourself or wait for approval");
      }
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
              res.send("Successfully regsitered. Now wait for approval");
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
app.delete("/reject/:id", (req, res) => {
  const id = req.params["id"];
  console.log(id);
  db.query("DELETE  FROM users WHERE id = ?", [id], (err, result) => {
    if (result) {
      res.send("Deleted Successfully");
    } else {
      res.send("Unable to Delete");
    }
  });
});
app.put("/approve/:id", (req, res) => {
  const id = req.params["id"];
  console.log(id);
  db.query(
    "UPDATE  users SET role_status = ? WHERE id = ?",
    ["approved", id],
    (err, result) => {
      if (result) {
        res.send("Successfully Updated");
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is running");
});
