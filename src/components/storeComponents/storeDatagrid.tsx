"use client";

import React, { useState } from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { toast } from "sonner";

const initialRows = [
  { id: 1, store: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { id: 2, store: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { id: 3, store: "Houston Harvest Market", city: "Houston", state: "TX" },
  { id: 4, store: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
  { id: 5, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 6, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 7, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 8, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 9, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 10, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { id: 11, store: "Miami Breeze Apparel", city: "Miami", state: "FL" },
];

const StoreDatagrid = () => {
  const [rows, setRows] = useState(initialRows);

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
    toast.success("Store deleted successfully");
  };

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
