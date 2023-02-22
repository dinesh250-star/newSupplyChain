import React, { useState } from "react";
import axios from "axios";
function PaymentCard(props) {
  const { name, eprice, requestedQuantity, qprice, lotId } = props;
  const [result, setResult] = useState("");
  const [d, setD] = useState(false);
  let results;
  const showReport = async () => {
    await axios
      .get(`http://localhost:3001/report/${lotId}`)
      .then((response) => {
        results = response.data;
        setResult(results);

        alert(
          `Lot id - ${response.data[0].crop_id}, sample size - ${response.data[0].sample_size}, Defective - ${response.data[0].defective}, Remark - ${response.data[0].remark}`
        );
        // alert(`sample size - ${response.data[0].sample_size}`);
        // alert(`Defective - ${response.data[0].defective}`);
        // alert(`Remark - ${response.data[0].remark}`);
      });
  };
  return (
    <div className="col-3 mb-xl-5 mb-4">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder">
              {name}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Lot ID :
              </span>
              &nbsp;&nbsp;{lotId}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Expected Price :
              </span>
              &nbsp;&nbsp;₹{eprice}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Quantity :
              </span>
              &nbsp;&nbsp;{requestedQuantity}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Quoted Price :
              </span>
              &nbsp;&nbsp;₹{qprice}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div class="text-center mb-1">
            <button
              type="click"
              name="broadcastCrop"
              class="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0"
              onClick={payment}
            >
              Pay ₹{qprice}
            </button>
          </div>
          <div class="text-center mb-1">
            <button
              type="click"
              name="broadcastCrop"
              class="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0"
              onClick={showReport}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
