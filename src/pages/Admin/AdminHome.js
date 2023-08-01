import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./AdminHome.module.css";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Bar, PieChart, Pie, Cell } from "recharts";
import { Autocomplete, TextField } from "@mui/material";
import CategoryAmout from "../../components/Admin/CategoryAmout";

const COLORS = ["#79B7D4", "#B9FAF5", "#AEEBDC", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  const value = payload.value;

  if (Number.isInteger(value)) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {value}
        </text>
      </g>
    );
  }
  return null;
};

const AdminHome = () => {
  // const data = useLoaderData();
  // const [pieChartData, setPieChartData] = useState([]);

  // let serviceList = new Set();
  // {
  //   data.forEach((service) => serviceList.add(service.name));
  //   serviceList = Array.from(serviceList);
  // }
  // const [selectedField, setSelectedField] = useState(serviceList[0]);
  // const selectedData = data.filter((item) => item.name === selectedField);
  // const handleSelect = (event, service) => {
  //   setSelectedField(service);
  // };

  // useEffect(() => {
  //   const token = sessionStorage.getItem("jwtToken");
  //   const apiUrl = process.env.REACT_APP_API_URL;
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(apiUrl + "admin/amount", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!res.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const dataPie = await res.json();
  //       setPieChartData(dataPie);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // const dataMap = new Map();
  // const daysOfWeek = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  // const vietnamWeekdayFormatter = (weekday) => {
  //   const weekdayLabels = {
  //     Monday: "Thứ Hai",
  //     Tuesday: "Thứ Ba",
  //     Wednesday: "Thứ Tư",
  //     Thursday: "Thứ Năm",
  //     Friday: "Thứ Sáu",
  //     Saturday: "Thứ Bảy",
  //     Sunday: "Chủ Nhật",
  //   };
  //   return weekdayLabels[weekday];
  // };
  // daysOfWeek.forEach((day) => {
  //   dataMap.set(day, { day, amount: 0 });
  // });
  // selectedData.forEach((service) => {
  //   if (dataMap.has(service.day)) {
  //     dataMap.set(service.day, { day: service.day, amount: service.amount });
  //   }
  // });
  // const chartData = Array.from(dataMap.values());
  return <></>;
};

export default AdminHome;

// export async function businessInWeek() {
//   const token = sessionStorage.getItem("jwtToken");
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const res = await fetch(apiUrl + "admin/bill-by-week", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!res.ok) {
//     throw new Error("error");
//   } else {
//     const data = await res.json();
//     return data;
//   }
// }
