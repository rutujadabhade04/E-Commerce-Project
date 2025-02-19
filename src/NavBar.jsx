export default function NavBar(props) {
  let { count } = props;
  let { view } = props;
  let { price } = props;
  function handleButtonLogin() {
    props.onButtonLogin();
  }

  function handleButtonSignup() {
    props.onButtonSignup();
  }

  function handleButtonImage() {
    props.onButtonImage();
  }

  function handleCartButtonClick() {
    props.onCartButtonClick();
  }

  function handleButtonLogout() {
    props.onButtonLogout();
  }
  return (
    <nav className="navbar p-4 mb-4 mt-0">
      <div className="col-lg-1 col-sm-1 col-md-1 p-0 border border-black">


        <button onClick={handleButtonImage}>
          <img className="img-fluid" src="/shop_logo.jpg" alt="" />
        </button>


      </div>

      <div className="col-lg-4 col-md-1 col-sm-1"></div>
      <div className="col-lg-3 col-md-5 col-sm-8">
        {/* {(view != "logout" && view != "ProductsPage" )&& ( */}

        {(view == "logout" && view != "ProductsPage" && view != "AdminProductsPage" || view=="login" || view=="signup" || view == " ") && (
          <>
            <button
              className="login btn btn-light m-4 p-2"
              onClick={handleButtonLogin}
            >
              {" "}
              Login{" "}
            </button>
            <button
              className="signup btn btn-light m-4 p-2"
              onClick={handleButtonSignup}
            >
              {" "}
              Signup{" "}
            </button>
          </>
        )}
        {/* )} */}

        {/* {(view != "login" && view != "signup" && view != " " && view == "ProductsPage") && ( */}
        {(view == "ProductsPage" || view == "AdminProductsPage") && (
          <div className="">
            {" "}
            Welcome
            <button
              className="logout btn btn-light m-4 p-2"
              onClick={handleButtonLogout}
            >
              {" "}
              Logout{" "}
            </button>
          </div>
        )}
        {/* )} */}
      </div>
      <div className="col-lg-3 col-md-2 col-sm-2 ">
        <button id="badge" onClick={handleCartButtonClick}>
          <i className="bi bi-cart "></i>
          {count} {price}
        </button>
      </div>
    </nav>
  );
}
