

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Container,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TablePagination,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function List() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [filterVal, setFilterVal] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredCount, setFilteredCount] = useState(0);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [department, setDepartment] = React.useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    try {
      return <Slide direction="up" ref={ref} {...props} />;
    } catch (error) {
      console.error("Error in Transition component:", error);
      return null;
    }
  });

  const loadUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/data/static-data"
      );
      console.log(response);
      if (response.data.length > 0) {
        setUsers(response.data);
        setFilterUsers(response.data);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setFilterUsers(users);
    } else {
      const filterResult = filterUsers.filter((item) => {
        const searchValue = e.target.value.toLowerCase();
        return Object.values(item).some((value) => {
          if (typeof value === "string" || typeof value === "number") {
            const itemValue = String(value).toLowerCase();
            return itemValue.includes(searchValue);
          }
          return false;
        });
      });
      setFilterUsers(filterResult);
      setFilteredCount(filterResult.length);
    }
    setFilterVal(e.target.value);
  };

  useEffect(() => {
    if (filteredCount < (page + 1) * rowsPerPage) {
      setPage(0);
    }
  }, [filteredCount]);

  const handleChange = (event) => {
    setDepartment(event.target.value);
    setFilterVal("");
  };

  const filterData = () => {
    const filterDepartment = users.filter(
      (item, index) => item.department === department
    );
    setFilterUsers(filterDepartment);
  };

  useEffect(() => {
    filterData();
  }, [department]);

  useEffect(() => {
    loadUser();
  }, []);

  const handleSort = (column) => {
    const newOrder = sortingOrder === "asc" ? "desc" : "asc";
    const sortedUsers = [...filterUsers].sort((a, b) => {
      if (newOrder === "asc") {
        return a[column] - b[column];
      } else {
        return b[column] - a[column];
      }
    });
    setFilterUsers(sortedUsers);
    setSortingOrder(newOrder);
    setSortedColumn(column);
  };

  return (
    <>
      <Container style={{ width: "100%" }}>
        <Grid container spacing={2} sx={{ marginTop: { xs: "20px" } }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select Department"
              size="small"
              name="department"
              select
              value={department}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Customer Service">Customer Service</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FormControl>
              <TextField
                label="Search"
                size="small"
                value={filterVal}
                onChange={(e) => handleFilter(e)}
                sx={{ mx: 3, background: "white" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Paper elevation={20}>
          <Grid
            container
            sx={{
              p: 2,
              background: "#0288d1",
              color: "white",
              marginTop: "15px",
            }}
          >
            <Grid>
              <Typography variant="h5" sx={{ mx: 3 }}>
                Senwell
              </Typography>
            </Grid>
          </Grid>
          <TableContainer className="scrollBarCss">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Employee_id
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Hire Date
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    DOB
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                    }}
                  >
                    Joining Date
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      border: "1px solid #ddd",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort("salary")}
                  >
                    Salary
                    {sortedColumn === "salary" && (
                      <IconButton size="small">
                        {sortingOrder === "asc" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filterUsers.length > 0 &&
                  filterUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <React.Fragment key={item._id}>
                        <TableRow key={index}>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.employee_id}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.first_name}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.last_name}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.department}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.Address}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.hire_date}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.dob}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.joiningDate}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              border: "1px solid #ddd",
                            }}
                          >
                            {item.salary}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          {filterUsers.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={filterUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </Paper>
      </Container>
    </>
  );
}

export default List;
