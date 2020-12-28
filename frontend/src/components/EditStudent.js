import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { trackPromise } from "react-promise-tracker";

const useStyles = makeStyles({
  root: {},
  table: {
    width: "90%",
  },
});

export default function EditStudent() {
  const [data, setData] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const columns = [
    {
      title: "Name",
      field: "name",
      validate: (rowData) => Boolean(rowData.name),
    },
    {
      title: "Email Id",
      field: "email",
      validate: (rowData) => Boolean(rowData.email),
    },
    { title: "Department", field: "d_name" },
    {
      title: "Dept Id",
      field: "d_id",
      type: "numeric",
      align: "left",
      validate: (rowData) => Boolean(rowData.d_id),
    },
    { title: "USN", field: "usn", validate: (rowData) => Boolean(rowData.usn) },
    {
      title: "Year",
      field: "year",
      type: "numeric",
      align: "left",
      validate: (rowData) => Boolean(rowData.year),
    },
    {
      title: "Backlogs",
      field: "current_backlogs",
      type: "numeric",
      align: "left",
      min: 0,
      initialEditValue: 0,
    },
    {
      title: "SPC",
      field: "is_spc",
      type: "boolean",
      initialEditValue: 0,
    },
    {
      title: "CGPA",
      field: "cgpa",
      align: "left",
      validate: (rowData) => Boolean(rowData.cgpa),
    },
    {
      title: "Counsellor Id",
      field: "counsellor_id",
      type: "numeric",
      align: "left",
      validate: (rowData) => Boolean(rowData.counsellor_id),
    },
    {
      title: "Password",
      field: "password",
    },
  ];

  useEffect(() => {
    trackPromise(
      axios
        .get("/student", {
          headers: { "x-auth-token": localStorage["x-auth-token"] },
        })
        .then((results) => {
          setData(results.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data);
            history.push("/");
          } else {
            alert("Sorry There is something wrong with the server");
          }
        })
    );
  }, []);

  return (
    <MaterialTable
      className={classes.table}
      title="STUDENT"
      editable={{
        onRowAdd: (newData) => {
          trackPromise(
            axios
              .post("/student", newData, {
                headers: { "x-auth-token": localStorage["x-auth-token"] },
              })
              .then((results) => {
                alert("addition of student succesfull");
                window.location.reload(false);
              })
              .catch((err) => {
                if (err.response && err.response.status == 400) {
                  alert(err.response.data);
                  window.location.reload(false);
                } else {
                  alert("There is something wrong with the server");
                }
              })
          );
        },
        onRowUpdate: (newData, oldData) => {
          trackPromise(
            axios
              .put("/student", newData, {
                headers: { "x-auth-token": localStorage["x-auth-token"] },
              })
              .then((results) => {
                alert("data updated successfully");
                window.location.reload(false);
              })
              .catch((err) => {
                if (err.response && err.response.status == 400) {
                  alert(err.response.data);
                  window.location.reload(false);
                } else {
                  alert("There is something wrong with the server");
                }
              })
          );
        },
        onRowDelete: (oldData) => {
          trackPromise(
            axios
              .delete(
                "/student",
                { data: oldData },
                {
                  headers: { "x-auth-token": localStorage["x-auth-token"] },
                }
              )
              .then((results) => {
                alert("Data deletion successful");
                window.location.reload(false);
              })
              .catch((err) => {
                if (err.response && err.response.status == 400) {
                  alert(err.response.data);
                  window.location.reload(false);
                } else {
                  alert("There is something wrong with the server");
                }
              })
          );
        },
      }}
      options={{
        actionsColumnIndex: -1,
      }}
      className={classes.root}
      columns={columns}
      data={data}
    />
  );
}
