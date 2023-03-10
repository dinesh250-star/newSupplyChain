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
    "SELECT * FROM users WHERE public_key = ? && role_status != ?",
    [userAccount, "pending"],
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
  //  insert bid once

  db.query(
    "SELECT * FROM offers WHERE buyer = ? && crop_id = ?",
    [userAccount, id],
    (err, result) => {
      if (result.length == 0) {
        db.query(
          "INSERT INTO offers (buyer,seller,price,crop_id,crop_name,quantity,bid_price,status) VALUES(?,?,?,?,?,?,?,?)",
          [userAccount, seller, price, id, crop, quantity, priceC, "open"],
          (err, result) => {
            if (result) {
              res.send("Successfully Bidded");
            }
          }
        );
      } else {
        res.send("Already bidded");
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
app.post("/paid", (req, res) => {
  const crop_name = req.body.crop_name;
  const qprice = req.body.qprice;
  const lotId = req.body.lotId;
  const buyer = req.body.buyer;
  const seller = req.body.seller;
  const quantity = req.body.quantity;
  db.query(
    "INSERT INTO orders (crop_name,price,crop_id,buyer,seller,quantity,status) VALUES(?,?,?,?,?,?,?)",
    [crop_name, qprice, lotId, buyer, seller, quantity, "no"],
    (err, result) => {
      if (result) {
        db.query(
          "UPDATE  farmer_brodcast SET status = ? WHERE id = ?",
          ["retailer", lotId],
          (err, result) => {
            if (result) {
              db.query(
                "UPDATE  offers SET status = ? WHERE crop_id = ?",
                ["paid", lotId],
                (err, result) => {
                  if (result) {
                    db.query(
                      "UPDATE  insurance SET status = ? WHERE crop_id = ?",
                      ["sold", lotId],
                      (err, result) => {
                        if (result) {
                          res.send("Payment done");
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.send("Unable to update");
            }
          }
        );
      }
    }
  );
});
app.post("/qualityReport", (req, res) => {
  const crop = req.body.crop;
  const quantity = req.body.quantity;
  const samples = req.body.samples;
  const defect = req.body.defect;
  const remarks = req.body.remarks;
  const id = req.body.id;
  db.query(
    "UPDATE  insurance SET status = ? WHERE crop_id = ?",
    ["done", id],
    (err, result) => {
      if (result) {
        db.query(
          "INSERT INTO report (crop_id,sample_size,defective,remark) VALUES(?,?,?,?)",
          [id, samples, defect, remarks],
          (err, result) => {
            if (result) {
              res.send("Successfully Added report");
            }
          }
        );
      } else {
        res.send("Unable to update");
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
app.get("/retailerBrodcast", (req, res) => {
  db.query(
    "SELECT * FROM processor WHERE status = ?",
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
app.get("/orders/:id", (req, res) => {
  const id = req.params["id"];
  db.query("SELECT * FROM orders WHERE seller = ?", [id], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  });
});
app.get("/pendingPayments/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT offers.crop_id,offers.price, offers.seller,offers.bid_price,offers.crop_name,offers.quantity FROM offers JOIN insurance ON offers.crop_id = insurance.crop_id WHERE offers.buyer = ? && insurance.status = ?",
    [id, "done"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/processorPurchases/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM orders WHERE buyer = ? && status = ?",
    [id, "no"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/retailerPurchases/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM retailer WHERE buyer = ? && status = ?",
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
app.get("/processorInterest/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM offers WHERE buyer = ?",
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
app.put("/insure/:id/:crop_id", (req, res) => {
  const id = req.params["id"];
  const crop_id = req.params["crop_id"];
  const name = req.body.name;
  const quantity = req.body.quantity;
  db.query(
    "SELECT * FROM insurance WHERE crop_id = ?",
    [crop_id],
    (err, result) => {
      if (result.length == 0) {
        db.query(
          "UPDATE offers  SET status = ?  WHERE id = ?",
          ["approve", id],

          (err, result) => {
            if (result) {
              db.query(
                "INSERT INTO insurance (crop_id,status,name,quantity) VALUES(?,?,?,?)",
                [crop_id, "insured", name, quantity],
                (err, result) => {
                  if (result) {
                    res.send("Successfull 1");
                  }
                }
              );
            } else {
              res.send(false);
            }
          }
        );
      } else {
        res.send("already insured");
      }
    }
  );
});
app.get("/processorBids/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "SELECT * FROM offers WHERE seller = ? && status = ?",
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
app.get("/qualityC", (req, res) => {
  db.query(
    "SELECT * FROM insurance WHERE status = ?",
    ["insured"],

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
app.get("/report/:lotId", (req, res) => {
  const id = req.params["lotId"];
  db.query(
    "SELECT * FROM report WHERE crop_id = ? ",
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
app.post("/brodcastToRetailer/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.id;
  const product = req.body.product;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    "UPDATE  orders SET status = ? WHERE crop_id = ?",
    ["yes", id],
    (err, result) => {
      if (result) {
        //insert

        db.query(
          "INSERT INTO processor (product_name,crop_id,quantity,price,processor,status) VALUES(?,?,?,?,?,?)",
          [product, id, quantity, price, userAccount, "open"],
          (err, result) => {
            if (result) {
              res.send("Successfully Brodcasted to retailer");
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.post("/brodcastToCustomer/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.brodcaster;
  const price = req.body.price;
  let quantity;
  let product;
  db.query(
    "UPDATE  retailer SET status = ? WHERE crop_id = ?",
    ["yes", id],
    (err, result) => {
      if (result) {
        db.query(
          "SELECT * FROM retailer WHERE crop_id = ?",
          [id],
          (err, result) => {
            if (result) {
              quantity = result[0].quantity;
              product = result[0].product_name;

              db.query(
                "INSERT INTO customer (product_name,crop_id,quantity,price,retailer,status) VALUES(?,?,?,?,?,?)",
                [product, id, quantity, price, userAccount, "open"],
                (err, result) => {
                  if (result) {
                    res.send("Successfully Brodcasted to Customer");
                  }
                }
              );
            } else {
              res.send(false);
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.post("/paidProcessor/:id", (req, res) => {
  const id = req.params["id"];
  const userAccount = req.body.buyer;
  const seller = req.body.seller;
  const product = req.body.product;
  const quantity = req.body.quantity;
  const price = req.body.price;
  db.query(
    "UPDATE  processor SET status = ? WHERE crop_id = ?",
    ["close", id],
    (err, result) => {
      if (result) {
        //insert

        db.query(
          "INSERT INTO retailer (crop_id,product_name,quantity,seller,buyer,status,price) VALUES(?,?,?,?,?,?,?)",
          [id, product, quantity, seller, userAccount, "open", price],
          (err, result) => {
            if (result) {
              res.send("Successfully Bought by retailer");
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.put("/paidUpdate/:lotId", (req, res) => {
  const id = req.params["lotId"];
  db.query(
    "UPDATE  farmer_brodcast SET status = ? WHERE id = ?",
    ["retailer", id],
    (err, result) => {
      if (result) {
        db.query(
          "UPDATE  offers SET status = ? WHERE crop_id = ?",
          ["paid", id],
          (err, result) => {
            if (result) {
              db.query(
                "UPDATE  insurance SET status = ? WHERE crop_id = ?",
                ["sold", id],
                (err, result) => {
                  if (result) {
                    res.send("Payment done");
                    console.log("p");
                  }
                }
              );
            }
          }
        );
      } else {
        res.send("Unable to update");
      }
    }
  );
});
app.delete("/processorBidDelete/:id", (req, res) => {
  const id = req.params["id"];
  db.query(
    "DELETE  FROM offers WHERE id = ?",
    [id],

    (err, result) => {
      if (result) {
        res.send("Successfully Rejected");
      } else {
        res.send("error,Something went wrong");
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is running");
});
