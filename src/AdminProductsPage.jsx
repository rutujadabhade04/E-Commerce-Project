import AdminProduct from "./AdminProduct";
//import AdminAddEditForm from "./AdminAddEditForm";
import { useState } from "react";
import AdminProductForm from "./AdminProductForm";

export default function AdminProductsPage(props) {
  let { fruitsList } = props;
  let [adminView, setAdminView] = useState("list");
  let [selectedProduct, setSelectedProduct] = useState("");

  function handleEditButtonClick(product) {
    // props.onEditButtonClick(product);
    console.log(product);
    console.log("handle button pg");
    setAdminView("edit");
    setSelectedProduct(product);
  }

  function handleDeleteButtonClick(product, flag) {
    props.onDeleteButtonClick(product, flag);
  }

  function handleProductAddEditFormSubmit(product) {
    console.log("product in adminproduct pg");
    console.log(product);
    if(adminView == "edit"){
    console.log("for Edit");
    let list = [...fruitsList]; // copy of array object ... rest parameters
    list = list.map((e, index) => {
      if (e.id == product.id) {
        return product;
      } else {
        return e;
      }
    });
    //adminView("list")
    props.onProductEditFormSubmit(list);
    //adminView("list")
    }

    else if(adminView == "add"){
    console.log("for Add");
    console.log(product);
    let list = [...fruitsList];
    list.push(product);
    props.onProductAddFormSubmit(list);
    //adminView("list")
    //console.log(list);
    }
  }

  function handleProductListClick() {
    setAdminView("list");
  }

  function handleProductAddNewClick() {
    setAdminView("add");
  }

  return (
    <>
      {adminView == "list" && (
        <div className="text-center text-danger w-25 admin text">
          <a href="#" onClick={handleProductAddNewClick}>
            Add new Product
          </a>
        </div>
      )}

      {(adminView == "add" || adminView == "edit") && (
        <AdminProductForm
          selectedProduct={selectedProduct}
          adminView={adminView}
          onProductEditFormSubmit={handleProductAddEditFormSubmit}
          onProductListClick={handleProductListClick}
          onProductAddFormSubmit={handleProductAddEditFormSubmit}
          onProductAddNewClick={handleProductAddNewClick}
        />
      )}

      {adminView == "list" && (
        <div className="row text-center p-0 m-5">
          {fruitsList.map((e, index) => (
            <AdminProduct
              f={e}
              key={index}
              index={index}
              onEditButtonClick={handleEditButtonClick}
              onDeleteButtonClick={handleDeleteButtonClick}
            />
          ))}
        </div>
      )}
    </>


);
}
