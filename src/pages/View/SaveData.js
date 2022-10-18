import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import RemoveData from "./RemoveData";
export const SaveData = () => {
  // handle for pagination data
  const [page, setPage] = useState(0);

  //employee data
  const [companys, setCompanys] = useState([]);

  //remove data
  const [company, setCompany] = useState([]);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //state for open remove company ConfirmBox
  const [isRemove, setRemove] = useState(false);

  // pagination set new Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //on click of remove Company ConfirmBox open
  const openConfirmBox = (company) => {
    setRemove(true);
    setCompany(company);
    fetchAllRecord();
  };

  //close ConfirmBox
  const onCloseConfirmBox = () => {
    setRemove(false);
  };

  //refresh table after Remove Company
  const onRemoveCompany = () => {
    setRemove(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/saveData`).then((response) => {
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

  //All Data get Api fir function calling
  function fetchAllRecord() {
    axios.get(`http://localhost:3000/saveData`).then((response) => {
      setCompanys(response.data);
    });
  }

  return (
    <>
      <div>
        {/* table */}

        <Dialog
          open={isRemove}
          onClose={onCloseConfirmBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <RemoveData
            onRemoveEmployee={onRemoveCompany}
            onClose={onCloseConfirmBox}
            company={company}
            fetchAllRecord={fetchAllRecord}
          ></RemoveData>
        </Dialog>

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
                          onClick={() => openConfirmBox(company)}
                          color="primary"
                        >
                          delete
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
