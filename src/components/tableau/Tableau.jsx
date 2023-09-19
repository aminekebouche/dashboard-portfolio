import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable(props) {
  const columns = props.columns;
  const rows = props.rows;
  const height = props.height.h;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const returns = (value) => {
    if (Array.isArray(value)) return value.length;
    if (typeof value === "object") return Object.keys(value).length;
    return value;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: { height } }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      console.log(rows);
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(() => {
                            if (column.id === "icone") {
                              return (
                                <img
                                  src={row[column.id]}
                                  alt="icone"
                                  style={{ width: "60px", height: "60px" }}
                                />
                              );
                            } else if (column.id === "edit") {
                              return <props.fun row={row} />;
                            } else {
                              return returns(value);
                            }
                          })()}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
