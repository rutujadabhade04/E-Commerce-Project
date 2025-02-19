import Product from "./Product";
import NavBar from "./NavBar";

export default function ProductsPage(props) {
 // let { product } = props;
 let {fruitsList} = props
  // let { p } = props;
  function handleChangeButtonClick(op,f){
    props.onChangeButtonClick(op,f);
  }
 
  return (
    <>
      <div className="row text-center p-0 ">
        {fruitsList.map((e, index) => (
          <Product f={e} key={index} index={index} onChangeButtonClick={handleChangeButtonClick}/>
        ))}
      </div>
    </>
  );
}