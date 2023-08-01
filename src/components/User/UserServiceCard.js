import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../Title";
import { Card, CardMedia } from "@mui/material";
const UserServiceCard = (props) => {
  const nav = useNavigate();
  const clickHandler = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    let req = {
      id: props.id,
    };
    const response = await fetch(apiUrl + "service-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("service-detail", JSON.stringify(data));
      nav("/user/service-detail");
    }
  };
  return (
    <div className="col-lg-3 col-sm-12 py-3" onClick={clickHandler}>
      <Card
        sx={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderRadius: "30%",
        }}
      >
        <CardMedia component="img" image={props.img} />
      </Card>

      <Title
        title={props.title}
        color="#000000"
        fontSize="20px"
        fontWeitgh="600"
      />
    </div>
  );
};

export default UserServiceCard;
