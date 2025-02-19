import ProductsPage from "./ProductsPage";
import Navbar from "./NavBar";
import { useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import CartList from "./CartList";
import AdminProductsPage from "./AdminProductsPage.jsx";
import axios from "axios";
import Logout from "./Logout.jsx";

export default function Ecomm() {
  let [view, setView] = useState(" ");
  let [count, setCount] = useState(0);
  let [price, setPrice] = useState(0);
  let [cartItems, setCartItems] = useState([]);
  let [siteUsers, setSiteUsers] = useState([]);
  let [fruitsList, setFruitsList] = useState([]);
  let [message, setMessage] = useState(" ");

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
          if (e.role == "admin") {
            setMessage("Login successful as Admin");
            clearMessage();
            setTimeout(() => setView("AdminProductsPage"), 1000);
          } else {
            setMessage("Login successful as User");
            clearMessage();
            setTimeout(() => setView("ProductsPage"), 1000);
          }
          break;
        } else {
          setMessage("Wrong Password");
          clearMessage();
        }
      }
    } //for
    // siteUsers.forEach((e, index) => {
    //   if (loginform.email === e.email) {
    //     userFound = true;
    //     if (loginform.password === e.password) {
    //       console.log("Login successful");
    //       // setMessage("Login successful");
    //       // console.log(e.role);

    //       if (e.role == "admin") {
    //         setMessage("Login successful as Admin");
    //         setView("AdminProductsPage")

    //         // setInterval(() => setView("AdminProductsPage"), 1000);
    //       } else {
    //         setMessage("Login successful as User");
    //         setView("ProductsPage")
    //         // setInterval(() => setView("ProductsPage"), 1000);
    //       }
    //     } else {
    //       setMessage("Wrong Password");
    //     }
    //   }
    // });
    if (!userFound) {
      setMessage("Please Signup and Login");
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

  // function handleAdminButtonClick(op, f) {
  //   let p = [...fruitsList];
  //   let index = p.indexOf(f);
  //   if (op == "edit") {
  //     console.log("edit");
  //   } else if (op == "delete") {
  //     console.log("delete");
  //   }
  // }
  // function handleEditButtonClick(product) {

  // }
  // function handleDeleteButtonClick(product) {

  // }
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

    let list = fruitsList.filter((e, index) => e.id !== product.id);
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
    setView("CartList");
  }

  return (
    <>
      <div className="row p-2 mt-0  align-items-center fixed-top">
        <Navbar
          price={price}
          count={count}
          view={view}
          onButtonLogin={handleButtonLogin}
          onButtonSignup={handleButtonSignup}
          onButtonImage={handleButtonImage}
          onCartButtonClick={handleCartButtonClick}
          onButtonLogout={handleButtonLogout}
        />
      </div>

      <div className="content-page ">
        {view == "ProductsPage" && (
          <div className="row">
            <ProductsPage
              //product={product}
              fruitsList={fruitsList}
              onChangeButtonClick={handleChangeButtonClick}
            />
          </div>
        )}

        {/* {view != "ProductsPage" && (
          <> */}
        {view == "signup" && (
          <Signup
            message={message}
            onSignupFormSubmit={handleSignupFormSubmit}
          />
        )}

        {view == "login" && (
          <Login message={message} onLoginFormSubmit={handleLoginFormSubmit} />
        )}

        {view == "logout" && <Logout message={message} />}

        <CartList view={view} cartItems={cartItems} />

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
