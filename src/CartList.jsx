export default function CartList(props) {
  let { view } = props;
  let { cartItems } = props;

  // let {cartMessage} = props;
  // let {count} = count;

  function handleChangeButtonClick(op, e) {
    
    props.onChangeButtonClick(op, e);
  }

  function handleBackButtonClick() {
    props.onBackButtonClick();
  }

  function handleBuyButtonClick() {
    props.onBuyButtonClick();
  }

  // function handleStartButtonClick() {
  //   props.onStartButtonClick();
  // }

  // function proceed(e) {
  //   props.onProceed(e);
  // }

  return (
    <>
      <>
        <div className="mb-1 p-2  carttext w-25">
          Proceed to{" "}
          <a
            href="#"
            // onClick={proceed}
            onClick={handleBuyButtonClick}
          >
            Buy.
          </a>
        </div>
        <div className="mb-1 p-2 carttext w-25">
          <a href="#" onClick={handleBackButtonClick}>
            Back
          </a>{" "}
          to Shopping.
        </div>

        <div className="row p-2 mt-2 m-5 ">
          {cartItems.map((e, index) => {
            return (
              // <div key={index} className="mx-auto border border-black m-2 ll">
              <div className="m-2 p-2 border border-black adminform ll">
                <div className="row ">
                  <div className="col-6 text-start ps-5">{`${index + 1})  ${
                    e.name
                  }`}</div>
                  <div className="col-6 text-end pe-5">
                    {e.discount == 0 && <h4>Rs. {e.mrp}</h4>}
                    {e.discount != 0 && (
                      <h4>
                        Rs.{" "}
                        <span className="text-decoration-line-through text-danger">
                          {e.mrp}{" "}
                        </span>{" "}
                        <span className="text-success">{e.finalprice}</span>
                      </h4>
                    )}
                  </div>
                </div>
                <div className="row ">
                  <div className="col-6 text-start ps-5 ">
                    <button
                      className="minusbutton me-4 btn btn-danger"
                      onClick={() => {
                        handleChangeButtonClick("-", e);
                      }}
                    >
                      -
                    </button>
                    {e.qty}
                    <button
                      className="plusbutton ms-4 btn btn-success"
                      onClick={() => {
                        handleChangeButtonClick("+", e);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-6 text-end pe-5 ">
                    Rs. {e.qty * e.finalprice}
                  </div>
                </div>
              </div>
            );
            // }
          })}
        </div>
      </>
      {/* )} */}
    </>
  );
}
