import React from "react";

export default function Product(props) {
  let { f } = props;
  let finalprice = f.mrp - (f.mrp * f.discount) / 100;
  let displayPrice = f.qty * finalprice;

  function handleChangeButtonClick(op) {
    props.onChangeButtonClick(op, f);
  }

  return (
    <div className="col-lg-3 col-sm-12 col-md-6 col-xl-3">
      <div className="p-2 m-2  border border-black border-2 fruit card">
        <div className="container m-3">
          <img className="img-fluid " src={"/" + f.image} alt="Not Available" />
          <div className="top-left m-3">
            {f.discount > 0 ? " ( Discount " + f.discount + " % )" : ""}
          </div>
        </div>
        <div className="h4">{f.name}</div>
        <div className="h5">
          {f.discount == 0 && <h4>Rs. {f.mrp}</h4>}
          {f.discount != 0 && (
            <h3>
              {" "}
              Rs.{" "}
              <span className="text-decoration-line-through text-danger">
                {" "}
                {f.mrp}{" "}
              </span>{" "}
              <span className="text-success">{finalprice}</span>
            </h3>
          )}
          <h5>(per {f.unit} ) </h5>
        </div>

        {f.qty == 0 && (
          <div>
            <button
              className={
                "m-2 p-3 btn " + (f.inStock == "yes" ? "btn-danger" : "btn-secondary")
              }
              onClick={() => {
                handleChangeButtonClick("addtocart");
              }}
              disabled={f.inStock == "no"}
            >
              {f.inStock == "yes" ? "Add to Cart" : "Out of Stock"}
              
            </button>
          </div>
        )}
        {f.qty != 0 && (
          <div className="row">
            <div className="col-4">
              <button
                className="btn btn-primary btn-block btn-danger "
                id="-"
                onClick={() => {
                  handleChangeButtonClick("-");
                }}
              >
                -
              </button>{" "}
            </div>
            <div className="col-4">Qnty: {f.qty}</div>
            <div className="col-4">
              <button
                className="btn btn-primary btn-block btn-success"
                id="+"
                onClick={() => {
                  handleChangeButtonClick("+");
                }}
              >
                +
              </button>{" "}
            </div>
            <div> Rs. {displayPrice} </div>
          </div>
        )}
      </div>
    </div>
  );
}
