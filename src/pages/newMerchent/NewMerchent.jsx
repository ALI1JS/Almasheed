import React, { useEffect, useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import Loading from "../../components/loading/Loading";

export default function NewMerchent() {
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");

  const sendHandeller = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await addDoc(collection(db, "merchants"), {
      area: area,
      city: city,
      companyName: companyName,
      orders: [],
      phone: phone,
      productsIds: [],
      registrationNumber: phone,
    }).then(() => {
      setArea("");
      setCity("");
      setCompanyName("");
      setPhone("");
      setLoading(false);
    });

    //   console.log(res.id)
  };
  return (
    <>
      <div className="new">
        {loading && <Loading />}
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div>
            <h1 className=" tee  ">Add new merchants</h1>

            <div className=" di">
              <form onSubmit={sendHandeller}>
                <div className=" fo">
                  <input
                    required
                    className=" te"
                    type="text"
                    placeholder="company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <input
                    required
                    className=" te"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    required
                    className=" te"
                    type="text"
                    placeholder="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <input
                    required
                    className=" te"
                    type="text"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className=" ci">
                  <button className="btn" type="submit">
                    {loading ? "Sending...." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
