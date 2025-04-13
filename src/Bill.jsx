export default function Bill(props) {
  let { cartItems } = props;
  let {price} = props;
  let {name} = props;
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      {
        <div>
          <div className="carttext w-25">
            <a href="#">Share</a> Bill on WhatsApp
          </div>

          <div className="bill"
          >
            <div className=" mx-auto p-2 pb-1 pt-2 my-auto h5 mycontainer ">
              || Shree ||
            </div>
            <div className="h3"> Laxmi Fruit Shop </div>
            <div className="h5">220 , Market Yard , Pune - 411009</div>
            <div className="text-end pe-5 h6">Date: {currentDate} </div>
            <div className="h5">Customer Name : {name}</div>

            <div className="row">
              <div className="col-4 h5">Product</div>
              <div className="col-4 h5">Rate</div>
              <div className="col-2 h5">Quantity</div>
              <div className="col-2 h5">Total</div>
            </div>

            {cartItems.map((e, index) => {
              return (
                <div className="row">
                  <div className="col-4 text-start ps-5">{`${index+1}) ${e.name}`}</div>
                  <div className="col-4">
                    <div className="">
                        Rs.{" "}
                        <span className="text-decoration-line-through ">
                          {e.mrp}{" "}
                        </span>{" "}
                        <span className="">{e.finalprice}</span>
                      </div></div>
                  <div className="col-2">{e.qty} {e.unit}</div>
                  <div className="col-2">{e.qty * e.finalprice}</div>
                  
                </div>
              );
            })}

            <div className="row">
              <div className="col-8 text-end h5">Grand Total : </div>
              <div className="col-4 text-end pe-5 h5">Rs. {price} </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
