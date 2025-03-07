import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box } from "@mui/material";

// Register Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const rowData = [
  {
    store: "Nashville Melody Music Store",
    sku: "Rugged Utility Jacket",
    W01: 200,
    W02: 0,
    W03: 0,
    W04: 0,
    W05: 0,
    W06: 0,
    W07: 0,
    W08: 0,
    W09: 0,
    W10: 0,
    GM_Percent: 94.6,
  },
  {
    store: "Miami Breeze Apparel",
    sku: "Lace-Up Combat Boots",
    W01: 199,
    W02: 14,
    W03: 0,
    W04: 0,
    W05: 0,
    W06: 0,
    W07: 0,
    W08: 0,
    W09: 0,
    W10: 0,
    GM_Percent: 0.6,
  },
  {
    store: "Chicago Charm Boutique",
    sku: "Floral Chiffon Wrap Dress",
    W01: 200,
    W02: 0,
    W03: 0,
    W04: 0,
    W05: 0,
    W06: 0,
    W07: 0,
    W08: 0,
    W09: 0,
    W10: 0,
    GM_Percent: 54.3,
  },
];

// Column Definitions
const columnDefs = [
  { headerName: "Store", field: "store", pinned: "left", width: 200 },
  { headerName: "SKU", field: "sku", pinned: "left", width: 200 },
  {
    headerName: "Weekly Sales",
    children: [
      { headerName: "W01", field: "W01", width: 100 },
      { headerName: "W02", field: "W02", width: 100 },
      { headerName: "W03", field: "W03", width: 100 },
      { headerName: "W04", field: "W04", width: 100 },
      { headerName: "W05", field: "W05", width: 100 },
      { headerName: "W06", field: "W06", width: 100 },
      { headerName: "W07", field: "W07", width: 100 },
      { headerName: "W08", field: "W08", width: 100 },
      { headerName: "W09", field: "W09", width: 100 },
      { headerName: "W10", field: "W10", width: 100 },
    ],
  },
  {
    headerName: "GM Percent",
    field: "GM_Percent",
    width: 120,
    valueFormatter: (p) => `${p.value} %`,
    cellStyle: (params) => {
      if (params.value >= 80)
        return { backgroundColor: "green", color: "white" };
      if (params.value >= 50)
        return { backgroundColor: "yellow", color: "black" };
      if (params.value >= 30)
        return { backgroundColor: "orange", color: "black" };
      return { backgroundColor: "red", color: "white" };
    },
  },
];

const PlanningComponent = () => {
  return (
    <Box sx={{ height: "600px", width: "100%" }} className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowModelType="clientSide"
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
      />
    </Box>
  );
};

export default PlanningComponent;
