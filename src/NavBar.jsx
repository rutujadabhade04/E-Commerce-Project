import { useState } from "react";
// import Signup from "./Signup";

export default function NavBar(props) {
    

    function handleButtonLogin() {
        props.onButtonLogin();
    }

    function handleButtonSignup() {
        props.onButtonSignup();
    }

  return (
    <>
      <div className="col-lg-1 col-sm-1 col-md-1 p-0 ">
        <img className="img-fluid " src="/shop_logo.jpg" alt="" />
      </div>
      <div className="col-lg-4 col-md-1 col-sm-1"></div>
      <div className="col-lg-3 col-md-5 col-sm-8">
        <button className="login btn btn-primary m-4 p-2" onClick={handleButtonLogin}> Login </button>
        <button className="signup btn btn-primary m-4 p-2" onClick = {handleButtonSignup}> Signup </button>
      </div>
      <div className="col-lg-3 col-md-2 col-sm-2">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg> */}
        <i class="bi bi-cart "></i> <span id="badge"></span>
      </div>
    </>
  );
}
