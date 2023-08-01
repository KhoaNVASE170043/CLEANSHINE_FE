import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const PriceHistory = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchData = async () => {
      const res = await fetch(apiUrl + "admin/price-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setList(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Lịch sử thay đổi giá
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 750 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">STT</TableCell>
                <TableCell align="left">Dịch vụ</TableCell>
                <TableCell align="left">Loại</TableCell>
                <TableCell align="left">Giá cũ&nbsp;(VND)</TableCell>
                <TableCell align="left">Giá mới&nbsp;(VND)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.serviceName}</TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">
                    {row.previousPrice.toLocaleString()}
                  </TableCell>
                  <TableCell align="left">
                    {row.newPrice.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </div>
  );
};

export default PriceHistory;
