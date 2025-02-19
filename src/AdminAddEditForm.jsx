import { useState } from "react";

export default function Signup(props) {
  //let { view } = props;
//   let {message} = props;
//   let [signupform, setSignupform] = useState("");

//   function handleSignupFormSubmit(event) {
//     event.preventDefault();
//     console.log(signupform);
//     props.onSignupFormSubmit(signupform);
//   }

//   function handleTextChange(event) {
//     let name = event.target.name;
//     setSignupform({ ...signupform, [name]: event.target.value });
//   }

  return (
    <>
      {/* {view == "signup" && ( */}
        <div className="signupdesign w-50 text-center mx-auto m-4 p-3">
          {" "}
          Add the New Product
          {/* <div className="row ">
            {message && (
              <div className="text-center text-danger">{message}</div>
            )}
          </div> */}
          <form
            action="accept()"
            method="post"
            // onSubmit={handleSignupFormSubmit}
          >
            <div className="row w-75 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
              <div class="col-4 col-md-6 col-sm-5 p-3 text-end">Name :</div>
              <div class="col-8 col-md-6 col-sm-7 p-3 text-start">
                <input
                  class="container-fluid w-75 "
                  type="text"
                  name="name"
                 // onChange={handleTextChange}
                />
              </div>
              <div className="col-4 col-md-6 col-sm-5 p-3 text-end">
                MRP :
              </div>
              <div className="col-8 col-md-6 col-sm-7 p-3 text-start">
                <input
                  className="container-fluid w-75"
                  type="text"
                  name="MRP"
                  //onChange={handleTextChange}
                />
              </div>
              <div class="col-4 col-md-6 col-sm-5 p-3 text-end">Discount :</div>
              <div class="col-8 col-md-6 col-sm-7 p-3 text-start">
                <input
                  class="container-fluid w-75"
                  type="text"
                  name="discount"
                  //onChange={handleTextChange}
                />
              </div>
              <div className="col-12 p-3 text-center m-3">
                <input type="submit" value="Submit" />
                <input type="reset" value="Cancel" />
              </div>
            </div>
          </form>
        </div>
      {/* )} */}
    </>
  );
}
