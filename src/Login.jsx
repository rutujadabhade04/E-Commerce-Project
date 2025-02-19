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
        <div className="logindesign w-50 text-center mx-auto m-4 p-3 ">
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
            <div className="row w-75 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
              <div className="col-4 col-md-6 col-sm-5 p-3 text-end">
                Email-id :
              </div>
              <div className="col-8 col-md-6 col-sm-7 p-3 text-start">
                <input
                  className="container-fluid w-75"
                  type="email"
                  name="email"
                  onChange={handleTextChange}
                />
              </div>

              <div className="col-4 col-md-6 col-sm-5 p-3 text-end">Password :</div>
              <div className="col-8 col-md-6 col-sm-7 p-3 text-start">
                <input
                  className="container-fluid w-75"
                  type="password"
                  name="password"
                  onChange={handleTextChange}
                />
              </div>

              <div className="col-12 p-3 text-center">
                <input type="submit" value="Submit" />
                <input type="reset" value="Clear" />
              </div>
            </div>
          </form>
        </div>
      {/* )} */}
    </>
  );
}

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
