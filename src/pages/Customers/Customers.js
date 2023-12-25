import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Customers() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoad(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "customers"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });

      setData(list);
      setLoad(false);
    };

    fetchData();
  }, []);

  const show = data.map((e, index) => {
    return (
      <tr key={index}>
        <th className=" text-start  tbo">{e.phone}</th>

        <th className=" text-end sh  tbo">
          <Link to={e.id}>
            <i className="fa-solid fa-eye"></i>
          </Link>
        </th>
      </tr>
    );
  });
  return (
    <div>
      {load && <Loading />}
      <div>
        <h1 className=" head">Customers</h1>
        <div className="cont">
          <table className="table">
            <thead>
              <tr className="trhead">
                <th className=" text-start thead">Phone</th>
                <th className=" text-end thead">view</th>
              </tr>
            </thead>
            <tbody>{show}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
