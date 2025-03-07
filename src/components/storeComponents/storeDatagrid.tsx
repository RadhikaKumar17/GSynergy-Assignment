"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { toast } from "sonner";
import { useGetAllStores } from "@/src/hooks/useGetStores";

const StoreDatagrid = () => {
  const { data, isLoading, error } = useGetAllStores();
  const [rows, setRows] = useState([]);

  // console.log("STORES DATA", data);
  const handleDelete = (id: string) => {
    //@ts-ignore
    setRows(rows.filter((row) => row.id && row.id !== id));
    toast.success("Store deleted successfully");
  };
  useEffect(() => {
    if (data) {
      const formattedRows = data.map((store: any, index: any) => ({
        id: store.ID || `store-${index + 1}`,
        store: store.Label,
        city: store.City,
        state: store.State,
      }));
      setRows(formattedRows);
    }
  }, [data]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 80 },
    { field: "store", headerName: "Store", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      field: "drag",
      headerName: "Drag",
      flex: 1,
      width: 50,
      sortable: false,
      renderCell: () => <DragIndicatorIcon sx={{ cursor: "grab" }} />,
    },
  ];

  return (
    <Box sx={{ height: "60vh", width: "100%" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Box>
          <Typography color="white">STORE</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#ff9e8c" }}
          >
            NEW STORE
          </Button>
        </Box>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1d252e",
            color: "#1d252e",
            fontSize: 14,
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#000",
          },
          "& .MuiDataGrid-cell": {
            color: "#fff",
            fontSize: 13,
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#22252a",
            "&:hover": {
              backgroundColor: "#2D3036",
              cursor: "pointer",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
        }}
      />
    </Box>
  );
};

export default StoreDatagrid;
