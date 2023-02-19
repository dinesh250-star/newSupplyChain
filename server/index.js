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
app.post("/offer/:idd", (req, res) => {
  const id = req.params["idd"];
  const cropId = req.body.id;
  const seller = req.body.name;
  const userAccount = req.body.user;
  const crop = req.body.crop;
  const quantity = req.body.quantity;
  const price = req.body.price;
  const priceC = req.body.priceC;
  db.query(
    "INSERT INTO offers (buyer,seller,price,crop_id,crop_name,quantity,bid_price) VALUES(?,?,?,?,?,?,?)",
    [userAccount, seller, price, id, crop, quantity, priceC],
    (err, result) => {
      if (result) {
        res.send("Successfully Bidded");
      }
    }
  );
});
app.post("/farmerbrodcast", (req, res) => {
  const userAccount = req.body.id;
  const crop = req.body.crop;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    "INSERT INTO farmer_brodcast (public_key,crop,quantity,price,status) VALUES(?,?,?,?,?)",
    [userAccount, crop, quantity, price, "open"],
    (err, result) => {
      if (result) {
        res.send("Successfully Brodcasted");
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
app.get("/processorInterest/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM offers WHERE buyer = ?",
    [id],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/farmerbrodcastcall/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM farmer_brodcast WHERE public_key = ? && status = ?",
    [id, "open"],

    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/farmerbrodcastcallprocessor", (req, res) => {
  db.query(
    "SELECT * FROM farmer_brodcast WHERE  status = ?",
    ["open"],

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
