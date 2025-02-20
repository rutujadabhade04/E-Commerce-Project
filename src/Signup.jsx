import { useState } from "react";

export default function Signup(props) {
  //let { view } = props;
  let {message} = props;
  let [signupform, setSignupform] = useState("");

  function handleSignupFormSubmit(event) {
    event.preventDefault();
    console.log(signupform);
    props.onSignupFormSubmit(signupform);
  }

  function handleTextChange(event) {
    let name = event.target.name;
    setSignupform({ ...signupform, [name]: event.target.value });
  }

  return (
    <>
      {/* {view == "signup" && ( */}
        <div className="signupdesign w-50 text-center mx-auto m-4 p-3">
          {" "}
          Sign-up
          <div className="row ">
            {message && (
              <div className="text-center text-danger">{message}</div>
            )}
          </div>
          <form
            action="accept()"
            method="post"
            onSubmit={handleSignupFormSubmit}
          >
            <div className="row w-75 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
              <div class="col-2 col-md-4 col-sm-3 p-3 text-end"><i class="bi  bi-person-fill"></i>
               </div>
              <div class="col-10 col-md-8 col-sm-9 p-3 text-start">
                <input
                  class="container-fluid w-75 "
                  type="text"
                  name="name"
                  onChange={handleTextChange}
                 placeholder="Your Name"
                />
              </div>
              <div className="col-2 col-md-4 col-sm-3 p-3 text-end">
              <i class="bi bi-envelope-fill"></i>
              </div>
              <div className="col-10 col-md-8 col-sm-9 p-3 text-start">
                <input
                  className="container-fluid w-75"
                  type="email"
                  name="email"
                  onChange={handleTextChange}
                  placeholder="Email-id"
                />
              </div>
              <div class="col-2 col-md-4 col-sm-3 p-3 text-end">
              <i class="bi bi-lock-fill"></i> </div>
              <div class="col-10 col-md-8 col-sm-9 p-3 text-start">
                <input
                  class="container-fluid w-75"
                  type="password"
                  name="password"
                  onChange={handleTextChange}
                  placeholder="Password"
                />
              </div>
              <div className="col-12 p-3 text-center m-3">
                <input type="submit" value="Submit" className="btn btn-success me-3"/>
                <input type="reset" value="Clear" className="btn btn-danger " />
              </div>
            </div>
          </form>
        </div>
      {/* )} */}
    </>
  );
}
