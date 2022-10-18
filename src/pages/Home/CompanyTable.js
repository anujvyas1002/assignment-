import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
export const CompanyTable = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //employee data
  const [companys, setCompanys] = useState([]);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // pagination set new Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function saveData(company) {
    axios.post("http://localhost:3000/saveData", company).then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log("200 success");
      } else if (response.status === 201) {
        console.log("201 Created");
      } else if (response.status === 400) {
        console.log("400 Bad Request");
      } else if (response.status === 404) {
        console.log("404 Not Found");
      } else if (response.status === 500) {
        console.log("500 Internal Server Error");
      } else {
        console.log("other error");
      }
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/company`).then((response) => {
      if (response.status === 200) {
        setCompanys(response.data);
      } else if (response.status === 201) {
        console.log("201 Created");
      } else if (response.status === 400) {
        console.log("400 Bad Request");
      } else if (response.status === 404) {
        console.log("404 Not Found");
      } else if (response.status === 500) {
        console.log("500 Internal Server Error");
      } else {
        console.log("other error");
      }
    });
  }, []);

  return (
    <>
      <div>
        {/* table */}
        <Paper sx={{ width: "100%", mb: 0, mt: 5 }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              className="table table-striped table-hover"
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell> Stock</TableCell>
                  <TableCell> Market Cap </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companys
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company) => (
                    <TableRow
                      key={company.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{company.companyName}</TableCell>
                      <TableCell>{company.stock}</TableCell>
                      <TableCell>{company.marketCap}</TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="contained"
                          onClick={() => saveData(company)}
                          color="primary"
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* table pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={companys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};
