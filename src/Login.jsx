import { useState } from "react";

export default function Login(props) {
  // console.log(props);
  //let { view } = props;
  let { message } = props;
  
  let [loginform, setLoginform] = useState("");

  function handleLoginFormSubmit(event) {
    event.preventDefault();
    //console.log(loginform);
    props.onLoginFormSubmit(loginform);
  }

  function handleTextChange(event) {
    let name = event.target.name;
    setLoginform({ ...loginform, [name]: event.target.value });
  }

  return (
    <>
      {/* {view == "login" && ( */}
        <div className="mycontainer logindesign m-75 text-center mx-auto m-4 p-3 ">
          {" "}
          Login
          <div className="row ">
            {message && (
              <div className="text-center text-danger">{message}</div>
            )}
          </div>
          <form
            action="accept()"
            method="post"
            onSubmit={handleLoginFormSubmit}
          >
            <div className="row w-100 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
              <div className="col-2 col-md-4 col-sm-3 p-3 text-end">
              <i className="bi bi-envelope-fill"></i> 
                {/* Email-id : */}
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

              <div className="col-2 col-md-4 col-sm-3 p-3 text-end">
              <i className="bi bi-lock-fill"></i>
              {/* Password : */}
              </div>
              <div className="col-10 col-md-8 col-sm-9 p-3 text-start">
                <input
                  className="container-fluid w-75"
                  type="password"
                  name="password"
                  onChange={handleTextChange}
                  placeholder="Password"
                />
              </div>

              <div className="col-12 p-3 text-center">
                <input type="submit" value="Submit" className="btn btn-success me-3"/>
                <input type="reset" value="Clear" className="btn btn-danger" />
              </div>
            </div>
          </form>
        </div>
      {/* )} */}
    </>
  );

}



















// import { useState } from "react";

// export default function Login(props) {
//   // console.log(props);
//   //let { view } = props;
//   let { message } = props;
  
//   let [loginform, setLoginform] = useState("");

//   function handleLoginFormSubmit(event) {
//     event.preventDefault();
//     //console.log(loginform);
//     props.onLoginFormSubmit(loginform);
//   }

//   function handleTextChange(event) {
//     let name = event.target.name;
//     setLoginform({ ...loginform, [name]: event.target.value });
//   }

//   return (
//     <>
//       {/* {view == "login" && ( */}
//         <div className="mycontainer logindesign w-50 text-center mx-auto m-4 p-3 ">
//           {" "}
//           Login
//           <div className="row ">
//             {message && (
//               <div className="text-center text-danger">{message}</div>
//             )}
//           </div>
//           <form
//             action="accept()"
//             method="post"
//             onSubmit={handleLoginFormSubmit}
//           >
//             <div className="row w-75 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
//               <div className="col-2 col-md-4 col-sm-3 p-3 text-end">
//               <i className="bi bi-envelope-fill"></i> 
//                 {/* Email-id : */}
//               </div>
//               <div className="col-10 col-md-8 col-sm-9 p-3 text-start">
//                 <input
//                   className="container-fluid w-75"
//                   type="email"
//                   name="email"
//                   onChange={handleTextChange}
//                   placeholder="Email-id"
//                 />
//               </div>

//               <div className="col-2 col-md-4 col-sm-3 p-3 text-end">
//               <i className="bi bi-lock-fill"></i>
//               {/* Password : */}
//               </div>
//               <div className="col-10 col-md-8 col-sm-9 p-3 text-start">
//                 <input
//                   className="container-fluid w-75"
//                   type="password"
//                   name="password"
//                   onChange={handleTextChange}
//                   placeholder="Password"
//                 />
//               </div>

//               <div className="col-12 p-3 text-center">
//                 <input type="submit" value="Submit" className="btn btn-success me-3"/>
//                 <input type="reset" value="Clear" className="btn btn-danger" />
//               </div>
//             </div>
//           </form>
//         </div>
//       {/* )} */}
//     </>
//   );

// }
















// export default function Login(props) {
//   let { view } = props;

//   return (
//     <>
//       {view == "login" && (
//         <div className="logindesign w-50 text-center mx-auto m-4 p-3 " >
//           {" "}
//           Login <form action="accept()" method="post">
//           <div className="row w-75 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
//             <div className="col-4 col-md-6 col-sm-5 p-3 text-end">
//               Email-id :
//             </div>
//             <div className="col-8 col-md-6 col-sm-7 p-3 text-start">
//               <input className="container-fluid w-75" type="email" />
//             </div>
//             <div class="col-4 col-md-6 col-sm-5 p-3 text-end">Password :</div>
//             <div class="col-8 col-md-6 col-sm-7 p-3 text-start">
//               <input class="container-fluid w-75" type="password" name="password" />
//             </div>
//             <div className="col-12 p-3 text-center">
//               <input type="submit" value="Submit" />
//               <input type="reset" value="Clear" />
//             </div>
//           </div>
//           </form>
//         </div>

//       )}
//     </>
//   );
// }
