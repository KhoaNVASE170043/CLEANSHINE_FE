import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #397F77",
  boxShadow: 24,
  p: 4,
};

const ChooseFavouriteEmployee = (props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
    props.onAddFavourite(checked);
    handleOpen();
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUnderstood(false);
  };
  const [data, setData] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [understood, setUnderstood] = useState(false);

  const handleChooseEmployee = (id) => {
    setEmployeeId(id);
    props.onAddEmployee(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const token = sessionStorage.getItem("jwtToken");

      const req = {
        customerId: user.id,
        businessName: props.name,
        date: props.date ? props.date.$D : 26,
        month: props.date ? props.date.$M + 1 : 6,
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "customer/favourite-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(req),
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    };

    fetchData();
  }, [props.date, props.name]);
  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!understood ? (
          <Box sx={style}>
            <h5>Bạn tự chọn người làm</h5>
            <p>
              Chức năng ngày cho phép nhiều người cùng nhận công việc của bạn
            </p>
            <p>Bạn được chọn 1 trong số những người này đến làm cho mình</p>
            <p>
              Xin vui lòng chọn sớm để họ có thời gian chuẩn bị. Một tiếng trước
              khi công việc bắt đầu, nếu bạn không chọn thì hệ thống sẽ chọn hộ
              và vẫn mất phí
            </p>
            <p style={{ color: "red" }}>Phí : 20.000 đ</p>
            <Button variant="contained" onClick={() => setUnderstood(true)}>
              Chọn nhân viên{" "}
            </Button>
          </Box>
        ) : (
          <Box sx={style}>
            <p className="text-center">NHÂN VIÊN YÊU THÍCH</p>
            {data.length === 0 ? (
              <>
                <p style={{ textAlign: "center" }}>
                  Chưa có nhân viên yêu thích.
                </p>
                <p style={{ textAlign: "center" }}>
                  Hãy đặt dịch vụ ngay để có thể chọn người làm yêu thích.
                </p>
              </>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên nhân viên</th>
                    <th scope="col">Số lần đã đánh giá</th>
                    <th scope="col">Điểm trung bình</th>
                    <th scope="col">Chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>{employee.employeeName}</td>
                      <td>{employee.occurrences}</td>
                      <td>{employee.averagePoint}</td>
                      <td>
                        <input
                          type="checkbox"
                          id={employee.employeeId}
                          value={employee.employeeId}
                          checked={employeeId === employee.employeeId}
                          onChange={() =>
                            handleChooseEmployee(employee.employeeId)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Box>
        )}
      </Modal>
    </>
  );
};

export default ChooseFavouriteEmployee;
