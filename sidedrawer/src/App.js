import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Divider, Drawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import content from "./content";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    width: 700,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    flex: 1,
    flexBasis: "600px",
    fontSize: "2rem",
  },
  icon: {
    flex: 1,
  },
});

function createData(name, status, starttime, endtime, elapsedtime) {
  return { name, status, starttime, endtime, elapsedtime };
}

const rows = [
  createData("work1", "Finished", 2021.05, 2026.06, "1second"),
  createData("work2", "Running", 2021.06, 2025.06, "2second"),
  createData("work3", "Stop", 2021.07, 2024.06, "3second"),
  createData("work4", "Running", 2021.08, 2023.06, "4second"),
  createData("work5", "Finished", 2021.09, 2022.06, "5second"),
];

export default function TableExample() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [onClickRow, setOnClickRow] = React.useState({});

  const drawer = () => (
    <div>
      <div className={classes.container} role="presentation">
        <div className={classes.title}>{name}</div>
        <div className={classes.icon}>
          {open && (
            <CloseIcon
              onClick={(e) => {
                setOpen(false);
              }}
            />
          )}
        </div>
      </div>
      <Divider />
      <div>{content(onClickRow)}</div>
    </div>
  );

  return (
    <TableContainer component={Paper}>
      <Table
        style={{
          minWidth: 650,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <Drawer
              anchor={"right"}
              open={open}
              onClose={(e) => {
                if (
                  e.type === "keydown" &&
                  (e.key === "Tab" || e.key === "Shift")
                ) {
                  return;
                }
                setOpen(false);
              }}
            >
              {drawer()}
            </Drawer>
            <TableCell>Name </TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">ElapsedTime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              onClick={(e) => {
                setOpen(true);
                setName(row.name);
                setOnClickRow(row);
                console.log(onClickRow.status);
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell
                style={{
                  color:
                    row.status == "Running"
                      ? "blue"
                      : row.status == "Finished"
                      ? "green"
                      : "red",
                }}
                align="right"
              >
                {row.status}
              </TableCell>
              <TableCell align="right">{row.starttime}</TableCell>
              <TableCell align="right">{row.endtime}</TableCell>
              <TableCell align="right">{row.elapsedtime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
