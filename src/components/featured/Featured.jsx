import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { calculateLastMonthRevenue, calculateLastWeekRevenue, calculateTodayRevenue, calculateTotalRevenue, FetchOrders } from "../../helper/revenue.calc";
import { DateBicker } from "./date-picker.comp";

const Featured = () => {

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [ordersData, setOrdersData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [todaytotalRevenue, setTodayTotalRevenue] = useState(0);
  const [lastWeekRevenue, setLastWeekRevenue] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
  const [todayTarget, setTodayTarget] = useState(1000);


  const handleTarget = (e)=>{
     setTodayTarget(e.target.value);
     localStorage.setItem('target-value', e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      FetchOrders().then((orders) => {
        setOrdersData(orders);
      })
    };
    fetchData();
    setTodayTarget(localStorage.getItem('target-value'));
  }, [])


  useEffect(() => {

    const totalRevenueCalc = async () => {

      const totalRevenue = await calculateTotalRevenue(ordersData, startDate, endDate);
      setTotalRevenue(totalRevenue);
    }
    totalRevenueCalc();
  }, [startDate, endDate, ordersData])

  useEffect(() => {

    const calc = async () => {
      const todayRevenue = await calculateTodayRevenue(ordersData);
      const lastWeekRevenue = await calculateLastWeekRevenue(ordersData);
      const lastMonthRevenue = await calculateLastMonthRevenue(ordersData);

      setTodayTotalRevenue(todayRevenue);
      setLastWeekRevenue(lastWeekRevenue);
      setLastMonthRevenue(lastMonthRevenue);
    }

    calc();
  }, [ordersData]);


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={(todaytotalRevenue / todayTarget) * 100} text={`${((todaytotalRevenue / todayTarget) * 100).toFixed(2)}%`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${todaytotalRevenue}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>

        <div>
          <div className="flex justify-around">
            <h2 className="font-bold">Calculate your Revenue:</h2>
            <span className="font-bold text-2xl"> ${totalRevenue}</span>
          </div>
          <div className="w-full flex justify-between p-4">

            <DateBicker lableNmae="Start Date" setDate={(e) => { setStartDate(e.target.value) }} />
            <DateBicker lableNmae="End Date" setDate={(e) => { setEndDate(e.target.value) }} />

          </div>
        </div>


        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              {/* <KeyboardArrowDownIcon fontSize="small" /> */}
              <input
                className="py-2 px-1 rounded-md focus:outline-none focus:ring focus:border-blue-300 appearance-none"
                name="target"
                type="number"
                defaultValue={localStorage.getItem('target-value')}
                onChange={handleTarget}
              />

            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${lastWeekRevenue}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${lastMonthRevenue}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
