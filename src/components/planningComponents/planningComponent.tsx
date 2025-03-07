import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetPlannings } from "@/src/hooks/useGetPlannings";

// Register Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const PlanningComponent = () => {
  const { data, isLoading, error } = useGetPlannings();

  const rowData = useMemo(() => {
    if (!data) return [];

    const formattedData = data.map((item: any) => {
      const salesDollars = item["Sales Dollars"] || 0;
      const costDollars = item["Cost Dollars"] || 0;
      const gmDollars = salesDollars - costDollars; // Calculate GM Dollars
      const gmPercent = salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0; // Calculate GM%

      return {
        store: item.Store,
        sku: item.SKU,
        [`${item.Week}`]: item["Sales Units"],
        Sales_Dollars: salesDollars,
        Cost_Dollars: costDollars,
        GM_Dollars: gmDollars,
        GM_Percent: gmPercent, // Corrected GM % calculation
      };
    });

    // Merge weekly data for the same store + SKU
    const mergedData: { [key: string]: any } = {};
    formattedData.forEach((entry: any) => {
      const key = `${entry.store}-${entry.sku}`;
      if (!mergedData[key]) {
        mergedData[key] = { ...entry };
      } else {
        mergedData[key] = { ...mergedData[key], ...entry };
      }
    });

    return Object.values(mergedData);
  }, [data]);

  const columnDefs = useMemo(() => {
    const weeks = Array.from(
      new Set(data?.map((item: any) => item.Week) || [])
    );

    return [
      { headerName: "Store", field: "store", pinned: "left", width: 200 },
      { headerName: "SKU", field: "sku", pinned: "left", width: 200 },
      {
        headerName: "Weekly Sales",
        children: weeks.map((week) => ({
          headerName: week,
          field: week,
          width: 100,
          valueFormatter: (params: any) => (params.value ? params.value : "0"),
        })),
      },
      {
        headerName: "Sales Dollars",
        field: "Sales_Dollars",
        width: 120,
        valueFormatter: (params: any) => `$ ${params.value}`,
      },
      {
        headerName: "Cost Dollars",
        field: "Cost_Dollars",
        width: 120,
        valueFormatter: (params: any) => `$ ${params.value}`,
      },
      {
        headerName: "GM Dollars",
        field: "GM_Dollars",
        width: 120,
        valueFormatter: (params: any) => `$ ${params.value}`,
      },
      {
        headerName: "GM Percent",
        field: "GM_Percent",
        width: 120,
        valueFormatter: (params: any) => `${params.value} %`,
        cellStyle: (params: any) => {
          if (params.value >= 40)
            return { backgroundColor: "green", color: "white" };
          if (params.value >= 10)
            return { backgroundColor: "yellow", color: "black" };
          if (params.value > 5)
            return { backgroundColor: "orange", color: "black" };
          return { backgroundColor: "red", color: "white" };
        },
      },
    ];
  }, [data]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load data</Typography>;

  return (
    <Box sx={{ height: "600px", width: "100%" }} className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        //@ts-ignore
        columnDefs={columnDefs}
        rowModelType="clientSide"
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </Box>
  );
};

export default PlanningComponent;
