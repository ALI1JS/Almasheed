import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../../components/loading/Loading";

export default function ProductElement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const param = useParams();

  const id = param.productId;

  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    const res = async () => {
      const docRef = doc(db, "products", id);
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

  // console.log()

  return (
    <div>
      {loading && <Loading />}
      <div>
        {error ? (
          <div className=" text-center my-20 text-2xl font-bold  text-red-400">
            <h1>This Product doesn't exist</h1>
          </div>
        ) : (
          <div>
            {data && (
              <div className=" shadow-md my-20 mx-4 md:mx-20 p-12 ">
                <img
                  className=" w-32 h-32 shadow my-8 mx-auto rounded-full"
                  src={data.productsImages[0]}
                  alt="product"
                />
                <h1 className=" text-center text-xl font-bold my-3">
                  {data.productName}
                </h1>
                <h4 className=" text-center text-lg  my-3">
                  {data.productDescription}
                </h4>

                <div className=" p-3 border rounded-md grid grid-cols-12">
                  <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                    <h4>Merchant : </h4>
                    <h4 className=" font-bold"> {data.merchantName}</h4>
                  </div>
                  <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                    <h4>City : </h4>
                    <h4 className=" font-bold"> {data.productCity}</h4>
                  </div>
                  <div className=" flex items-center my-4 col-span-12 md:col-span-6">
                    <h4>Price : </h4>
                    <h4 className=" font-bold"> {data.productNewPrice}</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
