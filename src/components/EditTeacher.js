import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditTeacher() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const columns = [
    {
      field: "s_id",
      hidden: true,
    },
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
      title: "Department Id",
      field: "d_id",
      type: "numeric",
      align: "left",
      validate: (rowData) => Boolean(rowData.d_id),
    },
    {
      title: "Is HOD",
      field: "is_hod",
      type: "boolean",
      initialEditValue: 0,
    },
    { title: "Password", field: "password" },
  ];

  useEffect(() => {
    axios
      .get("/teacher")
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("You are not logged in!");
          history.push("/");
        } else {
          alert("Sorry There is something wrong with the server");
        }
      });
  }, []);

  return (
    <MaterialTable
      editable={{
        onRowAdd: (newData) => {
          axios
            .post("/teacher", newData)
            .then((results) => {
              alert("addition of teacher successful");
              window.location.reload(false);
            })
            .catch((err) => {
              if (err.response && err.response.status == 400) {
                alert(err.response.data);
                window.location.reload(false);
              } else {
                alert("There is something wrong with the server");
              }
            });
        },
        onRowUpdate: (newData, oldData) => {
          axios
            .put("/teacher", newData)
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
            });
        },
        onRowDelete: (oldData) => {
          axios
            .delete("/teacher", { data: oldData })
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
            });
        },
      }}
      data={data}
      columns={columns}
      title="TEACHER"
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}
