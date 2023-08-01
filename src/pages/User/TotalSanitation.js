import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Grid, TextField, Paper, Breadcrumbs, Typography } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./ElectronicCleaning.css";
import OrderSumation from "./OrderSumation";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { BiCartAdd } from "react-icons/bi";
import ChooseFavouriteEmployee from "../../components/User/ChooseFavouriteEmployee";
import Swal from "sweetalert2";
import dayjs from "dayjs";
const AntTabs = styled(Tabs)({});
const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(2),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: "Montserrat, sans-serif",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const CleanFreq = ["Hàng tuần", "Hàng tháng", "Một lần"];

export default function FabricCleaning() {
  const nav = useNavigate();
  const [value, setValue] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedFreq, setSelectedFreq] = useState();
  const [note, setNote] = useState("");
  const data = useLoaderData();
  const [employeeId, setEmployeeId] = useState(null);
  const [isOn, setOn] = useState(false);
  const DATA = data
    .filter((item) => item.name === "Tổng vệ sinh")
    .map((item) => ({
      id: item.serviceId,
      type: item.type,
      price: item.price,
      detail: item.detail,
    }));
  const selectedService = DATA.find(
    (service) => service.id === selectedServiceId
  );
  const firstOption = DATA.filter((item) => item.type === "Tối đa 80m2").map(
    (item) => ({
      value: item.id,
      label: item.detail,
    })
  );

  const secondOption = DATA.filter((item) => item.type === "Tối đa 100m2").map(
    (item) => ({
      value: item.id,
      label: item.detail,
    })
  );

  const thirdOption = DATA.filter((item) => item.type === "Tối đa 150m2").map(
    (item) => ({
      value: item.id,
      label: item.detail,
    })
  );
  const handleEmloyee = (employee) => {
    setEmployeeId(employee);
  };
  const handleFavourite = (isOn) => {
    setOn(isOn);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowForm(true);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    setSelectedDate();
    setSelectedTime();
    setSelectedFreq();
    setSelectedServiceId();
    setNote("");
    setShowForm(true);
  }, [value]);
  const handleServiceChange = (event) => {
    setSelectedServiceId(() => event.target.value);
  };

  const addServiceHandler = () => {
    if (
      selectedDate === undefined ||
      selectedFreq === "" ||
      selectedTime === undefined ||
      selectedServiceId === ""
    ) {
      Swal.fire({
        title: "Vui lòng nhập đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
    const date = selectedDate.$D;
    const dayParse = new Date(selectedDate.$d);
    const day = dayParse.toLocaleDateString("en-US", { weekday: "long" });
    const month = selectedDate.$M;
    const timeParse = new Date(selectedTime.$d);
    const hour = timeParse.getHours() + ":" + timeParse.getMinutes();
    let frequency;
    if (selectedFreq === "Hàng tuần") {
      frequency = "Hàng tuần";
    } else if (selectedFreq === "Hàng tháng") {
      frequency = "Hàng tháng";
    } else {
      frequency = "Một lần";
    }
    let totalPrice = selectedService.price;
    if (isOn) {
      totalPrice += 20000;
    }
    let service = {
      businessId: selectedService.id,
      name: "Tổng vệ sinh",
      note: note,
      date: date,
      month: month + 1,
      day: day,
      hour: hour,
      frequency: frequency,
      price: totalPrice,
      type: selectedService.type,
      favouriteEmployee: isOn,
      employeeId: employeeId,
    };
    sessionStorage.setItem("cart", JSON.stringify(service));
    nav();
  };

  const OptionalSection = ({ options }) => (
    <Grid container spacing={5} justifyContent="center" marginRight={1}>
      <Grid item>
        <TextField
          label="Chọn dịch vụ"
          select
          value={selectedService ? selectedService.id : ""}
          onChange={handleServiceChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          select
          label="Chọn tần suất"
          value={selectedFreq}
          onChange={(event) => setSelectedFreq(event.target.value)}
        >
          {CleanFreq.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "none", p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ mb: 3 }}>
          <Typography>Dịch vụ</Typography>
          <Typography color="text.primary">Tổng vệ sinh</Typography>
        </Breadcrumbs>
        {showForm && (
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { mt: 5, width: "30ch" },
              display: "flex",
            }}
            noValidate
            autoComplete="off"
            className="row"
          >
            <Paper
              className="col-lg-6 col-sm-12"
              sx={{
                flexGrow: 1,
                width: "50%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <AntTabs
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  value={value}
                  onChange={handleChange}
                  aria-label="ant example"
                >
                  <AntTab label="Tối đa 80m2" />
                  <AntTab label="Tối đa 100m2" />
                  <AntTab label="Tối đa 150m2" />
                </AntTabs>
              </Box>
              {showForm && (
                <OptionalSection
                  options={
                    value === 0
                      ? firstOption
                      : value === 1
                      ? secondOption
                      : thirdOption
                  }
                />
              )}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container flex justifyContent={"center"}>
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem>
                      <DatePicker
                        disablePast
                        label="Chọn ngày"
                        format="DD/MM/YYYY"
                        value={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                      />
                    </DemoItem>
                    <DemoItem>
                      <TimePicker
                        sx={{ marginLeft: "27px" }}
                        value={selectedTime}
                        onChange={(time) => setSelectedTime(time)}
                        label="Chọn giờ"
                        format="hh:mm"
                        ampm={false}
                        minTime={dayjs().set("hour", 8)}
                        maxTime={dayjs().set("hour", 20)}
                      />
                    </DemoItem>
                  </DemoContainer>
                </Grid>
                <Grid
                  container
                  flex
                  justifyContent={"center"}
                  marginTop={2}
                  alignItems={"center"}
                >
                  <Grid item xs={4} marginLeft={2}>
                    <span>Chọn nhân viên yêu thích</span>
                  </Grid>
                  <Grid item xs={6}>
                    <ChooseFavouriteEmployee
                      name="Tổng vệ sinh"
                      onAddEmployee={handleEmloyee}
                      onAddFavourite={handleFavourite}
                      date={selectedDate}
                    />
                  </Grid>
                </Grid>
                <div className="row justify-content-center mt-4">
                  <div className="col-10">
                    <textarea
                      class="form-control"
                      placeholder="Nếu bạn có ghi chú, hãy ghi lại để chúng tôi biết nhé ..."
                      onChange={handleNoteChange}
                      maxLength={100}
                      rows={3}
                      id="floatingTextarea"
                    />
                  </div>
                </div>
                <Grid container flex sx={{ justifyContent: "center", m: 4 }}>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/user"
                      sx={{
                        borderColor: "#397F77",
                        color: "#397F77",
                        "&:hover": {
                          borderColor: "#397F77",
                          color: "#397F77",
                        },
                      }}
                    >
                      Quay lại trang chủ
                    </Button>
                  </Grid>
                  <Grid item xs={5}>
                    <Button
                      variant="contained"
                      onClick={addServiceHandler}
                      startIcon={<BiCartAdd />}
                      sx={{
                        backgroundColor: "#397F77",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#397F77",
                        },
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Paper>
            <div className="col-lg-5 col-sm-12">
              <OrderSumation />
            </div>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export async function loader() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const res = await fetch(apiUrl + "services");
  if (!res.ok) {
    throw new Error("error");
  } else {
    const data = await res.json();
    return data;
  }
}
