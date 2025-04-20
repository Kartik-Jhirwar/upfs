import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const FireDashboard = () => {
  const [exportType, setExportType] = useState("");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("today");

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const data = [
    {
      currentDate: "2025-04-20",
      reportNumber: "FR-001",
      jurisdiction: "North Division",
      infoFrom: "Police Department",
      callerName: "John Doe",
      callerPhone: "1234567890",
      address: "123 Fire St, Metro City",
      callDate: "2025-04-19",
      callTime: "13:15",
      departureTime: "13:30",
      distance: "5 km",
      arrivalTime: "13:45",
      deathDetails: "2 casualties",
      natureOfCall: "Emergency",
      leaveDate: "2025-04-19",
      leaveTime: "15:00",
      occupancyType: "Residential",
      occupancyOther: "",
      fireCategory: "Category A",
      fireCause: "Short Circuit",
      buildingType: "Concrete",
      buildingOther: "",
      affectedArea: "2 floors",
      injuryDetails: "3 injuries",
      savedLives: "5 people saved",
      lossDetails: "Estimated ₹10 lakhs property loss",
      remarks: "Fire controlled within 2 hours",
      officer: "Officer Raj Kumar",
    },
  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fire Reports");
    // Automatically adjust column width
    worksheet["!cols"] = Object.keys(data[0]).map(() => ({ wch: 20 }));
    XLSX.writeFile(workbook, "fire_reports.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(16);
    doc.text("🔥 Fire Incident Report", 14, 20);

    // Display data as key-value pairs in the PDF
    Object.keys(data[0]).forEach((key, idx) => {
      doc.text(`${key}: ${data[0][key]}`, 14, 30 + idx * 10);
    });

    doc.save("fire-incident-report.pdf");
  };

  const handleExport = () => {
    if (exportType === "pdf") exportToPDF();
    else if (exportType === "excel") exportToExcel();
    setExportDialogOpen(false);
  };

  const timeSeries = {
    today: [5, 7, 6, 8, 5],
    weekly: [20, 18, 22, 19, 25, 23, 20],
    monthly: [120, 130, 110, 140, 150],
    yearly: [1200, 1350, 1400, 1500, 1600],
  };

  const jurisdictionData = {
    "North Division": 85,
    "South Division": 60,
    "East Division": 40,
    "West Division": 20,
  };

  const pieChartData = {
    labels: ["North", "South", "East", "West"],
    series: [45, 30, 15, 10],
  };


  const areaChartData = {
    labels: ["01:00", "02:00", "03:00", "04:00", "05:00"],
    series: [
      { name: "Deaths", data: [2, 4, 3, 5, 2] },
      { name: "Lives Saved", data: [5, 6, 4, 7, 6] },
    ],
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        🔥 Fire Station Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setExportDialogOpen(true)}
        sx={{ mb: 3,mt:2 }}
      >
        Export Data
      </Button>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", bgcolor: "#ffe0e0", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="error.main">Total Complaints</Typography>
              <Typography variant="h4" color="error.main">205</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", bgcolor: "#e1f5fe", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="primary">Monthly Avg</Typography>
              <Typography variant="h4" color="primary">41</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", bgcolor: "#e8f5e9", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="secondary">Critical Cases</Typography>
              <Typography variant="h4" color="secondary">15</Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", bgcolor: "#ffe0e0", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="error">Total Deaths</Typography>
              <Typography variant="h4" color="error">2</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", bgcolor: "#e1f5fe", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="primary">Total Lives Saved</Typography>
              <Typography variant="h4" color="primary">5</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", bgcolor: "#e8f5e9", boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="secondary">Total Incidents</Typography>
              <Typography variant="h4" color="secondary">205</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Time Series Tab View */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="Today" value="today" />
                <Tab label="Weekly" value="weekly" />
                <Tab label="Monthly" value="monthly" />
                <Tab label="Yearly" value="yearly" />
              </Tabs>
              <ReactApexChart
                options={{
                  chart: { type: "area", animations: { enabled: true, easing: "easeinout", speed: 800 } },
                  xaxis: { categories: Array(timeSeries[activeTab].length).fill(0).map((_, i) => `${i + 1}`) },
                  stroke: { curve: "smooth" },
                  colors: ["#FF5722"],
                  fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
                }}
                series={[{ name: "Complaints", data: timeSeries[activeTab] }]}
                type="area"

                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Jurisdiction Bar Chart */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cases by Jurisdiction
              </Typography>
              <ReactApexChart
                options={{
                  chart: { type: "bar", animations: { enabled: true } },
                  xaxis: { categories: Object.keys(jurisdictionData) },
                  colors: ["#AB47BC"],
                  dataLabels: { enabled: true },
                }}
                series={[{ name: "Complaints", data: Object.values(jurisdictionData) }]}
                type="bar"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

         {/* Area Chart for Deaths and Lives Saved */}
         <Grid item xs={12}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Deaths vs Lives Saved Over Time
              </Typography>
              <ReactApexChart
                options={{
                  chart: { type: "area", animations: { enabled: true, easing: "easeinout", speed: 800 } },
                  xaxis: { categories: areaChartData.labels },
                  stroke: { curve: "smooth" },
                  colors: [ "#4CAF50","#FF5722"],
                  fill: { type: "gradient", gradient: { shadeIntensity:.7, opacityFrom: 1.75, opacityTo: 0.5 } },
                }}
                series={areaChartData.series}
                type="area"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Complaint Distribution by Jurisdiction
              </Typography>
              <ReactApexChart
                options={{
                  chart: { type: "pie" },
                  labels: pieChartData.labels,
                  colors: ["#FF5733", "#33FF57", "#3357FF", "#e44a77"],
                }}
                series={pieChartData.series}
                type="pie"
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>


        {/* Add more charts or cards as needed */}
      </Grid>

      {/* Export Modal */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle>Select export format</DialogTitle>
        <FormControl fullWidth sx={{ px: 3 }}>
          <InputLabel sx={{ ml:3 }}>File Type</InputLabel>
          <Select
            value={exportType}
            onChange={(e) => setExportType(e.target.value)}
            label="File Type"
          >
            <MenuItem value="excel">Excel (.xlsx)</MenuItem>
            <MenuItem value="pdf">PDF (.pdf)</MenuItem>
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleExport}>Export</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FireDashboard;
