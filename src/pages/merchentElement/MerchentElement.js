import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function MerchentElement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const param = useParams();
  const id = param.userId;

  useEffect(() => {
    setLoading(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });

      setProducts(list);
      //   setLoad(false);
    };

    fetchData();
    const res = async () => {
      const docRef = doc(db, "merchants", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setLoading(false);
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        // console.log("No such document!");
        setLoading(false);
        setError(true);
      }
    };
    res();
  }, []);

  let show;
  //   let ele = [];

  if (!!data) {
    show = products.map((e, index) => {
      let ele = data.productsIds.filter((el) => el === e.id);

      if (ele.length > 0) {
        return (
          <tr key={index}>
            <th className="tbo">
              <img
                className=" h-12 mx-auto w-12"
                src={e.productsImages[0]}
                alt="product"
              />
            </th>
            <th className="tbo">{e.productName}</th>
            <th className="tbo">{e.productName}</th>
            <th className="tbo">{e.productCity}</th>
            <th className="tbo">{e.productNewPrice}</th>
            <th className="tbo sh">
              <Link to={`/products/${e.id}`}>
                <i className="fa-solid fa-eye"></i>
              </Link>
            </th>
          </tr>
        );
      }
    });
  }

  return (
    <div>
      {loading && <Loading />}
      {error ? (
        <div className=" text-center my-20 text-2xl font-bold  text-red-400">
          <h1>This Merchant doesn't exist</h1>
        </div>
      ) : (
        <div>
          {data && (
            <div className=" shadow-md my-20 mx-4 md:mx-20 p-12 ">
              <div className=" p-3 border rounded-md grid grid-cols-12">
                <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                  <h4>Merchant : </h4>
                  <h4 className=" font-bold"> {data.companyName}</h4>
                </div>
                <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                  <h4>Phone : </h4>
                  <h4 className=" font-bold"> {data.phone}</h4>
                </div>
                <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                  <h4>City : </h4>
                  <h4 className=" font-bold"> {data.city}</h4>
                </div>
                <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                  <h4>Area : </h4>
                  <h4 className=" font-bold"> {data.area}</h4>
                </div>
              </div>

              <h1 className=" text-2xl font-bold text-sky-600 my-6 text-center ">
                Products
              </h1>

              <table className="table">
                <thead>
                  <tr className="trhead">
                    <th className=" thead">Image</th>
                    <th className=" thead">Name</th>
                    {/* <th className=" thead">Merchant Name</th> */}
                    <th className=" thead">Description</th>
                    <th className=" thead">City</th>
                    <th className=" thead">Price</th>
                    <th className=" thead">view</th>
                    {/* <th className=" thead">Delete</th> */}
                  </tr>
                </thead>
                <tbody>{show}</tbody>
              </table>
              {/* {show} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
