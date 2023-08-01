import { Box, Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CategoryAmount = () => {

  const [amount, setAmount] = useState([]);
  console.log(amount);

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchAmount = async () => {
      const res = await fetch(apiUrl + "admin/amount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setAmount(data);
    };
    fetchAmount();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2vw 0 0"
        }}
      >
        {
          amount.map((item) => {
            return (
              <Paper
                style={{
                  display: "flex",
                  width: "13vw",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "1vh 2vw 0 2vw",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "17px",
                    opacity: "70%",
                    padding: "0"
                  }}
                >{item.category}</Typography>
                <Typography
                  sx={{
                    fontSize: "50px",
                  }}
                >{item.amount}</Typography>
              </Paper>
            );
          })
        }
      </div>
    </div>
  );
};

export default CategoryAmount;
