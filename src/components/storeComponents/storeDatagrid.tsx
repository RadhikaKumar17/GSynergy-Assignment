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
import { useGetAllStores } from "@/src/hooks/useGetStores";

const StoreDatagrid = () => {
  const { data, isLoading } = useGetAllStores();
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStore, setNewStore] = useState({ store: "", city: "", state: "" });

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

  const handleDelete = (id: string) => {
    //@ts-ignore
    setRows(rows.filter((row) => row.id && row.id !== id));
    toast.success("Store deleted successfully");
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setNewStore({ store: "", city: "", state: "" });
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  };

  const handleAddStore = () => {
    if (!newStore.store || !newStore.city || !newStore.state) {
      toast.error("Please fill all fields");
      return;
    }

    const newRow = {
      id: `store-${rows.length + 1}`,
      store: newStore.store,
      city: newStore.city,
      state: newStore.state,
    };
    //@ts-ignore
    setRows([...rows, newRow]);
    toast.success("Store added successfully");
    handleDialogClose();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No", width: 80 },
    { field: "store", headerName: "Store", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
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
        <Typography color="white">STORE</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#ff9e8c" }}
          onClick={handleDialogOpen}
        >
          NEW STORE
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

      {/* Dialog for Adding New Store */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Store</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            name="store"
            fullWidth
            variant="outlined"
            value={newStore.store}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            fullWidth
            variant="outlined"
            value={newStore.city}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="State"
            name="state"
            fullWidth
            variant="outlined"
            value={newStore.state}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddStore} variant="contained" color="primary">
            Add Store
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoreDatagrid;
