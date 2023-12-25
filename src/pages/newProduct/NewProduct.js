import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./new.scss";
import Loading from "../../components/loading/Loading";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewProduct() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [descri, setDescri] = useState("");
  const [merchName, setMerchName] = useState("");
  const [merchId, setMerchId] = useState("");
  const [merchs, setMerchs] = useState([]);
  const [price, setPrice] = useState();
  const [priceAf, setPriceAf] = useState();
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const milliseconds = String(currentDate.getMilliseconds()).padStart(6, "0");

  const idProduct = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  const idPro = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}*${milliseconds}`;

  //
  //Get merchens
  //

  useEffect(() => {
    setLoading(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "merchants"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        console.log();
      });

      setMerchs(list);
      setLoading(false);
    };

    fetchData();
  }, []);

  //Offers
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    setLoading(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "offers"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        console.log();
      });

      setOffers(list);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Categories

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        console.log(doc.id);
      });

      setCategories(list);
      setLoading(false);
    };

    fetchData();
  }, []);

  const opts = merchs.map((e, index) => {
    return (
      <option key={index} value={e.id} className=" text-black">
        {e.companyName}
      </option>
    );
  });
  const catgs = categories.map((e, index) => {
    return (
      <option key={index} value={e.id} className=" text-black">
        {e.id}
      </option>
    );
  });

  const [choosed, setChooded] = useState({});

  const choose = (id) => {
    setMerchId(id);
    let merch = merchs.filter((e) => e.id === id);
    setMerchName(merch[0].companyName);
    setChooded(merch[0]);
  };
  const [choosedCatg, setChoodedCatg] = useState("");
  const [choosedCa, setChoodedCa] = useState({});
  const choosecatg = (id) => {
    setChoodedCatg(id);
    let merch = categories.filter((e) => e.id === id);
    // setMerchName(merch[0].companyName);
    setChoodedCa(merch[0]);
  };

  const [bestSales, setBestSales] = useState({});

  useEffect(() => {
    setLoading(true);
    const res = async () => {
      const docRef = doc(db, "best_sales", "best_sales");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setLoading(false);
        setBestSales(docSnap.data());
        // setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        // console.log("No such document!");
        setLoading(false);
        // setError(true);
      }
    };

    res();
  }, []);

  //
  // Upload Image
  //
  //

  useEffect(() => {
    const uploadFile = () => {
      const namee = new Date().getTime() + file.name;
      // console.log(name)
      const storageRef = ref(storage, `products/${name}/${namee}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log("Upload is " + progress + "% done");
          setLoading(true);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              //   console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLink(downloadURL);
            setLoading(false);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);
  //
  // Add function
  //

  const sendHandeller = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const id = `${new Date().getTime()}`;
    // console.log(id)

    const res = await setDoc(doc(db, "products", idProduct), {
      merchantName: merchName,
      productCity: city,
      productDescription: descri,
      productId: idProduct,
      productName: name,
      productNewPrice: +priceAf,
      productOldPrice: +price,
      productsImages: [link],
    });

    let arrcat = choosedCa.productsIds;
    arrcat.push(idProduct);

    const catse = await setDoc(doc(db, "categories", choosedCatg), {
      categoryImage: choosedCa.categoryImage,
      categoryName: choosedCa.categoryName,
      productsIds: arrcat,
    });

    let offerarr = offers[0].productsIds;
    if (priceAf !== price) {
      offerarr.push(idProduct);
    }

    const offsend = await setDoc(doc(db, "offers", "offers"), {
      productsIds: offerarr,
    });

    var dynamicObject = bestSales;
    dynamicObject[idPro] = 0;

    // console.log(dynamicObject);
    const bestsendRef = doc(db, "best_sales", "best_sales");

    await setDoc(bestsendRef, dynamicObject);

    let arr = choosed.productsIds;
    arr.push(idProduct);

    const rsp = await setDoc(doc(db, "merchants", merchId), {
      area: choosed.area,
      city: choosed.city,
      companyName: choosed.companyName,
      orders: choosed.orders,
      phone: choosed.phone,
      productsIds: arr,
      registrationNumber: choosed.registrationNumber,
    }).then(() => {
      setCity("");
      setDescri("");
      setFile("");
      setLink("");
      setName("");
      setMerchName("");
      setMerchId("");
      setPrice("");
      setChoodedCatg("");
      setLoading(false);
    });
  };

  // var dynamicObject = {};

  return (
    <div className="new">
      {loading && <Loading />}
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div>
          <h1 className=" tee  ">Add new Prouduct</h1>
          <div className=" di">
            <form onSubmit={sendHandeller}>
              <div>
                <div>
                  <img
                    className=" h-48 w-48 mx-auto rounded-full"
                    alt="product "
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                  />
                </div>
                <div className=" grid grid-cols-12 p-6 w-dull">
                  <input
                    required
                    className="col-span-12 md:col-span-6 mx-2 my-2 p-2 outline-none border-b"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="name"
                  />

                  <select
                    required
                    value={merchId}
                    onChange={(e) => choose(e.target.value)}
                    placeholder=" Merchant Name"
                    className={`col-span-12 ${
                      merchName ? "text-black" : "text-black/30"
                    } md:col-span-6 mx-2 my-2 p-2
                  outline-none border-b`}
                  >
                    <option value="" hidden className=" text-black/30">
                      Merchant Name
                    </option>
                    {opts}
                  </select>
                  <select
                    required
                    value={choosedCatg}
                    onChange={(e) => choosecatg(e.target.value)}
                    placeholder=" Merchant Name"
                    className={`col-span-12 ${
                      choosedCatg ? "text-black" : "text-black/30"
                    } md:col-span-6 mx-2 my-2 p-2
                  outline-none border-b`}
                  >
                    <option value="" hidden className=" text-black/30">
                      categories
                    </option>
                    {catgs}
                  </select>
                  <input
                    required
                    className="col-span-12 md:col-span-6 mx-2 my-2 p-2 outline-none border-b"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="City"
                  />
                  <input
                    required
                    className="col-span-12 md:col-span-6 mx-2 my-2 p-2 outline-none border-b"
                    value={descri}
                    onChange={(e) => setDescri(e.target.value)}
                    type="text"
                    placeholder="Description"
                  />
                  <input
                    required
                    min={0}
                    className="col-span-12 md:col-span-6 mx-2 my-2 p-2 outline-none border-b"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="price"
                  />
                  <input
                    required
                    min={0}
                    className="col-span-12 md:col-span-6 mx-2 my-2 p-2 outline-none border-b"
                    value={priceAf}
                    onChange={(e) => setPriceAf(e.target.value)}
                    type="number"
                    placeholder="price after offer"
                  />
                  <div
                    className={`formInput p-2 mx-2 col-span-12 my-2 md:col-span-6 ${
                      !name && "text-black/50"
                    }`}
                  >
                    <label className=" hover:cursor-pointer" htmlFor="file">
                      Image:
                      <i className="fa-solid fa-upload"></i>
                    </label>
                    {name && (
                      <input
                        required
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className=" ci">
                <button className="btn" type="submit">
                  send
                  {/* {loading ? "Sending...." : "Send"} */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
