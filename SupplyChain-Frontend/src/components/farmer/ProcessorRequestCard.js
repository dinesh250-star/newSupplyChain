import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dbActions } from "../../store/dbSlice";

function ProcessorRequestCard(props) {
  const { crop, processor, rquantity, qprice, id, crop_id } = props;

  const dispatch = useDispatch();
  const rejectHandler = async (e) => {
    axios
      .delete(`http://localhost:3001/processorBidDelete/${id}`)
      .then((resp) => {
        alert(resp.data);
      });
    dispatch(dbActions.reload());
  };
  const insureHandler = async (e) => {
    axios
      .put(`http://localhost:3001/insure/${id}/${crop_id}`, {
        name: crop,
        quantity: rquantity,
      })
      .then((resp) => {
        alert(resp.data);
      });
    dispatch(dbActions.reload());
  };
  return (
    <div className="col-3 mb-xl-5 mb-4">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder">
              Crop : {crop}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Processor Name :
              </span>
              &nbsp;&nbsp;{processor}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Requested Quantity :
              </span>
              &nbsp;&nbsp;{rquantity}&nbsp;&nbsp;&nbsp;&nbsp;
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
          <div className="row">
            <button
              type="submit"
              name="request"
              class="btn bg-gradient-success btn-lg w-40 ml-3 mr-2 mt-4 text-sm"
              onClick={insureHandler}
              value={id}
            >
              Insure
            </button>
            <button
              type="click"
              name="request"
              class="btn bg-gradient-danger btn-lg w-40 ml-1 mt-4"
              onClick={rejectHandler}
              value={id}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessorRequestCard;
