import ProductsPage from "./ProductsPage";
import Navbar from "./NavBar";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import CartList from "./CartList";
import AdminProductsPage from "./AdminProductsPage.jsx";
import axios from "axios";
import Logout from "./Logout.jsx";
import Bill from "./Bill.jsx";

export default function Ecomm() {
  let [view, setView] = useState(" ");
  let [count, setCount] = useState(0);
  let [price, setPrice] = useState(0);
  let [cartItems, setCartItems] = useState([]);
  let [siteUsers, setSiteUsers] = useState([]);
  let [fruitsList, setFruitsList] = useState([]);
  let [message, setMessage] = useState(" ");
  let [cartentry, setCartEntry] = useState(" ");
  // let [userBill , setUserBill] = useState(" ");
  //let [cartMessage , setCartMessage] = useState(" ");
  let [name, setName] = useState(" ");

  let [loaderFlag, setLoaderFlag] = useState(false);

  useEffect(() => {
    getUsersFromServer();
    getFruitsFromServer();
  }, []);

  async function getUsersFromServer() {
    setLoaderFlag(true);
    let response = await axios("http://localhost:3000/users");
    setLoaderFlag(false);
    // console.log(response.data);
    setSiteUsers(response.data);
  }

  async function getFruitsFromServer() {
    setLoaderFlag(true);
    let response = await axios("http://localhost:3000/fruits");
    setLoaderFlag(false);
    // console.log(response.data);
    let list = response.data;

    list = list.map((e) => {
      if (e.discount > 0) {
        e.finalprice = e.mrp - (e.mrp * e.discount) / 100;
      } else {
        e.finalprice = e.mrp;
      }
      //console.log(e);
      return e;
    });

    setFruitsList(list);
    // setFruitsList(response.data);
  }

  function clearMessage() {
    setTimeout(() => {
      setMessage(""); // Clear message from React state
    }, 1000);
  }

  function handleLoginFormSubmit(loginform) {
    let userFound = false;
    for (let i = 0; i < siteUsers.length; i++) {
      let e = siteUsers[i];
      if (loginform.email === e.email) {
        userFound = true;
        if (loginform.password === e.password) {
          cartentry = "Login Successful";
          setCartEntry(cartentry);
          if (e.role == "admin") {
            setMessage("Login successful as Admin");
            clearMessage();
            name = e.name;
            setName(name);
            setTimeout(() => setView("AdminProductsPage"), 1000);
          } else {
            setMessage("Login successful as User");
            clearMessage();
            name = e.name;
            setName(name);
            setTimeout(() => setView("ProductsPage"), 1000);
          }
          break;
        } else {
          setMessage("Wrong Password");
          clearMessage();
        }
      }
    }
    if (!userFound) {
      setMessage("Please Signup and Login");
      cartentry = "Login Unsuccessful";
      setCartEntry(cartentry);
      clearMessage();
    }
  }

  function handleSignupFormSubmit(signupform) {
    let userFound = false;
    //console.log(signupform);
    siteUsers.forEach((e, index) => {
      if (signupform.email == e.email) {
        userFound = true;
        setMessage("User Already Exists");
        clearMessage();
      }
    });
    if (!userFound) {
      async function addDataToServer(siteUsers) {
        let response = await axios.post(
          "http://localhost:3000/users",
          signupform
        );
        //let st = response.data;
        let sUsers = [...siteUsers];
        sUsers.push(response.data);
        console.log(sUsers);
        setSiteUsers(sUsers);
      }
      addDataToServer(siteUsers);
      setMessage("Signed up successfully!..You can Login now");
      clearMessage();
      // setView("login");
    } else {
      return;
    }
  }

  function handleChangeButtonClick(op, f) {
    //console.log(op);
    let p = [...fruitsList];
    let cItems = [...cartItems];
    let index = p.indexOf(f);

    // console.log(p);
    // console.log(cItems);
    // console.log(index);

    //   count=0;
    //   setCount(count);
    //  if(count == 0 ){
    //   console.log("No element present");
    //   cartMessage = "Cart is Empty";
    //   setCartMessage(cartMessage);
    //  }

    if (op == "+") {
      p[index].qty = p[index].qty + 1;
      cItems = cItems.map((e) => {
        if (e.id == f.id) return f;
        else return e;
      });
      setCartItems(cItems);
    } else if (op == "-") {
      p[index].qty = p[index].qty - 1;
      if (p[index].qty == 0) {
        setCount(count - 1);
        cItems = cItems.filter((e) => e.id != f.id);
        setCartItems(cItems);
      }
    } else if (op == "addtocart") {
      p[index].qty = 1;
      setCount(count + 1);
      cItems.push(f);
      //setCartItems(product);
      setCartItems(cItems);
    }
    calculateTotal(p);
    setFruitsList(p);
  }

  function calculateTotal(f) {
    let total = 0;
    f.forEach((e, index) => {
      total += e.finalprice * e.qty;
    });
    setPrice(total);
  }

  function handleProductAddEditFormSubmit(list) {
    setFruitsList(list);
  }

  function handleDeleteButtonClick(product, flag) {
    if (flag) {
      deleteProductFromServer(product);
    } else {
      setMessage("Delete operation cancelled");
      clearMessage();
    }
  }

  async function deleteProductFromServer(product) {
    let response = await axios.delete(
      "http://localhost:3000/fruits/" + product.id
    );

    let list = fruitsList.filter((e, index) => e.id != product.id);
    console.log("list in delete ecom");
    console.log(list);
    setFruitsList(list);
    setMessage(`Product - ${product.name} deleted successfully`);
    clearMessage();
  }

  function handleButtonLogin() {
    setView("login");
  }
  function handleButtonLogout() {
    setMessage("Thank you for Logging in!");
    setTimeout(() => {
      setMessage("");
    }, 3000);
    setView("logout");
    setTimeout(() => {
      setView(" ");
    }, 3000);
  }
  function handleButtonSignup() {
    setView("signup");
  }
  function handleButtonImage() {
    setView("ProductsPage");
  }
  function handleCartButtonClick() {
    //setView("CartList");
    if (count <= 0 && price <= 0) {
      setView("no_element");
    } else {
      setMessage("To Process the order you need to Login first!")
      setView("login");
      setTimeout(() => {
        setMessage(""); // Clear message from React state
      }, 3000);
      if(cartentry == "Login Successful"){
        setView("CartList")
      }
    }
  }
  function handleBackButtonClick() {
    setView("ProductsPage");
  }
  function handleStartButtonClick() {
    setView("ProductsPage");
  }

  function handleBuyButtonClick() {
    setView("bill");
  }

  return (
    <>
      <div className="row p-2 mt-0  align-items-center fixed-top">
        <Navbar
          price={price}
          count={count}
          view={view}
          name={name}
          onButtonLogin={handleButtonLogin}
          onButtonSignup={handleButtonSignup}
          onButtonImage={handleButtonImage}
          onCartButtonClick={handleCartButtonClick}
          onButtonLogout={handleButtonLogout}
        />
      </div>

      {/* {
        view == "bill" && (
          <Bill onBill = {bill} userBill={userBill}/>
        )
      } */}

      <div className="content-page ">
        {view == "ProductsPage" && (
          <div className="row">
            <ProductsPage
              fruitsList={fruitsList}
              onChangeButtonClick={handleChangeButtonClick}
            />
          </div>
        )}

        {view == "signup" && (
          <Signup
            message={message}
            onSignupFormSubmit={handleSignupFormSubmit}
          />
        )}

        {(view == "login" || cartentry == "Login Unsuccessful") && (
          <Login message={message} onLoginFormSubmit={handleLoginFormSubmit} />
        )}

        {view == "logout" && <Logout message={message} />}

        {view == "CartList" && cartentry == "Login Successful" && (
          <CartList
            view={view}
            cartItems={cartItems}
            onChangeButtonClick={handleChangeButtonClick}
            onBuyButtonClick={handleBuyButtonClick}
            onBackButtonClick={handleBackButtonClick}
            onStartButtonClick={handleStartButtonClick}
            //onProceed = {proceed}
            //cartMessage={cartMessage}
            // count={count}
          />
        )}

        {view == "bill" && (
          <Bill
            // onChangeButtonClick={handleChangeButtonClick}
            price={price}
            name={name}
            cartItems={cartItems}
          />
        )}


        {view == "no_element" && (
          <div className="mb-1 p-2  carttext w-25">
            Cart is Empty.{" "}
            <a href="#" onClick={handleStartButtonClick}>
              Start
            </a>{" "}
            Shopping.
          </div>
        )}


        {view == "AdminProductsPage" && (
          <AdminProductsPage
            view={view}
            fruitsList={fruitsList}
            onProductEditFormSubmit={handleProductAddEditFormSubmit}
            onProductAddFormSubmit={handleProductAddEditFormSubmit}
            onDeleteButtonClick={handleDeleteButtonClick}
            //onAdminButtonClick={handleAdminButtonClick}
          />
        )}
      </div>
    </>
  );
}
