import ProductsPage from "./ProductsPage";
import Navbar from "./NavBar";
import { useEffect, useState } from "react";
import Login from "./login.jsx";
import Signup from "./Signup";
import CartList from "./CartList";
import AdminProductsPage from "./AdminProductsPage.jsx";
import axios from "axios";
import Logout from "./Logout.jsx";
import Bill from "./Bill.jsx";

import {
  deleteBackendProduct,
  getProductFromBackend,
} from "./Firebaseproductservices";
import { addUserToBackend, getUserFromBackend } from "./Firebaseuserservices";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { importBackendDataToBill } from "./Firebasebillservices";

export default function Ecomm() {
  let [view, setView] = useState("ProductsPage");
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

  let [flagLoader, setFlagLoader] = useState(false);

  let [bill, setbill] = useState("");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  function clearMessage() {
    setTimeout(() => {
      setMessage(""); // Clear message from React state
    }, 1000);
  }

  useEffect(() => {
    getDataFromServer();
    getUsersFromServer();
    // if (window.location.search == "") {
    //   getDataFromServer();
    // } else {
    //   let param = new URLSearchParams(window.location.search);
    //   let billId = param.get("id");
    //   if (billId == null) {
    //     setbill(null);
    //     //clearMessage();
    //     return;
    //   } else {
    //     console.log("In useeffect");
    //     getbill(billId);
    //   }
    // }
  }, []);

  async function getDataFromServer() {
    setFlagLoader(true);
    let list = await getProductFromBackend();
    console.log(list);
    // let response = await axios.get("http://localhost:3000/fruits");
    setFlagLoader(false);
    list = list.map((e, index) => {
      e.qty = 0;
      return e;
    });

    list = list.map((e) => {
      if (e.discount > 0) {
        e.finalprice = e.mrp - (e.mrp * e.discount) / 100;
      } else {
        e.finalprice = e.mrp;
      }
      return e;
    });

    let usr;
    let cItems = [];
    //  onAuthStateChanged(auth, (siteUsers) => {
    //   usr = {};
    //   if (siteUsers) {
    //     usr.name = siteUsers.displayName;
    //     usr.email = siteUsers.email;
    //     setMessage("Login successfull")
    //     clearMessage();
    //     if (usr.email == "rutuja04dabhade@gmail.com") {
    //       usr.role = "admin";
    //     } else {
    //       usr.role = "user";
    //     }
    //   } else {
    //     usr = null;
    //   }
    // });
    //setSiteUsers(usr);

    setFruitsList(list);
    setView("ProductsPage");
  }

  // async function getbill(billId) {
  //   setFlagLoader(true);
  //   let b = await importBackendDataToBill(billId);
  //   console.log("here is the bill");
  //   if (b == null) {
  //     setbill(b);
  //     setFlagLoader(false);
  //     setView("finalbillpage");
  //     return;
  //   }
  //   console.log("coming datas");
  //   setbill(b);
  //   setView("finalbillpage");
  //   setFlagLoader(false);
  // }

  // useEffect(() => {
  //   getUsersFromServer();
  //   //getFruitsFromServer();
  // }, []);

  async function getUsersFromServer() {
    setFlagLoader(true);
    let response = await axios("http://localhost:3000/users");
    setFlagLoader(false);
    setSiteUsers(response.data);
  }

  // async function getFruitsFromServer() {
  //   setFlagLoader(true);
  //   let response = await axios("http://localhost:3000/fruits");
  //   setFlagLoader(false);
  //   let list = response.data;

  //   list = list.map((e) => {
  //     if (e.discount > 0) {
  //       e.finalprice = e.mrp - (e.mrp * e.discount) / 100;
  //     } else {
  //       e.finalprice = e.mrp;
  //     }
  //     return e;
  //   });

  //   setFruitsList(list);
  // }

  function handleLoginFormSubmit(loginform) {
    let userFound = false;
    for (let i = 0; i < siteUsers.length; i++) {
      let e = siteUsers[i];
      if (loginform.email === e.email) {
        userFound = true;
        if (loginform.password === e.password) {
          cartentry = "Login Successful";
          setCartEntry(cartentry);
          localStorage.setItem("loggedInUser", JSON.stringify(e));
          setName(e.name);
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
          cartentry = "Login Unsuccessful";
          setCartEntry(cartentry);
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
    // let response = await axios.delete(
    //   "http://localhost:3000/fruits/" + product.id
    // );
    let response = await deleteBackendProduct(product);

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
    auth.signOut();
    //localStorage.removeItem("loggedInUser");
    setCount(0);
    setPrice(0);
    setTimeout(() => {
      setView(" ");
    }, 3000);
  }
  function handleButtonSignup() {
    setView("signup");
  }
  function handleButtonImage() {
    setView("ProductsPage");
    // if(cartentry == 0){
    //   setSiteUsers([]);
    // }
  }

  function handleCartButtonClick() {
    //setView("CartList");
    if (count <= 0 && price <= 0) {
      setView("no_element");
    } else {
      setMessage("To Process the order you need to Login first!");
      setView("login");
      setTimeout(() => {
        setMessage(""); // Clear message from React state
      }, 3000);
      if (cartentry == "Login Successful") {
        setView("CartList");
      }
    }
  }

  function handleLoginUsingGoogleButtonClick() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        let usr = {};
        usr.name = user.displayName;
        usr.emailid = user.email;
        if (usr.emailid == "rutuja04dabhade@gmail.com") {
          usr.role = "admin";
          setView("AdminProductsPage");
        } else {
          usr.role = "user";
          setView("ProductsPage");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
      <div className="row p-2 mt-0 align-items-center fixed-top">
        <Navbar
          price={price}
          count={count}
          view={view}
          name={name}
          siteUsers={siteUsers}
          cartentry={cartentry}
          onButtonLogin={handleButtonLogin}
          onButtonSignup={handleButtonSignup}
          onButtonImage={handleButtonImage}
          onCartButtonClick={handleCartButtonClick}
          onButtonLogout={handleButtonLogout}
          onLoginUsingGoogleButtonClick={handleLoginUsingGoogleButtonClick}
        />
      </div>

      <div className="content-page ">
        {view == "ProductsPage" && (
          <div className="row m-5">
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
          />
        )}

        {view == "bill" && (
          <Bill price={price} name={name} cartItems={cartItems} />
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
          />
        )}
      </div>
    </>
  );
}

// import ProductsPage from "./ProductsPage";
// import Navbar from "./NavBar";
// import { useEffect, useState } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import CartList from "./CartList";
// import AdminProductsPage from "./AdminProductsPage.jsx";
// import axios from "axios";
// import Logout from "./Logout.jsx";
// import Bill from "./Bill.jsx";

// // Helper functions to manage localStorage
// const saveToLocalStorage = (key, value) => {
//   localStorage.setItem(key, JSON.stringify(value));
// };

// const loadFromLocalStorage = (key, defaultValue) => {
//   const savedValue = localStorage.getItem(key);
//   return savedValue ? JSON.parse(savedValue) : defaultValue;
// };

// export default function Ecomm() {
//   // Load initial states from localStorage
//   let [view, setView] = useState(loadFromLocalStorage("view", ""));
//   let [count, setCount] = useState(loadFromLocalStorage("count", 0));
//   let [price, setPrice] = useState(loadFromLocalStorage("price", 0));
//   let [cartItems, setCartItems] = useState(loadFromLocalStorage("cartItems", []));
//   let [siteUsers, setSiteUsers] = useState([]);
//   let [fruitsList, setFruitsList] = useState([]);
//   let [message, setMessage] = useState("");
//   let [cartentry, setCartEntry] = useState("");
//   let [name, setName] = useState(loadFromLocalStorage("name", ""));
//   let [loaderFlag, setLoaderFlag] = useState(false);

//   useEffect(() => {
//     getUsersFromServer();
//     getFruitsFromServer();
//   }, []);

//   useEffect(() => {
//     // Save data to localStorage whenever these states change
//     saveToLocalStorage("cartItems", cartItems);
//     saveToLocalStorage("price", price);
//     saveToLocalStorage("count", count);
//     saveToLocalStorage("name", name);
//     saveToLocalStorage("view", view);
//   }, [cartItems, price, count, name, view]);

//   async function getUsersFromServer() {
//     setLoaderFlag(true);
//     let response = await axios("http://localhost:3000/users");
//     setLoaderFlag(false);
//     setSiteUsers(response.data);
//   }

//   async function getFruitsFromServer() {
//     setLoaderFlag(true);
//     let response = await axios("http://localhost:3000/fruits");
//     setLoaderFlag(false);
//     let list = response.data.map((e) => {
//       e.finalprice = e.discount > 0 ? e.mrp - (e.mrp * e.discount) / 100 : e.mrp;
//       return e;
//     });
//     setFruitsList(list);
//   }

//   function clearMessage() {
//     setTimeout(() => {
//       setMessage(""); // Clear message from React state
//     }, 1000);
//   }

//   function handleLoginFormSubmit(loginform) {
//     let userFound = false;
//     for (let i = 0; i < siteUsers.length; i++) {
//       let e = siteUsers[i];
//       if (loginform.email === e.email) {
//         userFound = true;
//         if (loginform.password === e.password) {
//           setCartEntry("Login Successful");
//           localStorage.setItem("loggedInUser", JSON.stringify(e));
//           setName(e.name);
//           saveToLocalStorage("name", e.name);
//           setTimeout(() => {
//             setView(e.role === "admin" ? "AdminProductsPage" : "ProductsPage");
//           }, 1000);
//           break;
//         } else {
//           setMessage("Wrong Password");
//           clearMessage();
//         }
//       }
//     }
//     if (!userFound) {
//       setMessage("Please Signup and Login");
//       clearMessage();
//     }
//   }

//   function handleSignupFormSubmit(signupform) {
//     let userFound = false;
//     siteUsers.forEach((e) => {
//       if (signupform.email === e.email) {
//         userFound = true;
//         setMessage("User Already Exists");
//         clearMessage();
//       }
//     });
//     if (!userFound) {
//       async function addDataToServer() {
//         let response = await axios.post("http://localhost:3000/users", signupform);
//         setSiteUsers((prevUsers) => [...prevUsers, response.data]);
//       }
//       addDataToServer();
//       setMessage("Signed up successfully! You can Login now.");
//       clearMessage();
//     }
//   }

//   function handleChangeButtonClick(op, f) {
//     let p = [...fruitsList];
//     let cItems = [...cartItems];
//     let index = p.indexOf(f);

//     if (op === "+") {
//       p[index].qty = p[index].qty + 1;
//       cItems = cItems.map((e) => (e.id === f.id ? f : e));
//       setCartItems(cItems);
//     } else if (op === "-") {
//       p[index].qty = p[index].qty - 1;
//       if (p[index].qty === 0) {
//         setCount(count - 1);
//         cItems = cItems.filter((e) => e.id !== f.id);
//         setCartItems(cItems);
//       }
//     } else if (op === "addtocart") {
//       p[index].qty = 1;
//       setCount(count + 1);
//       cItems.push(f);
//       setCartItems(cItems);
//     }
//     calculateTotal(p);
//     setFruitsList(p);
//   }

//   function calculateTotal(f) {
//     let total = 0;
//     f.forEach((e) => {
//       total += e.finalprice * e.qty;
//     });
//     setPrice(total);
//   }

//   function handleProductAddEditFormSubmit(list) {
//     setFruitsList(list);
//   }

//   async function deleteProductFromServer(product) {
//     await axios.delete(`http://localhost:3000/fruits/${product.id}`);
//     setFruitsList(fruitsList.filter((e) => e.id !== product.id));
//     setMessage(`Product - ${product.name} deleted successfully`);
//     clearMessage();
//   }

//   function handleButtonLogin() {
//     setView("login");
//   }

//   function handleButtonLogout() {
//     setMessage("Thank you for Logging in!");
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//     setView("logout");
//     localStorage.removeItem("loggedInUser");
//     setCount(0);
//     setPrice(0);
//     setTimeout(() => {
//       setView("");
//     }, 3000);
//   }

//   function handleButtonSignup() {
//     setView("signup");
//   }

//   function handleButtonImage() {
//     setView("ProductsPage");
//   }

//   function handleCartButtonClick() {
//     if (count <= 0 && price <= 0) {
//       setView("no_element");
//     } else {
//       setMessage("To Process the order you need to Login first!");
//       setView("login");
//       setTimeout(() => {
//         setMessage("");
//       }, 3000);
//       if (cartentry === "Login Successful") {
//         setView("CartList");
//       }
//     }
//   }

//   function handleBackButtonClick() {
//     setView("ProductsPage");
//   }

//   function handleStartButtonClick() {
//     setView("ProductsPage");
//   }

//   function handleBuyButtonClick() {
//     setView("bill");
//   }

//   return (
//     <>
//       <div className="row p-2 mt-0 align-items-center fixed-top">
//         <Navbar
//           price={price}
//           count={count}
//           view={view}
//           name={name}
//           cartentry={cartentry}
//           onButtonLogin={handleButtonLogin}
//           onButtonSignup={handleButtonSignup}
//           onButtonImage={handleButtonImage}
//           onCartButtonClick={handleCartButtonClick}
//           onButtonLogout={handleButtonLogout}
//         />
//       </div>

//       <div className="content-page">
//         {view === "ProductsPage" && (
//           <div className="row">
//             <ProductsPage fruitsList={fruitsList} onChangeButtonClick={handleChangeButtonClick} />
//           </div>
//         )}

//         {view === "signup" && (
//           <Signup message={message} onSignupFormSubmit={handleSignupFormSubmit} />
//         )}

//         {(view === "login" || cartentry === "Login Unsuccessful") && (
//           <Login message={message} onLoginFormSubmit={handleLoginFormSubmit} />
//         )}

//         {view === "logout" && <Logout message={message} />}

//         {view === "CartList" && cartentry === "Login Successful" && (
//           <CartList
//             view={view}
//             cartItems={cartItems}
//             onChangeButtonClick={handleChangeButtonClick}
//             onBuyButtonClick={handleBuyButtonClick}
//             onBackButtonClick={handleBackButtonClick}
//             onStartButtonClick={handleStartButtonClick}
//           />
//         )}

//         {view === "bill" && <Bill price={price} name={name} cartItems={cartItems} />}

//         {view === "no_element" && (
//           <div className="mb-1 p-2 carttext w-25">
//             Cart is Empty. <a href="#" onClick={handleStartButtonClick}>Start Shopping.</a>
//           </div>
//         )}

//         {view === "AdminProductsPage" && (
//           <AdminProductsPage
//             view={view}
//             fruitsList={fruitsList}
//             onProductEditFormSubmit={handleProductAddEditFormSubmit}
//             onProductAddFormSubmit={handleProductAddEditFormSubmit}
//             onDeleteButtonClick={deleteProductFromServer}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// import ProductsPage from "./ProductsPage";
// import Navbar from "./NavBar";
// import { useEffect, useState } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import CartList from "./CartList";
// import AdminProductsPage from "./AdminProductsPage.jsx";
// import axios from "axios";
// import Logout from "./Logout.jsx";
// import Bill from "./Bill.jsx";

// export default function Ecomm() {
//   let [view, setView] = useState(" ");
//   let [count, setCount] = useState(0);
//   let [price, setPrice] = useState(0);
//   let [cartItems, setCartItems] = useState([]);
//   let [siteUsers, setSiteUsers] = useState([]);
//   let [fruitsList, setFruitsList] = useState([]);
//   let [message, setMessage] = useState(" ");
//   let [cartentry, setCartEntry] = useState(" ");
//   // let [userBill , setUserBill] = useState(" ");
//   //let [cartMessage , setCartMessage] = useState(" ");
//   let [name, setName] = useState(" ");

//   let [loaderFlag, setLoaderFlag] = useState(false);

//   useEffect(() => {
//     getUsersFromServer();
//     getFruitsFromServer();
//   }, []);

//   async function getUsersFromServer() {
//     setLoaderFlag(true);
//     //let response = await axios("http://localhost:3000/users");
//     let response = await axios("http://localhost:3000/users");
//     setLoaderFlag(false);
//     // console.log(response.data);
//     setSiteUsers(response.data);
//   }

//   async function getFruitsFromServer() {
//     setLoaderFlag(true);
//     let response = await axios("http://localhost:3000/fruits");
//     setLoaderFlag(false);
//     // console.log(response.data);
//     let list = response.data;

//     list = list.map((e) => {
//       if (e.discount > 0) {
//         e.finalprice = e.mrp - (e.mrp * e.discount) / 100;
//       } else {
//         e.finalprice = e.mrp;
//       }
//       //console.log(e);
//       return e;
//     });

//     setFruitsList(list);
//     // setFruitsList(response.data);
//   }

//   function clearMessage() {
//     setTimeout(() => {
//       setMessage(""); // Clear message from React state
//     }, 1000);
//   }

//   function handleLoginFormSubmit(loginform) {
//     let userFound = false;
//     for (let i = 0; i < siteUsers.length; i++) {
//       let e = siteUsers[i];
//       if (loginform.email === e.email) {
//         userFound = true;
//         if (loginform.password === e.password) {
//           cartentry = "Login Successful";
//           setCartEntry(cartentry);
//           localStorage.setItem("loggedInUser", JSON.stringify(e));
//           setName(e.name);
//           if (e.role == "admin") {
//             setMessage("Login successful as Admin");
//             clearMessage();
//             name = e.name;
//             setName(name);
//             setTimeout(() => setView("AdminProductsPage"), 1000);
//           } else {
//             setMessage("Login successful as User");
//             clearMessage();
//             name = e.name;
//             setName(name);
//             setTimeout(() => setView("ProductsPage"), 1000);
//           }
//           break;
//         } else {
//           setMessage("Wrong Password");
//           cartentry = "Login Unsuccessful";
//           setCartEntry(cartentry);
//           clearMessage();
//         }
//       }
//     }
//     if (!userFound) {
//       setMessage("Please Signup and Login");
//       cartentry = "Login Unsuccessful";
//       setCartEntry(cartentry);
//       clearMessage();
//     }
//   }

//   function handleSignupFormSubmit(signupform) {
//     let userFound = false;
//     //console.log(signupform);
//     siteUsers.forEach((e, index) => {
//       if (signupform.email == e.email) {
//         userFound = true;
//         setMessage("User Already Exists");
//         clearMessage();
//       }
//     });
//     if (!userFound) {
//       async function addDataToServer(siteUsers) {
//         let response = await axios.post(
//           "http://localhost:3000/users",
//           signupform
//         );
//         //let st = response.data;
//         let sUsers = [...siteUsers];
//         sUsers.push(response.data);
//         console.log(sUsers);
//         setSiteUsers(sUsers);
//       }
//       addDataToServer(siteUsers);
//       setMessage("Signed up successfully!..You can Login now");
//       clearMessage();
//       // setView("login");
//     } else {
//       return;
//     }
//   }

//   function handleChangeButtonClick(op, f) {
//     //console.log(op);
//     let p = [...fruitsList];
//     let cItems = [...cartItems];
//     let index = p.indexOf(f);

//     // console.log(p);
//     // console.log(cItems);
//     // console.log(index);

//     //   count=0;
//     //   setCount(count);
//     //  if(count == 0 ){
//     //   console.log("No element present");
//     //   cartMessage = "Cart is Empty";
//     //   setCartMessage(cartMessage);
//     //  }

//     if (op == "+") {
//       p[index].qty = p[index].qty + 1;
//       cItems = cItems.map((e) => {
//         if (e.id == f.id) return f;
//         else return e;
//       });
//       setCartItems(cItems);
//     } else if (op == "-") {
//       p[index].qty = p[index].qty - 1;
//       if (p[index].qty == 0) {
//         setCount(count - 1);
//         cItems = cItems.filter((e) => e.id != f.id);
//         setCartItems(cItems);
//       }
//     } else if (op == "addtocart") {
//       p[index].qty = 1;
//       setCount(count + 1);
//       cItems.push(f);
//       //setCartItems(product);
//       setCartItems(cItems);
//     }
//     calculateTotal(p);
//     setFruitsList(p);
//   }

//   function calculateTotal(f) {
//     let total = 0;
//     f.forEach((e, index) => {
//       total += e.finalprice * e.qty;
//     });
//     setPrice(total);
//   }

//   function handleProductAddEditFormSubmit(list) {
//     setFruitsList(list);
//   }

//   function handleDeleteButtonClick(product, flag) {
//     if (flag) {
//       deleteProductFromServer(product);
//     } else {
//       setMessage("Delete operation cancelled");
//       clearMessage();
//     }
//   }

//   async function deleteProductFromServer(product) {
//     let response = await axios.delete(
//       "http://localhost:3000/fruits/" + product.id
//     );

//     let list = fruitsList.filter((e, index) => e.id != product.id);
//     console.log("list in delete ecom");
//     console.log(list);
//     setFruitsList(list);
//     setMessage(`Product - ${product.name} deleted successfully`);
//     clearMessage();
//   }

//   function handleButtonLogin() {
//     setView("login");
//   }
//   function handleButtonLogout() {
//     setMessage("Thank you for Logging in!");
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//     setView("logout");
//     localStorage.removeItem("loggedInUser");
//     setCount(0);
//     setPrice(0);
//     setTimeout(() => {
//       setView(" ");
//     }, 3000);
//   }
//   function handleButtonSignup() {
//     setView("signup");
//   }
//   function handleButtonImage() {
//     setView("ProductsPage");
//     // if(cartentry == 0){
//     //   setSiteUsers([]);
//     // }
//   }

//   function handleCartButtonClick() {
//     //setView("CartList");
//     if (count <= 0 && price <= 0) {
//       setView("no_element");
//     } else {
//       setMessage("To Process the order you need to Login first!");
//       setView("login");
//       setTimeout(() => {
//         setMessage(""); // Clear message from React state
//       }, 3000);
//       if (cartentry == "Login Successful") {
//         setView("CartList");
//       }
//     }
//   }
//   function handleBackButtonClick() {
//     setView("ProductsPage");
//   }
//   function handleStartButtonClick() {
//     setView("ProductsPage");
//   }

//   function handleBuyButtonClick() {
//     setView("bill");
//   }

//   return (
//     <>
//       <div className="row p-2 mt-0  align-items-center fixed-top">
//         <Navbar
//           price={price}
//           count={count}
//           view={view}
//           name={name}
//           cartentry={cartentry}
//           onButtonLogin={handleButtonLogin}
//           onButtonSignup={handleButtonSignup}
//           onButtonImage={handleButtonImage}
//           onCartButtonClick={handleCartButtonClick}
//           onButtonLogout={handleButtonLogout}
//         />
//       </div>

//       <div className="content-page ">
//         {view == "ProductsPage" && (
//           <div className="row">
//             <ProductsPage
//               fruitsList={fruitsList}
//               onChangeButtonClick={handleChangeButtonClick}
//             />
//           </div>
//         )}

//         {view == "signup" && (
//           <Signup
//             message={message}
//             onSignupFormSubmit={handleSignupFormSubmit}
//           />
//         )}

//         {(view == "login" || cartentry == "Login Unsuccessful") && (
//           <Login message={message} onLoginFormSubmit={handleLoginFormSubmit} />
//         )}

//         {view == "logout" && <Logout message={message} />}

//         {view == "CartList" && cartentry == "Login Successful" && (
//           <CartList
//             view={view}
//             cartItems={cartItems}
//             onChangeButtonClick={handleChangeButtonClick}
//             onBuyButtonClick={handleBuyButtonClick}
//             onBackButtonClick={handleBackButtonClick}
//             onStartButtonClick={handleStartButtonClick}
//           />
//         )}

//         {view == "bill" && (
//           <Bill
//             price={price}
//             name={name}
//             cartItems={cartItems}
//           />
//         )}

//         {view == "no_element" && (
//           <div className="mb-1 p-2  carttext w-25">
//             Cart is Empty.{" "}
//             <a href="#" onClick={handleStartButtonClick}>
//               Start
//             </a>{" "}
//             Shopping.
//           </div>
//         )}

//         {view == "AdminProductsPage" && (
//           <AdminProductsPage
//             view={view}
//             fruitsList={fruitsList}
//             onProductEditFormSubmit={handleProductAddEditFormSubmit}
//             onProductAddFormSubmit={handleProductAddEditFormSubmit}
//             onDeleteButtonClick={handleDeleteButtonClick}
//           />
//         )}
//       </div>
//     </>
//   );
// }
