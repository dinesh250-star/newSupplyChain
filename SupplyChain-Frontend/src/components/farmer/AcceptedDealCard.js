import React from "react";

function AcceptedDealCard(props) {
  const { crop, lotId, price, buyer } = props;

  return (
    <div className="col-3 mb-xl-5 mb-4">
      <div className="card">
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Crop Name :
              </span>
              &nbsp;&nbsp;{crop}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                id :
              </span>
              &nbsp;&nbsp;{lotId}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                price :
              </span>
              &nbsp;&nbsp;{price}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>

          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                buyer :
              </span>
              &nbsp;&nbsp;{buyer}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Received Amount :
              </span>
              &nbsp;&nbsp;₹ {price}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptedDealCard;
