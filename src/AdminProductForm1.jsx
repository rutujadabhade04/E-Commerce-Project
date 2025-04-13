import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import fieldValidate from "./FormValidations.jsx";

export default function AdminProductForm1(props) {
  let emptyProduct = {
    name: "",
    mrp: 0,
    discount: 0,
  };

  let [product, setProduct] = useState(emptyProduct);
  let [flagLoader, setFlagLoader] = useState(false);
  let [flagFormInvalid, setFlagFormInvalid] = useState(false);
  let { adminView } = props;
  let { sampleProduct } = props;
  let { selectedProduct } = props;
  let [errorProduct, setErrorProduct] = useState({
    name: { message: "", mxLen: 80, mnLen: 3, onlyDigits: false },
    mrp: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
    discount: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
  });
  useEffect(() => {
    if (adminView == "edit") {
      setProduct(props.selectedProduct);
    } else if (adminView == "add") {
      let p = emptyProduct;
      setProduct(p);
    }
  }, []);

  function handleProductListClick() {
    props.onProductListClick();
  }

  function handleTextChange(event) {
    let name = event.target.name;
    setProduct({ ...product, [name]: event.target.value });

    let message = fieldValidate(event, errorProduct);
    let errProduct = { ...errorProduct };
    errProduct[name].message = message;
    setErrorProduct(errProduct);
    checkAllErrors(errProduct);
  }
  function handleBlur(event) {
    let name = event.target.name;
    let message = fieldValidate(event, errorProductClientSheet);
    //let message = fieldValidate(event, errorClientSheet);
    let errProduct = { ...errorProduct };
    errProduct[name].message = message;
    setErrorProduct(errProduct);
    checkAllErrors(errProduct);
  }
  function handleFocus(event) {
     checkAllErrors();
  }
  function checkAllErrors(errProduct) {
    for (let field in errProduct) {
      if (errProduct[field].message !== "") {
        setFlagFormInvalid(true);
        return;
      } //if
    } //for
    setFlagFormInvalid(false);
  }
  function handleProductAddEditFormSubmit(event) {
    event.preventDefault();
    //console.log(product);
    if (adminView == "edit") {
      updateBackendProduct(product);
    } else if (adminView == "add") {
      addToBackendProduct(product);
    }
  }

  async function updateBackendProduct(product ) {
    setFlagLoader(true);
    let response = await axios.put(
      "http://localhost:3000/fruits/" + product.id,
      product
    );
    console.log(product);
    console.log(response.data);
    console.log("form");
    props.onProductEditFormSubmit(product);
    setFlagLoader(false);
  }
  async function addToBackendProduct(product) {
    setFlagLoader(true);
    product.discount = Number(product.discount)
    product.mrp = Number(product.mrp)
    product.qty = 0;
    product.inStock = true;
    let response = await axios.post("http://localhost:3000/fruits", product);
    let data = await response.data;
    //console.log("admin product form");
    
    props.onProductAddFormSubmit(data); // this has id
    setFlagLoader(false);
  }
  if (flagLoader) {
    return <BeatLoader size={24} color={"red"} />;
  }

  return (
    <>
      <div className="text-center text-danger w-25 admin text">
        <a href="#" onClick={handleProductListClick}>
          LIST
        </a>
      </div>

      {adminView == "edit" && (
        <div className="text-center text-danger my-3 w-25 admin">
          Edit Product ({product.name})
        </div>
      )}

      {adminView == "add" && (
        <div className="text-center text-danger my-3 w-25 admin">
          Add the new product
        </div>
      )}

      <div className="row justify-content-center admin">
        <div className="col-sm-12 col-md-6 m-4  border border-3 border-danger adminform">
          <form
            className="product-form"
            onSubmit={handleProductAddEditFormSubmit}
          >
            <div className="row">
              <div className="col-sm-4 col-6 my-2 text-end">Name</div>
              <div className="col-6 my-2">
                <input
                  type="text"
                  name="name"
                  id=""
                  required
                  value={product.name}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </div>
              <div className="offset-sm-4 offset-6 text-start text-danger">
                {errorProduct.name.message && errorProduct.name.message}
              </div>
              <div className="col-sm-4 col-6 my-2 text-end">MRP</div>
              <div className="col-6 my-2">
                <input
                  type="number"
                  name="mrp"
                  id=""
                  value={product.mrp}
                  required
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </div>
              <div className="offset-sm-4 offset-6 text-start text-danger">
                {errorProduct.mrp.message && errorProduct.mrp.message}
              </div>
              <div className="col-sm-4 col-6  my-2 text-end">Discount</div>
              <div className="col-6 my-2">
                <input
                  type="text"
                  name="discount"
                  id=""
                  value={product.discount}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  required
                />
              </div>
              <div className="offset-sm-4 offset-6 text-start text-danger">
                {errorProduct.discount.message && errorProduct.discount.message}
              </div>
              <div className="col-sm-4 col-6  my-2 text-end"></div>
              <div className="col-6 my-2">
                <input
                  className="btn btn-danger"
                  type="submit"
                  value="Submit"
                  disabled={flagFormInvalid}
                />{" "}
                <button
                  className="btn btn-danger"
                  onClick={handleProductListClick}
                >
                  Cancel{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* row ends */}
    </>
  );
}

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import fieldValidate from "./FormValidations.jsx";

// export default function AdminProductForm(props) {
//   let emptyProduct = {
//     name: "",
//     mrp: "",
//     discount: "",
//   };
//   let [product, setProduct] = useState(emptyProduct);
//   let [flagLoader, setFlagLoader] = useState(false);
//   let [flagFormInvalid, setFlagFormInvalid] = useState(false);
//   let { adminView } = props;
//   let { sampleProduct } = props;
//   let { selectedProduct } = props;
//   let [errorProduct, setErrorProduct] = useState({
//     name: { message: "", mxLen: 80, mnLen: 3, onlyDigits: false },
//     mrp: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
//     discount: { message: "", mxLen: 6, mnLen: 1, onlyDigits: true },
//   });
//   useEffect(() => {
//     if (adminView == "edit") {
//       // console.log(props.selectedProduct);
//       setProduct(props.selectedProduct);
//     } else if (adminView == "add") {
//       let p = emptyProduct;
//       setProduct(p);
//     }
//   }, []);
//   function handleProductListClick() {
//     props.onProductListClick();
//   }
//   function handleTextChange(event) {
//     let name = event.target.name;
//     setProduct({ ...product, [name]: event.target.value });

//     let message = fieldValidate(event, errorProduct);
//     let errProduct = { ...errorProduct };
//     errProduct[name].message = message;
//     setErrorProduct(errProduct);
//     checkAllErrors(errProduct);
//   }
//   // function handleBlur(event) {
//   //   let name = event.target.name;
//   //   // let message = fieldValidate(event, errorProductClientSheet);
//   //   let message = fieldValidate(event, errorClientSheet);
//   //   let errProduct = { ...errorProduct };
//   //   errProduct[name].message = message;
//   //   setErrorProduct(errProduct);
//   //   checkAllErrors(errProduct);
//   // }
//   function handleFocus(event) {
//     // checkAllErrors();
//   }
//   function checkAllErrors(errProduct) {
//     for (let field in errProduct) {
//       if (errProduct[field].message !== "") {
//         setFlagFormInvalid(true);
//         return;
//       } //if
//     } //for
//     setFlagFormInvalid(false);
//   }
//   function handleProductAddEditFormSubmit(event) {
//     event.preventDefault();
//     console.log(product);
//     if (adminView == "edit") {
//       async function updateBackendProduct(product) {
//         setFlagLoader(true);
//         let response = await axios.put(
//           "http://localhost:3000/fruits/" + product.id,
//           product
//         );
//         console.log("response 1");
//         console.log(response.data);
//         props.onProductEditFormSubmit(product);
//         console.log("product 1");
//         console.log(product);
//         setFlagLoader(false);
//       }
//       updateBackendProduct(product);
//     }
//     //  else if (adminView == "add") {
//     //   addToBackendProduct(product);
//     // }
//   }

//   // async function updateBackendProduct(product) {
//   //   setFlagLoader(true);
//   //   let response = await axios.put(
//   //     "http://localhost:3000/fruits/" + product.id,
//   //     product
//   //   );
//   //   console.log("response 1");
//   //   console.log(response.data);
//   //   props.onProductEditFormSubmit(product);
//   //   console.log("product 1");
//   //   console.log(product);
//   //   setFlagLoader(false);
//   // }
//   // async function addToBackendProduct(product) {
//   //   setFlagLoader(true);
//   //   let response = await axios.post("http://localhost:3000/fruits", product);
//   //   let data = await response.data;
//   //   console.log("Added");
//   //   console.log(data);
//   //   props.onProductAddFormSubmit(data); // this has id
//   //   setFlagLoader(false);
//   // }
//   if (flagLoader) {
//     return <BeatLoader size={24} color={"red"} />;
//   }

//   return (
//     <>
//       {/* <div className="text-center text-danger w-25 admin text">
//         <a href="#" onClick={handleProductListClick}>
//           LIST
//         </a>
//       </div> */}

//       {adminView == "edit" && (
//         <div className="text-center text-danger my-3 w-25 admin">
//           Edit Product ({product.name})
//         </div>
//       )}

//       {/* {adminView == "add" && (
//         <div className="text-center text-danger my-3">Add the new product</div>
//       )} */}

//       <div className="row justify-content-center admin">
//         <div className="col-sm-12 col-md-6 m-4  border border-3 border-danger adminform">
//           <form
//             className="product-form"
//             // onSubmit={(event) => {
//             //   handleProductAddEditFormSubmit(event);
//             // }}
//             onSubmit={handleProductAddEditFormSubmit}
//           >
//             <div className="row">
//               <div className="col-sm-4 col-6 my-2 text-end">Name</div>
//               <div className="col-6 my-2">
//                 <input
//                   type="text"
//                   name="name"
//                   id=""
//                   required
//                   value={product.name}
//                   onChange={handleTextChange}
//                   //onBlur={handleBlur}
//                   onFocus={handleFocus}
//                 />
//               </div>
//               <div className="offset-sm-4 offset-6 text-start text-danger">
//                 {errorProduct.name.message && errorProduct.name.message}
//               </div>
//               <div className="col-sm-4 col-6 my-2 text-end">MRP</div>
//               <div className="col-6 my-2">
//                 <input
//                   type="text"
//                   name="mrp"
//                   id=""
//                   value={product.mrp}
//                   required
//                   onChange={handleTextChange}
//                   //onBlur={handleBlur}
//                   onFocus={handleFocus}
//                 />
//               </div>
//               <div className="offset-sm-4 offset-6 text-start text-danger">
//                 {errorProduct.mrp.message && errorProduct.mrp.message}
//               </div>
//               <div className="col-sm-4 col-6  my-2 text-end">Discount</div>
//               <div className="col-6 my-2">
//                 <input
//                   type="text"
//                   name="discount"
//                   id=""
//                   value={product.discount}
//                   onChange={handleTextChange}
//                   //onBlur={handleBlur}
//                   onFocus={handleFocus}
//                   required
//                 />
//               </div>
//               <div className="offset-sm-4 offset-6 text-start text-danger">
//                 {errorProduct.discount.message && errorProduct.discount.message}
//               </div>
//               <div className="col-sm-4 col-6  my-2 text-end"></div>
//               <div className="col-6 my-2">
//                 <input
//                   className="btn btn-danger"
//                   type="submit"
//                   value="Submit"
//                   disabled={flagFormInvalid}
//                 />{" "}
//                 <button
//                   className="btn btn-danger"
//                   onClick={handleProductListClick}
//                 >
//                   Cancel{" "}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* row ends */}
//     </>
//   );
// }
