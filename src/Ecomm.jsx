import ProductsPage from "./ProductsPage"
import { useState } from "react";

export default function Ecomm() {
    let pList = [
        {
          id: "1",
          name: "Grapes",
          image: "grapes.jpg",
          unit: "kg",
          mrp: 120,
          discount: 10,
          inStock: false,
          qty: 0,
          type: "Organic",
        },
        {
          id: "2",
          name: "Mango",
          image: "mango.jpg",
          unit: "doz",
          mrp: 500,
          discount: 8,
          inStock: true,
          qty: 0,
          type: "Organic",
        },
        {
          id: "3",
          name: "Banana",
          image: "banana.jpg",
          unit: "doz",
          mrp: 60,
          discount: 0,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "4",
          name: "Apple",
          image: "apple.jpg",
          unit: "kg",
          mrp: 180,
          discount: 7,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "5",
          name: "Anjeer",
          image: "anjeer.jpg",
          unit: "kg",
          mrp: 100,
          discount: 0,
          inStock: true,
          qty: 0,
          type: "Organic",
        },
        {
          id: "6",
          name: "Strawberry",
          image: "strawberry.jpg",
          unit: "kg",
          mrp: 200,
          discount: 20,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "7",
          name: "Papaya",
          image: "papaya.jpg",
          unit: "kg",
          mrp: 50,
          discount: 15,
          inStock: true,
          qty: 0,
          type: "Organic",
        },
        {
          id: "8",
          name: "Cherry",
          image: "cherry.jpg",
          unit: "kg",
          mrp: 300,
          discount: 5,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "9",
          name: "Chikoo",
          image: "Chikoo.jpg",
          unit: "kg",
          mrp: 60,
          discount: 5,
          inStock: false,
          qty: 0,
          type: "Organic",
        },
        {
          id: "10",
          name: "Kiwi",
          image: "Kiwi.jpg",
          unit: "piece",
          mrp: 20,
          discount: 0,
          inStock: false,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "11",
          name: "Orange",
          image: "orange.jpg",
          unit: "kg",
          mrp: 200,
          discount: 10,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "12",
          name: "Pear",
          image: "pear.jpg",
          unit: "kg",
          mrp: 200,
          discount: 7,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "13",
          name: "Pineapple",
          image: "pineapple.jpg",
          unit: "piece",
          mrp: 100,
          discount: 50,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "14",
          name: "Pomegranete",
          image: "pomegranete.jpg",
          unit: "kg",
          mrp: 200,
          discount: 5,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "15",
          name: "Sitaphal",
          image: "sitaphal.jpg",
          unit: "kg",
          mrp: 100,
          discount: 10,
          inStock: true,
          qty: 0,
          type: "Organic",
        },
        {
          id: "16",
          name: "Watermelon",
          image: "watermelon.jpg",
          unit: "piece",
          mrp: 80,
          discount: 50,
          inStock: true,
          qty: 0,
          type: "Organic",
        },
        {
          id: "17",
          name: "Sweetlime",
          image: "sweetlime.jpg",
          unit: "kg",
          mrp: 200,
          discount: 5,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "18",
          name: "Peach",
          image: "peach.jpg",
          unit: "kg",
          mrp: 200,
          discount: 10,
          inStock: false,
          qty: 0,
          type: "Non-Organic",
        },
        {
          id: "19",
          name: "Dragon",
          image: "dragon.jpg",
          unit: "piece",
          mrp: 60,
          discount: 0,
          inStock: true,
          qty: 0,
          type: "Non-Organic",
        },
        
      ];

  //     let [product, setProduct] = useState(pList);

  // function handleChangeButtonClick(event) {
  //   let op = event.target.id;
  //   console.log(op);
  //   let p = { ...product };
  //   if (op == "+") {
  //     p.qty++;
  //   } else if (op == "-") {
  //     if (p.qty > 0) {
  //       p.qty--;
  //     }
  //   }
  //   p.totalqty = finalprice * p.qty;
  //   setProduct(p);
  // }

  // function handleAddtoCartButtonClick(event) {
  //   let p = { ...product };
  //   p.qty = 1;
  //   p.totalqty = finalprice * p.qty;
  //   setProduct(p);
  // }

    return (
        <>
            <div className="row">
                {pList.map((e,index) =>
                    <ProductsPage f={e} 
                    // product={product} onAddtoCartButtonClick = {handleAddtoCartButtonClick} onChangeButtonClick = {handleChangeButtonClick}
                    />
                )}
            </div>
        </>
    )
}