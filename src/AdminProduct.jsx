import React from "react";

export default function AdminProduct(props) {
  let { f } = props;
  let finalprice = f.mrp - (f.mrp * f.discount) / 100;
  let displayPrice = f.qty * finalprice;

  // function handleAdminButtonClick(op) {
  //   props.onAdminButtonClick(op, f);
  // }

  function handleEditButtonClick()
  {
    props.onEditButtonClick(f);
  }

  function handleDeleteButtonClick()
  {
    let ans = window.confirm(
      "Do you really want to delete  -  " + f.name
    );
    if (ans) {
      props.onDeleteButtonClick(f, true);
    } else {
      props.onDeleteButtonClick(f, false);
    } 
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

        <div className="row text-center mx-auto">
          <div className="col-4">
            <button
              className="btn btn-primary btn-block btn-danger "
              onClick={handleEditButtonClick}
            >
              <i className="bi bi-pen"></i>
            </button>{" "}
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary btn-block btn-danger"
              onClick={handleDeleteButtonClick}
            >
              <i className="bi bi-trash"></i>
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
