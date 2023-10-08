import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import { mockDataTeam } from "../data/mockData";
// import { Typography } from "@mui/material";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../components/Header"
import LoadingComponent from "../components/LoadingComponent";

const Golongan = ({ error, setError}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const [golData, setGolData] = useState(null)
  // const columns = [
  //   { field: "id", headerName: "ID" },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   {
  //     field: "accessLevel",
  //     headerName: "Access Level",
  //     flex: 1,
  //     renderCell: ({ row: { access } }) => {
  //       return (
  //         <Box
  //           width="60%"
  //           m="0 auto"
  //           p="5px"
  //           display="flex"
  //           justifyContent="center"
  //           backgroundColor={
  //             access === "admin"
  //               ? colors.greenAccent[600]
  //               : access === "manager"
  //               ? colors.greenAccent[700]
  //               : colors.greenAccent[700]
  //           }
  //           borderRadius="4px"
  //         >
  //           {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
  //           {access === "manager" && <SecurityOutlinedIcon />}
  //           {access === "user" && <LockOpenOutlinedIcon />}
  //           <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
  //             {access}
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  // ];
  const columns = [
    { field: "golongan_id", headerName: "ID" },
    {
      field: "golongan_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "created_date",
      headerName: "Created",
      flex: 1,
    },
    {
      field: "updated_date",
      headerName: "Updated",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:3131/golongan/all-golongan", {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success" || data.statusCode === 200) {
          console.log(data.payload.data)
          setGolData(data.payload.data);
        } else {
          setError({
            severity: "error",
            title: data.payload.code,
            message: data.payload.id,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <LoadingComponent loading={loading} />; // Pass the theme to LoadingComponent
  }

  return (
    <Box m="20px">
      {
        golData ? 
        (
          <>
            <Header title="GOLONGAN" subtitle="List data Golonagn" />
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              <DataGrid checkboxSelection rows={golData} columns={columns} />
            </Box>
          </>
        ) : (
          <>
            <Header title="GOLONGAN" subtitle="Data Kosong" />
          </>
        )
      }

    </Box>
  );
};

export default Golongan