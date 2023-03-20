import React from "react";
import SubNav from "../../utils/SubNav";

import Sidebar from "./Sidebar";
import "../../css/returnToInvestor.css";

function ReturnToInvestor() {
  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar payback="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Pay Back To Investor"></SubNav>
        <div className="broadcast-body">
          <h3>Countdown : 28 days</h3>
          <div className="roi-card">
            <div className="roi-header">
              <table>
                <tr>
                  <th>Pending Payment</th>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </tr>
              </table>
            </div>
            <div className="cardy-body">
              <table>
                <tr>
                  <th>Investor Name :</th>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td>John</td>
                </tr>
                <tr>
                  <th>Contact No :</th>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td>1234567890</td>
                </tr>
                <tr>
                  <th>Address:</th>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td>1234 Main St, New York, NY 10001</td>
                </tr>
                <tr>
                  <th>Amount :</th>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <td>
                    <div class="input-group input-group-outline mb-2 mt-2">
                      <input
                        type="text"
                        id="N"
                        name="N"
                        class="form-control"
                        placeholder="Amount"
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="cardy-footer text-muted text-center">
              <button type="button " className="btn btn-success siza">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnToInvestor;
