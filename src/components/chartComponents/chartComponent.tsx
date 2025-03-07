import React from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { aggregatedData } from "../constants/aggregatedData";

// Define the type of your aggregatedData items
interface AggregatedDataType {
  Store: string;
  [key: string]: number | string; // Allow dynamic keys like "GM Dollars_W01", "GM %_W01"
}

const stores = aggregatedData.map((d) => d.Store);

const ChartComponent = () => {
  return (
    <Box sx={{ width: "100%", padding: 3, background: "#222", color: "#fff" }}>
      <Typography variant="h5" gutterBottom align="center">
        Gross Margin
      </Typography>

      <ResponsiveContainer width="100%" height={450}>
        <ComposedChart
          data={aggregatedData
            .map((d: AggregatedDataType) =>
              Object.keys(d)
                .filter((k) => k.startsWith("GM Dollars_"))
                .map((week) => {
                  const weekNumber = week.replace("GM Dollars_", "W");
                  return {
                    week: weekNumber,
                    "GM Dollars": d[week] as number, // Type assertion to number
                    "GM %":
                      (d[
                        `GM %_${week.replace("GM Dollars_", "")}`
                      ] as number) || 0,
                  };
                })
            )
            .flat()}
        >
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis
            yAxisId="left"
            tickFormatter={(v) => `$ ${v.toLocaleString()}`}
            stroke="#ccc"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `${v}%`}
            stroke="#ccc"
          />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <Bar
            yAxisId="left"
            dataKey="GM Dollars"
            fill="#4A90E2"
            barSize={10}
          />
          <Line
            yAxisId="right"
            dataKey="GM %"
            stroke="#ff7300"
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartComponent;
