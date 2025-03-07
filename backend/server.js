const express = require("express");
const xlsx = require("xlsx");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

// Load the Excel file
const workbook = xlsx.readFile("GSIV25 - Sample Data.xlsx");

// Function to parse sheet data
const getSheetData = (sheetName) => {
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

// Define API endpoints
app.get("/stores", (req, res) => {
  res.json(getSheetData("Stores"));
});

app.get("/skus", (req, res) => {
  res.json(getSheetData("SKUs"));
});

app.get("/calendar", (req, res) => {
  res.json(getSheetData("Calendar"));
});

app.get("/planning", (req, res) => {
  res.json(getSheetData("Planning"));
});

app.get("/calculations", (req, res) => {
  res.json(getSheetData("Calculations"));
});

app.get("/chart", (req, res) => {
  res.json(getSheetData("Chart"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
