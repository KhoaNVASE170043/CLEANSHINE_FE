import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CategoryAmount from "../../components/Admin/CategoryAmount";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const COLORS = ["#EC6940", "#2B82B4", "#A2D59F", "#F4A761", "#F4A761"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    amount,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        style={{ fontSize: "20px" }}
      >
        {payload.category}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Số lượng ${amount}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Tỉ lệ ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const AdminHome = () => {
  const [data, setData] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();
  const [processDate, setProcessDate] = useState();

  const onPieEnter = (event, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (dayStart !== undefined && dayEnd !== undefined) {
      let formattedStartDate = dayStart.toISOString().split("T")[0];
      let formattedEndDate = dayEnd.toISOString().split("T")[0];
      let dateReq = {
        dateStart: formattedStartDate,
        dateEnd: formattedEndDate,
      };
      setProcessDate(dateReq);
    }
  }, [dayStart, dayEnd]);

  useEffect(() => {
    async function processData() {
      const token = sessionStorage.getItem("jwtToken");
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(apiUrl + "admin/amount", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(processDate),
      });
      if (!res.ok) {
        throw new Error("error");
      } else {
        const fetchedData = await res.json();
        setData(fetchedData);
        console.log(data);
      }
    }
    if (dayStart !== undefined && dayEnd !== undefined) {
      processData();
    }
  }, [processDate]);

  return (
    <>
      {/* <CategoryAmount /> */}
      <div
        className="container d-flex mt-5"
        style={{ height: "60vh", justifyContent: "space-between" }}
      >
        {/* <ResponsiveContainer width="45%" height="100%"> */}
        {/* <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={110}
            outerRadius={140}
            dataKey="amount"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart> */}
        {/* </ResponsiveContainer> */}
        <div style={{ width: "40%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Chọn ngày bắt đầu"
              format="DD/MM/YYYY"
              // value={dayStart}
              onChange={(date) => setDayStart(date)}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Chọn ngày kết thúc"
              format="DD/MM/YYYY"
              // value={dayEnd}
              onChange={(date) => setDayEnd(date)}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
