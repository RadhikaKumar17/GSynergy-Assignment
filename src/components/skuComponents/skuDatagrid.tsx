"use client";

import React, { useState } from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { toast } from "sonner";

const initialRows = [
  { id: 1, sku: "Atlanta Outfitters", price: "12", cost: "$10" },
  { id: 2, sku: "Chicago Charm Boutique", price: "12", cost: "$10" },
  { id: 3, sku: "Houston Harvest Market", price: "12", cost: "$10" },
  { id: 4, sku: "Seattle Skyline Goods", price: "12", cost: "$10" },
  { id: 5, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
  { id: 6, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
  { id: 7, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
  { id: 8, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
  { id: 9, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
  { id: 10, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
  { id: 11, sku: "Miami Breeze Apparel", price: "12", cost: "$10" },
];

const SKUDatagrid = () => {
  const [rows, setRows] = useState(initialRows);

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
    toast.success("Store deleted successfully");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 80 },
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "cost", headerName: "Cost", flex: 1 },
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
          <Typography color="white">SKU</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#ff9e8c" }}
          >
            NEW SKU
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

export default SKUDatagrid;
