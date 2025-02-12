export default function Login(props){
    let {view} = props;
    
    return(
        <>
            {view == "login" && (
        <div className="logindesign"> Login
          <div className="row w-50 mx-auto mt-3 pb-5 bg bg-danger-subtle border border-danger border-2">
            <div className="col-4 col-md-6 col-sm-5 p-3 text-end">Email-id :</div>
            <div className="col-8 col-md-6 col-sm-7 p-3 text-start">
              <input className="container-fluid w-75" type="email" />
            </div>
            <div class="col-4 col-md-6 col-sm-5 p-3 text-end">Password :</div>
            <div className="col-8 col-md-6 col-sm-7 text-start">
              <input className="container-fluid w-75" type="password" />
            </div>
            <div className="col-12 p-3 text-center">
              <input type="submit" value="Submit"/>
              <input type="reset" value="Clear" />
            </div>
          </div>
        </div>
      )}
        </>
    )
}