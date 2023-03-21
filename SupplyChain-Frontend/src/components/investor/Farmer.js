import React, { useState, useEffect } from "react";
import block from "../../images/logo-ct.png";
import SubNav from "../../utils/SubNav";
import InvestorSidebar from "./InvestorSidebar";
import qr from "../../images/qr.png";
import "../../css/farmer.css";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Farmer(props) {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const location = useLocation();
  const seller = location.state.user;
  const reload = useSelector((state) => state.db.reload);
  const changeView = () => {
    navigate("/investor/farmstatus");
  };
  console.log(seller);
  let results;
  useEffect(() => {
    axios.get(`http://localhost:3001/history/${seller}`).then((response) => {
      results = response.data;
      setResult(results);
      console.log(response.data);
    });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <tr>
        <td></td>
        <td className="farmer-row">
          <span className="badge bg-success">{d.id}</span>
        </td>
        <td className="farmer-row">
          <span className="badge bg-success">{d.crop_name}</span>
        </td>
        <td className="farmer-row">
          <span className="badge bg-success">{d.price}</span>
        </td>
        <td className="farmer-row">
          <span className="badge bg-warning">{d.buyer}</span>
        </td>
        <td className="farmer-row">
          <span className="badge bg-danger">{d.quantity}</span>
        </td>
      </tr>
    );
  });
  return (
    <div className="home-body">
      <div className="left-body">
        <InvestorSidebar farmb="1"></InvestorSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Farmer"></SubNav>
        <div className="broadcast-body">
          <Modal></Modal>
          <div className="farmer-table">
            <table
              className="table table-striped data-table"
              cellSpacing={0}
              cellPadding={0}
            >
              <thead>
                <tr>
                  <th>History</th>
                  <th>id</th>
                  <th>name</th>
                  <th>price</th>
                  <th>buyer</th>
                  <th>quantity</th>
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Farmer;
