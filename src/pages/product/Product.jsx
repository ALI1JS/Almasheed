import React, { useEffect, useState } from "react";
import "./style.css";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";

export default function Product() {
  const [load, setLoad] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoad(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });

      setData(list);
      setLoad(false);
    };

    fetchData();
  }, [refresh]);

  //
  // Delete Function
  //

  const handelDelete = async (id) => {
    setLoad(true);
    await deleteDoc(doc(db, "products", id));
    setLoad(false);
    setRefresh(!refresh);
  };

  //
  // Maping
  //

  const show = data.map((e, index) => {
    return (
      <tr key={index}>
        <th className="  tbo">
          <img className=" h-12 w-12 mx-auto" alt="product" src={e.productsImages[0]} />
        </th>
        <th className="  tbo">{e.productName}</th>
        <th className="  tbo">{e.merchantName}</th>
        <th className="  tbo">{e.productDescription}</th>
        <th className="  tbo">{e.productCity}</th>
        <th className="  tbo">{e.productNewPrice}</th>
        <th className=" sh  tbo">
          <Link to={e.id}>
            <i className="fa-solid fa-eye"></i>
          </Link>
        </th>
        <th className=" del tbo">
          <button onClick={() => handelDelete(e.id)}>
            {" "}
            <i className="fa-solid fa-trash"></i>
          </button>
        </th>
      </tr>
    );
  });
  return (
    <div className="relative">
      {load && <Loading />}

      <div>
        <h1 className=" head">products</h1>
      </div>
      <div className="cont">
        <table className="table">
          <thead>
            <tr className="trhead">
              <th className=" thead">Image</th>
              <th className=" thead">Name</th>
              <th className=" thead">Merchant Name</th>
              <th className=" thead">Description</th>
              <th className=" thead">City</th>
              <th className=" thead">Price</th>
              <th className=" thead">view</th>
              <th className=" thead">Delete</th>
            </tr>
          </thead>
          <tbody>{show}</tbody>
        </table>

        <div className=" li">
          <Link to="new">Add Product</Link>
        </div>
      </div>
    </div>
  );
}
