import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  empty: {
    height: "300px",
    marginTop: "20px",
    marginBottom: "20px",
    backgroundColor: "#E2E2E2",
  },
  status: {
    flex: "1",
    flexBasis: "50",
    marginBottom: "10px",
  },
  time: {
    flex: "1",
    marginBottom: "10px",
  },
  elapsetime: {
    flex: "1",
    marginBottom: "10px",
  },
  marginL: {
    marginLeft: "100px",
  },
  fontW: {
    fontWeight: "bolder",
    fontSize: "1.1rem",
  },
});
export default function DrawerComponent(props) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.empty} />
      <Divider />
      <div className={classes.container}>
        <div className={classes.status}>
          <div className={classes.fontW}> 상태 </div>
          <div
            style={{
              color:
                props.status == "Running"
                  ? "blue"
                  : props.status == "Finished"
                  ? "green"
                  : "red",
            }}
          >
            {props.status}{" "}
          </div>
        </div>
        <div className={classes.time}>
          <div className={classes.fontW}> 시작 시간 / 종료 시간</div>

          <div>
            {props.starttime} / {props.endtime}
          </div>
        </div>
        <div className={classes.elapsetime}>
          <div className={classes.fontW}>소요 시간</div>
          <div>{props.elapsedtime}</div>
        </div>
      </div>
    </div>
  );
}
