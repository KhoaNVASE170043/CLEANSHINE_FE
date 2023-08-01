import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CategoryAmout = () => {
  const [amount, setAmount] = useState([]);
  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchAmount = async () => {
      const res = await fetch(apiUrl + "admin/category-amount", {
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
  console.log(amount);
  return (
    <div className="row mb-3 justify-content-around">
      {amount.map((card) => (
        <Card className="col-3">
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-center"
            >
              {card.category}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-center"
            >
              {card.amount}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CategoryAmout;
