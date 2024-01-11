import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";


export const FetchOrders = async () => {
    try {
      const orderCollection = collection(db, 'orders');
      const q = query(orderCollection)
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((order) => {
        orders.push({ id: order.id, ...order.data() });
      })
      return orders;
    } catch (error) {
      console.log(error)
    }
  };



  export const calculateTodayRevenue = async (ordersData) => {
    const date = new Date();
    const today = String(date.getDate()).padStart(2, '0');

    let todayRevenue = 0;
    ordersData.forEach((order) => {
      const orderDay = order.date.split(' ')[0].split('-')[2];
      if (orderDay === today)
        todayRevenue += order.totalPrice;

    })
    
      return todayRevenue;
  }


  export const calculateTotalRevenue = async (ordersData, startDate, endDate) => {

    let total = 0;
    ordersData.forEach((order) => {
      const date = order.date.split(' ')[0];
      if (date >= startDate && date <= endDate) {
        total += order.totalPrice;
      }
    })
    return total;
  }


  export const calculateLastWeekRevenue = async (ordersData)=>{
    const today =  String(new Date().getDate()).padStart(2, '0');

    let startWeek;
    const diff = today - 7;

    if (diff < 10)
      startWeek =  `0${diff}`;

   startWeek = today - 7;
    console.log(startWeek)
    let totalPrice = 0;
    ordersData.forEach((order)=>{
        
     const orderDay = order.date.split(' ')[0].split('-')[2];
       
        if (orderDay >= startWeek && orderDay < today )
           totalPrice += order.totalPrice;
    })

    return totalPrice;
}


export const calculateLastMonthRevenue = async (ordersData)=>{
    const month =  new Date().getMonth() + 1;
    let prevMonth;


    if (month === 1)
      prevMonth = 12;

   else
    prevMonth = month - 1;

    let totalPrice = 0;
    ordersData.forEach((order)=>{
        
     const orderMonth = order.date.split(' ')[0].split('-')[1];
        if (Number(orderMonth) === prevMonth )
           totalPrice += order.totalPrice;
    })

    return totalPrice;
}