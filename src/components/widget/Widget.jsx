import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
/********************************************************************************************** */
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FetchOrders, calculateTodayRevenue } from "../../helper/revenue.calc";



const Widget = ({ type }) => {
  let data;
  //temporary
  const amount = 100;
  const diff = 20;

  /************************************************************************* */

  const [load, setLoad] = useState(false);
  const [loadM, setLoadM] = useState(false);
  const [loadP, setLoadP] = useState(false);
  const [info, setInfo] = useState([]);/**custumer */
  const [merch, setMerch] = useState([]);/**Merchent */
  const [product, setProduct] = useState([]);/**Product */
  const [todaytotalRevenue, setTodayTotalRevenue] = useState(0);
  const [ordersData, setOrdersData] = useState([]);
  useEffect(() => {
    setLoad(true);
    let list = [];
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "customers"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });

      setInfo(list);
      setLoad(false);
    };

    /***************************** */
    setLoadM(true);
    let listM = [];
    const fetchDataM = async () => {
      const querySnapshot = await getDocs(collection(db, "merchants"));
      querySnapshot.forEach((doc) => {
        listM.push({ id: doc.id, ...doc.data() });
      });

      setMerch(listM);
      setLoadM(false);
    };

    fetchDataM();
    
    /***************************** */
    /****************************** */
    setLoadP(true);
    let listP = [];
    const fetchDataP = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        listP.push({ id: doc.id, ...doc.data() });
        // console.log(doc.id, " => ", doc.data());
      });

      setProduct(listP);
      setLoadP(false);
    };

    fetchDataP();
    /****************************** */

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      FetchOrders().then((orders) => {
        setOrdersData(orders);
      })
    };
    fetchData();
  }, [])

  useEffect(() => {

    const calc = async () => {
      const todayRevenue = await calculateTodayRevenue(ordersData);
      setTodayTotalRevenue(todayRevenue);
    }

    calc();
  }, [ordersData]);

  switch (type) {
    case "user":
      data = {
        title: "CUSTOMERS",
        isMoney: false,
        count: info.length,
        link: (
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <span>See All Customers</span>
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "MERCHANTS",
        isMoney: false,
        count: merch.length,
        link: (
          <Link to="/merchants" style={{ textDecoration: "none" }}>
             <span>See All Merchants</span>
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        count: product.length,
        link: (
          <Link to="/products" style={{ textDecoration: "none" }}>
            <span>See All Products</span>
          </Link>
        ),
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney:  true,
        mount: todaytotalRevenue,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && `${data.mount} $`} {data.count} 
        </span>
        <span className="link">{data.link} </span>
      </div>

      <div className="right">
        <div className="percentage positive"></div>
        {data.icon}
      </div>


    </div>
  );
};

export default Widget;