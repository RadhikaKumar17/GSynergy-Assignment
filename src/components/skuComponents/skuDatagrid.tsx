"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { toast } from "sonner";
import { useGetAllSKU } from "@/src/hooks/useGetSKU";

const SKUDatagrid = () => {
  const { data, isLoading } = useGetAllSKU();
  const [rows, setRows] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newSKU, setNewSKU] = useState({
    sku: "",
    price: "",
    cost: "",
    class: "",
    department: "",
  });

  useEffect(() => {
    if (data) {
      const formattedRows = data.map((sku: any, index: any) => ({
        id: sku.ID || `sku-${index + 1}`,
        sku: sku.Label,
        price: sku.Price,
        cost: sku.Cost,
        class: sku.Class,
        department: sku.Department,
      }));
      setRows(formattedRows);
    }
  }, [data]);

  // Handle Delete SKU
  const handleDelete = (id: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    toast.success("SKU deleted successfully");
  };

  // Handle Dialog Open & Close
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setNewSKU({ sku: "", price: "", cost: "", class: "", department: "" });
    setOpenDialog(false);
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSKU({ ...newSKU, [e.target.name]: e.target.value });
  };

  // Handle Add SKU
  const handleAddSKU = () => {
    if (
      !newSKU.sku ||
      !newSKU.price ||
      !newSKU.cost ||
      !newSKU.class ||
      !newSKU.department
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const newRow = {
      id: `sku-${rows.length + 1}`,
      sku: newSKU.sku,
      price: newSKU.price,
      cost: newSKU.cost,
      class: newSKU.class,
      department: newSKU.department,
    };

    setRows([...rows, newRow]);

    toast.success("SKU added successfully");
    handleDialogClose();
  };

  // DataGrid Columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 80 },
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "cost", headerName: "Cost", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
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
      width: 50,
      sortable: false,
      renderCell: () => <DragIndicatorIcon sx={{ cursor: "grab" }} />,
    },
  ];

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ height: "60vh", width: "100%" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography color="white">SKU</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#ff9e8c" }}
          onClick={handleDialogOpen}
        >
          NEW SKU
        </Button>
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

      {/* Dialog for Adding New SKU */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New SKU</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="SKU Name"
            name="sku"
            fullWidth
            variant="outlined"
            value={newSKU.sku}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            variant="outlined"
            value={newSKU.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Cost"
            name="cost"
            type="number"
            fullWidth
            variant="outlined"
            value={newSKU.cost}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Class"
            name="class"
            fullWidth
            variant="outlined"
            value={newSKU.class}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Department"
            name="department"
            fullWidth
            variant="outlined"
            value={newSKU.department}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddSKU} variant="contained" color="primary">
            Add SKU
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SKUDatagrid;
