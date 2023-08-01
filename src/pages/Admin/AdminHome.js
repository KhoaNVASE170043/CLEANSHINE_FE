import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./AdminHome.module.css";
import { Autocomplete, TextField } from "@mui/material";
import CategoryAmount from "../../components/Admin/CategoryAmount";

const AdminHome = () => {
  const data = useLoaderData();
  console.log("data", data);
  return <>
    <CategoryAmount />
  </>;
};

export default AdminHome;

export async function businessInWeek() {
  const token = sessionStorage.getItem("jwtToken");
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "admin/amount", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("error");
  } else {
    const data = await res.json();
    return data;
  }
}
