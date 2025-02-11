
import React from "react";
import { useState } from "react";

export default function Ass59Card(props1) {
  let { f } = props1;
  let finalprice = f.mrp - (f.mrp * f.discount) / 100;
  let [product, setProduct] = useState(f);

  function handleChangeButtonClick(event) {
    let op = event.target.id;
    console.log(op);
    let p = { ...product };
    if (op == "+") {
      p.qty++;
    } else if (op == "-") {
      if (p.qty > 0) {
        p.qty--;
      }
    }
    p.totalqty = finalprice * p.qty;
    setProduct(p);
  }

  function handleAddtoCartButtonClick(event) {
    let p = { ...product };
    p.qty = 1;
    p.totalqty = finalprice * p.qty;
    setProduct(p);
  }

  return (
    <div className="col-lg-3 col-sm-12 col-md-6 ">
      <div className="p-2 m-2 mx-auto border border-black border-2 fruit">
        <div>
          <img className="img-fluid" src={"/" + f.image} alt="" />
        </div>
        <div className="h4">
          {f.name}
          <div className="h5">
            {f.discount > 0 ? " ( Discount " + f.discount + " % )" : " "}
          </div>
        </div>
        <div className="h5">
          {f.discount == 0 && (
            <h3>
              Rs. {f.mrp} (per {f.unit} ){" "}
            </h3>
          )}
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
        </div>
        {/* <button className="border border-black">
            <h4 >{f.inStock  ? "Add to Cart" : "Out of Stock"}</h4>
          </button> */}

        {product.qty == 0 && (
          <div>
            <button
              className={
                "m-2 p-3 btn  " + (f.inStock ? "btn-primary" : "btn-secondary")
              }
              onClick={handleAddtoCartButtonClick}
              disabled={f.inStock == false}
            >
              {f.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        )}

        {product.qty != 0 && (
          <div className="row">
            <div className="col-4">
              <button
                className="btn btn-primary btn-block"
                id="-"
                onClick={handleChangeButtonClick}
              >
                -
              </button>{" "}
            </div>
            <div className="col-4">Qnty: {product.qty}</div>
            <div className="col-4">
              <button
                className="btn btn-primary btn-block"
                id="+"
                onClick={handleChangeButtonClick}
              >
                +
              </button>{" "}
            </div>
            <div className="div"> Rs. {product.totalqty}</div>
          </div>
        )}
      </div>
    </div>
  );
}












// import React from "react";
// import { useState } from "react";

// export default function ProductsPage(props) {
//   let { f } = props;
//   let {product} = props;
//   let finalprice = f.mrp - (f.mrp * f.discount) / 100;

//   function handleAddtoCartButtonClick() {
//     props.handleAddtoCartButtonClick();
//   }

//   function handleChangeButtonClick() {
//     props.handleChangeButtonClick();
//   }

//   return (
//     <div className="col-lg-3 col-sm-12 col-md-6 ">
//       <div className="p-2 m-2 mx-auto border border-black border-2 fruit">
//         <div>
//           <img className="img-fluid" src={"/" + f.image} alt="" />
//         </div>
//         <div className="h4">
//           {f.name}
//           <div className="h5">
//             {f.discount > 0 ? " ( Discount " + f.discount + " % )" : " "}
//           </div>
//         </div>
//         <div className="h5">
//           {f.discount == 0 && (
//             <h3>
//               Rs. {f.mrp} (per {f.unit} ){" "}
//             </h3>
//           )}
//           {f.discount != 0 && (
//             <h3>
//               {" "}
//               Rs.{" "}
//               <span className="text-decoration-line-through text-danger">
//                 {" "}
//                 {f.mrp}{" "}
//               </span>{" "}
//               <span className="text-success">{finalprice}</span>
//             </h3>
//           )}
//         </div>
//         {/* <button className="border border-black">
//             <h4 >{f.inStock  ? "Add to Cart" : "Out of Stock"}</h4>
//           </button> */}

//         {product.qty == 0 && (
//           <div>
//             <button
//               className={
//                 "m-2 p-3 btn  " + (f.inStock ? "btn-primary" : "btn-secondary")
//               }
//               onClick={handleAddtoCartButtonClick}
//               disabled={f.inStock == false}
//             >
//               {f.inStock ? "Add to Cart" : "Out of Stock"}
//             </button>
//           </div>
//         )}

//         {product.qty != 0 && (
//           <div className="row">
//             <div className="col-4">
//               <button
//                 className="btn btn-primary btn-block"
//                 id="-"
//                 onClick={handleChangeButtonClick}
//               >
//                 -
//               </button>{" "}
//             </div>
//             <div className="col-4">Qnty: {product.qty}</div>
//             <div className="col-4">
//               <button
//                 className="btn btn-primary btn-block"
//                 id="+"
//                 onClick={handleChangeButtonClick}
//               >
//                 +
//               </button>{" "}
//             </div>
//             <div className="div"> Rs. {product.totalqty}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












