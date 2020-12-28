import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles, Hidden } from "@material-ui/core";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles({
  root: {
    margin: "30px",
  },
});

export default function Placement() {
  const history = useHistory();
  const [records, setRecords] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    trackPromise(
      axios
        .get("/placement/individual", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          console.log(results);
          axios
            .get("/placement", {
              headers: { "x-auth-token": localStorage["x-auth-token"] },
            })
            .then((secondResult) => {
              let data = secondResult.data;
              for (let x in data) {
                data[x].registered = false;
                for (let e of results.data) {
                  if (data[x].placement_id === e.placement_id) {
                    data[x].registered = true;
                    break;
                  }
                }
              }
              setRecords(data);
            })
            .catch((err) => {
              console.log(err);
              if (err.response && err.response.status === 400)
                history.push("/");
              else alert("There is something wrong with the server1");
            });
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) history.push("/");
          else alert("There is something wrong with the server");
        })
    );
  }, []);

  const columns = [
    { title: "Company", field: "company" },
    { title: "Role", field: "role" },
    { title: "Job Profile", field: "job_profile" },
    { title: "Stipend/CTC", field: "stipend" },
    { title: "Category", field: "category" },
  ];

  const onClickHandler = (event, rowData) => {
    trackPromise(
      axios
        .post(
          "/placement/register",
          { placement_id: rowData.placement_id },
          {
            headers: { "x-auth-token": localStorage["x-auth-token"] },
          }
        )
        .then((results) => {
          window.location.reload(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) history.push("/");
          else alert("There is something wrong with the server");
        })
    );
  };

  return (
    <Paper variant="outlined" className={classes.root}>
      <MaterialTable
        title="Placement/Internship"
        data={records}
        columns={columns}
        actions={[
          (rowData) => ({
            icon: () => <SaveSharpIcon style={{ color: "blue" }} />,
            tooltip: "Register for Company",
            onClick: (event, rowData) => onClickHandler(event, rowData),
            hidden: rowData.registered,
          }),
          (rowData) => ({
            icon: () => <CheckCircleSharpIcon style={{ color: "green" }} />,
            tooltip: "Registered",
            hidden: !rowData.registered,
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </Paper>
  );
}
