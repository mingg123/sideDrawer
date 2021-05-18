import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import drawerStore from "./drawerStore";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  list: {
    width: 700,
  },
});

function createData(name, status, starttime, endtime, elapsedtime) {
  return { name, status, starttime, endtime, elapsedtime };
}

const rows = [
  createData("temp1", "Finished", 2021.05, 2026.06, "1second"),
  createData("temp2", "Running", 2021.06, 2025.06, "1second"),
  createData("temp3", "Stop", 2021.07, 2024.06, "1second"),
  createData("temp4", "Running", 2021.08, 2023.06, "1second"),
  createData("temp5", "Finished", 2021.09, 2022.06, "1second"),
];

// @inject("drawerStore")
const tableExample = observer(() => {
  const classes = useStyles();

  const [state, setState] = React.useState(false);
  // const store = drawerStore();

  const toggleDrawer = (open) => (event) => {
    console.log("toggleDrawer Open!");
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // setState(true);
    drawerStore.onClickDrawerOpen = open;
  };

  const list = () => (
    <div className={classes.list} role="presentation">
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Drawer
              anchor={"right"}
              open={drawerStore.onClickDrawerOpen}
              // onClose={toggleDrawer(false)}
              onClose={(e) => {
                // store.onClickDrawerOpen = false;
              }}
            >
              {list()}
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
                drawerStore.onClickRowId = row.name;
                console.log(drawerStore.onClickRowId);
                drawerStore.onClickDrawerOpen = true;
                // toggleDrawer(true);
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.starttime}</TableCell>
              <TableCell align="right">{row.endtime}</TableCell>
              <TableCell align="right">{row.elapsedtime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
export default tableExample;
