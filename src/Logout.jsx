export default function Logout(props) {
    let {message} = props;
    return(
        <>
        <div className="row bg-danger-subtle w-25 logout admin p-3">{message}</div>
        </>
    )
}