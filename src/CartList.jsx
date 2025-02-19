export default function CartList(props) {
  let { view } = props;
  let { cartItems } = props;
  return (
    <>
      {view == "CartList" && (
          <div className="row">
            {cartItems.forEach((e, index) => {
              {<div className="mx-auto border border-black ll">
                <div className="col-3">{e.name}</div> 
                <div className="col-3 ">{e.qty} </div>
                {console.log(e.name)}
                {console.log(e.qty)}
                </div>}
            })}
          </div>
      )}
    </>
  );
}
