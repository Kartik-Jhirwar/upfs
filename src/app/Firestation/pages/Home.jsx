import React, { useState,useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  InputLabel,
  Tabs,
  Tab,
  Tooltip,
  Paper,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Fireplace as FireIcon,
  LocalFireDepartment as FireDepartmentIcon,
  People as PeopleIcon,
  DirectionsCar as VehicleIcon,
  Warning as WarningIcon,
  CheckCircle as OperationalIcon,
  Error as DysfunctionalIcon,
  LocalFireDepartment as EmergencyIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendIcon,
  DirectionsCar as EquipmentIcon,
  Notifications as NotificationsIcon,
  NewReleases as NewIcon
} from "@mui/icons-material";
import { useFireData } from "./FireDataContext";

const FireDashboard = () => {
  const { fireIncidents, recentChanges, stats, addIncident } = useFireData();
  const [showNotifications, setShowNotifications] = useState(false);
  const [newIncidentsCount, setNewIncidentsCount] = useState(fireIncidents.filter(i => i.isNew).length || 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [exportType, setExportType] = useState("");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("monthly");

  console.log(fireIncidents)

  useEffect(() => {
    setNewIncidentsCount(fireIncidents.filter(i => i.isNew).length);
  }, [fireIncidents]);

  // Simulate a new incident for demonstration (remove in production)
  const simulateNewIncident = () => {
    const mockIncident = {
      fireReportNumber: `FR-${new Date().getTime()}`,
      incidentAddress: "Demo Location, Kanpur",
      natureOfCall: "Emergency",
      timestamp: new Date().toISOString(),
      isNew: true
    };
    addIncident(mockIncident);
  };

  // Fire station theme colors
  const themeColors = {
    primary: "#D32F2F", // Dark red
    secondary: "#FF5722", // Orange
    accent: "#FFC107", // Amber
    success: "#4CAF50", // Green
    warning: "#FF9800", // Orange
    error: "#F44336", // Red
    info: "#2196F3", // Blue
    dark: "#212121",
    light: "#F5F5F5",
  };

  const RecentChangesIndicator = () => (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {recentChanges.map((change, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            mb: 1,
            p: 1.5,
            backgroundColor: change.isNew ? "#ffebee" : "#f5f5f5",
            borderLeft: `4px solid ${change.isNew ? "#f44336" : "#9e9e9e"}`,
            transition: "all 0.3s ease",
            transform: change.isNew ? "translateX(0)" : "translateX(120%)",
            opacity: change.isNew ? 1 : 0,
            width: 300,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {change.isNew && (
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#f44336",
                  mr: 1,
                  animation: "pulse 2s infinite",
                }}
              />
            )}
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              New Incident: {change.fireReportNumber}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {change.incidentAddress}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(change.timestamp).toLocaleString()}
          </Typography>
        </Paper>
      ))}
    </Box>
  );

  const handleTimeRangeChange = (_, newValue) => {
    setTimeRange(newValue);
    // Here you would typically fetch data based on the time range
    // For this example, we'll just use the same data but filter differently
  };

  // Sample data that changes based on time range selection
  const getTimeRangeData = () => {
    switch (timeRange) {
      case "daily":
        return {
          incidents: 8,
          responseTime: 7.2,
          livesSaved: 2,
          equipmentUsage: 72.5,
          label: "Today",
        };
      case "weekly":
        return {
          incidents: 42,
          responseTime: 7.8,
          livesSaved: 12,
          equipmentUsage: 68.3,
          label: "This Week",
        };
      case "monthly":
        return {
          incidents: 91,
          responseTime: 8.75,
          livesSaved: 35,
          equipmentUsage: 75.4,
          label: "This Month",
        };
      case "annual":
        return {
          incidents: 1250,
          responseTime: 9.1,
          livesSaved: 425,
          equipmentUsage: 78.2,
          label: "This Year",
        };
      default:
        return {
          incidents: 91,
          responseTime: 8.75,
          livesSaved: 35,
          equipmentUsage: 75.4,
          label: "This Month",
        };
    }
  };

  const timeRangeData = getTimeRangeData();

  // Equipment data with decimal values formatted to 2 places
  const equipmentData = [
    {
      name: "Hydraulic Platform",
      accepted: 1,
      available: 1,
      status: "Dysfunctional",
      utilization: 0.0,
      details: "Out of commission since 24.06.2019",
    },
    {
      name: "Turntable Ladder",
      accepted: 1,
      available: 1,
      status: "Dysfunctional",
      utilization: 0.0,
      details: "Condemnation process underway",
    },
    {
      name: "Water Bowser",
      accepted: 4,
      available: 2,
      status: "Functional",
      utilization: 78.25,
    },
    {
      name: "Foam Tender",
      accepted: 2,
      available: 2,
      status: "Functional",
      utilization: 92.5,
    },
    {
      name: "Water Tender (4500-6000L)",
      accepted: 5,
      available: 5,
      status: "Functional",
      utilization: 85.75,
    },
    {
      name: "Water Tender (2500L)",
      accepted: 4,
      available: 4,
      status: "Functional",
      utilization: 76.4,
    },
    {
      name: "Water Tender (2000L)",
      accepted: 3,
      available: 3,
      status: "Functional",
      utilization: 68.9,
    },
    {
      name: "Ambulance",
      accepted: 8,
      available: 8,
      status: "Functional",
      utilization: 62.3,
    },
    {
      name: "Trolley",
      accepted: 2,
      available: 2,
      status: "Dysfunctional",
      utilization: 0.0,
      details: "Auction underway",
    },
  ];

  // Staff allocation data
  const staffData = [
    {
      position: "Chief Fire Officer",
      sanctioned: 1,
      available: 1,
      vacant: 0,
      utilization: 100.0,
    },
    {
      position: "Fire Officer",
      sanctioned: 10,
      available: 1,
      vacant: 9,
      utilization: 10.0,
    },
    {
      position: "Second Fire Officer",
      sanctioned: 18,
      available: 9,
      vacant: 9,
      utilization: 50.0,
    },
    {
      position: "Leading Fireman",
      sanctioned: 41,
      available: 21,
      vacant: 20,
      utilization: 51.22,
    },
    {
      position: "Fireman",
      sanctioned: 260,
      available: 177,
      vacant: 83,
      utilization: 68.08,
    },
  ];

  // Training data - changes based on time range
  const getTrainingData = () => {
    switch (timeRange) {
      case "daily":
        return { sessions: 1, participants: 15, avgRating: 4.5 };
      case "weekly":
        return { sessions: 5, participants: 72, avgRating: 4.4 };
      case "monthly":
        return { sessions: 22, participants: 315, avgRating: 4.3 };
      case "annual":
        return { sessions: 265, participants: 3820, avgRating: 4.4 };
      default:
        return { sessions: 22, participants: 315, avgRating: 4.3 };
    }
  };

  const trainingData = getTrainingData();

  // Incident trends data - changes based on time range
  const getTrendsData = () => {
    if (timeRange === "daily") {
      return {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        incidents: Array.from({ length: 24 }, () =>
          Math.floor(Math.random() * 5)
        ),
        responseTimes: Array.from({ length: 24 }, () => 5 + Math.random() * 5),
      };
    } else if (timeRange === "weekly") {
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        incidents: [12, 8, 10, 7, 9, 15, 11],
        responseTimes: [8.2, 7.8, 8.0, 7.5, 7.9, 8.5, 8.1],
      };
    } else if (timeRange === "monthly") {
      return {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        incidents: [25, 22, 24, 20],
        responseTimes: [8.5, 8.2, 8.0, 7.8],
      };
    } else {
      // annual
      return {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        incidents: [110, 95, 105, 120, 130, 140, 150, 135, 125, 110, 100, 90],
        responseTimes: [
          9.5, 9.2, 8.9, 8.7, 8.5, 8.3, 8.1, 8.3, 8.5, 8.7, 9.0, 9.2,
        ],
      };
    }
  };

  const trendsData = getTrendsData();

  // Format numbers to 2 decimal places
  const formatNumber = (num) => {
    return typeof num === "number" ? num.toFixed(2) : num;
  };

  // Equipment status chart data
  const equipmentStatusChart = {
    options: {
      chart: {
        type: "bar",
        stacked: true,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: !isMobile,
          borderRadius: 4,
        },
      },
      xaxis: isMobile
        ? {
            categories: equipmentData.map((item) => item.name.split(" ")[0]),
            labels: { style: { fontSize: "10px" } },
          }
        : {
            categories: equipmentData.map((item) => item.name),
            labels: { style: { fontSize: "12px" } },
          },
      colors: [themeColors.primary, themeColors.secondary],
      legend: {
        position: "top",
        fontSize: "14px",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => formatNumber(val),
      },
      tooltip: {
        y: {
          formatter: (val) => formatNumber(val),
        },
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
          },
        },
      ],
    },
    series: [
      { name: "Sanctioned", data: equipmentData.map((item) => item.accepted) },
      { name: "Available", data: equipmentData.map((item) => item.available) },
    ],
  };

  // Utilization radar chart
  const utilizationRadarChart = {
    options: {
      chart: {
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      colors: [themeColors.primary],
      markers: {
        size: 4,
        hover: { size: 6 },
      },
      xaxis: {
        categories: equipmentData
          .filter((item) => item.status === "Functional")
          .map((item) =>
            isMobile
              ? item.name.split(" ")[0]
              : item.name.split(" ").slice(0, 2).join(" ")
          ),
      },
      yaxis: {
        labels: {
          formatter: (val) => formatNumber(val),
        },
      },
    },
    series: [
      {
        name: "Utilization %",
        data: equipmentData
          .filter((item) => item.status === "Functional")
          .map((item) => item.utilization),
      },
    ],
  };

  // Incident trends line chart
  const incidentTrendsChart = {
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: [3, 3],
        dashArray: [0, 0],
      },
      colors: [themeColors.error, themeColors.info],
      xaxis: {
        categories: trendsData.labels,
      },
      yaxis: [
        {
          title: { text: "Incidents" },
          labels: { formatter: (val) => formatNumber(val) },
        },
        {
          opposite: true,
          title: { text: "Response Time (min)" },
          labels: { formatter: (val) => formatNumber(val) },
        },
      ],
      tooltip: {
        y: {
          formatter: (val) => formatNumber(val),
        },
      },
      legend: { position: "top" },
    },
    series: [
      {
        name: "Incidents",
        type: "line",
        data: trendsData.incidents,
      },
      {
        name: "Response Time",
        type: "line",
        data: trendsData.responseTimes,
      },
    ],
  };

  // Staff utilization bar chart
  const staffUtilizationChart = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: !isMobile,
          columnWidth: "60%",
          borderRadius: 4,
        },
      },
      colors: [themeColors.primary],
      xaxis: {
        categories: staffData.map((item) =>
          isMobile ? item.position.split(" ")[0] : item.position
        ),
        labels: { style: { fontSize: isMobile ? "10px" : "12px" } },
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: (val) => `${formatNumber(val)}`,
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${formatNumber(val)}`,
        },
      },
      legend: { position: "top" },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Utilization %",
        data: staffData.map((item) => item.utilization),
      },
    ],
  };

  // Training performance chart
  const trainingChart = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      colors: [themeColors.secondary, themeColors.accent],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 4,
        },
      },
      xaxis: {
        categories: ["Sessions", "Participants", "Avg Rating"],
      },
      yaxis: [
        {
          title: { text: "Count" },
          labels: { formatter: (val) => formatNumber(val) },
        },
        {
          opposite: true,
          title: { text: "Rating (1-5)" },
          min: 0,
          max: 5,
          labels: { formatter: (val) => formatNumber(val) },
        },
      ],
      tooltip: {
        y: {
          formatter: (val) => formatNumber(val),
        },
      },
      legend: { position: "top" },
    },
    series: [
      {
        name: "Count",
        type: "column",
        data: [trainingData.sessions, trainingData.participants, 0],
      },
      {
        name: "Avg Rating",
        type: "line",
        data: [0, 0, trainingData.avgRating],
      },
    ],
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(equipmentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Equipment Status");
    worksheet["!cols"] = Object.keys(equipmentData[0]).map(() => ({ wch: 20 }));
    XLSX.writeFile(workbook, "fire_equipment_status.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(16);
    doc.text("🔥 Fire Equipment Status Report", 14, 20);

    autoTable(doc, {
      head: [
        [
          "Equipment",
          "Sanctioned",
          "Available",
          "Status",
          "Utilization %",
          "Remarks",
        ],
      ],
      body: equipmentData.map((item) => [
        item.name,
        item.accepted || "-",
        item.available || "-",
        item.status,
        item.utilization.toFixed(2),
        item.details || "-",
      ]),
      startY: 30,
    });

    doc.save("fire-equipment-report.pdf");
  };

  const handleExport = () => {
    if (exportType === "pdf") exportToPDF();
    else if (exportType === "excel") exportToExcel();
    setExportDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: themeColors.light,
          minHeight: "100vh",
          p: isMobile ? 2 : 3,
        }}
      >
        {/* Header Section */}
        <Paper
          elevation={3}
          sx={{
            p: isMobile ? 2 : 3,
            mb: 3,
            backgroundColor: "#fff",
            background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
            color: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: isMobile ? 2 : 0,
              }}
            >
              <FireDepartmentIcon
                sx={{
                  fontSize: isMobile ? "2.5rem" : "3rem",
                  mr: 2,
                }}
              />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: "bold",
                  lineHeight: 1.2,
                }}
              >
                Kanpur Nagar
                <br />
                Fire Station Dashboard
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setExportDialogOpen(true)}
              startIcon={<FireIcon />}
              sx={{
                boxShadow: 3,
                backgroundColor: "#fff",
                color: themeColors.primary,
                "&:hover": {
                  backgroundColor: themeColors.light,
                },
              }}
            >
              Export Data
            </Button>
          </Box>
  
          <Tabs
            value={timeRange}
            onChange={handleTimeRangeChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#fff",
                height: 3,
              },
            }}
          >
            <Tab
              label="Daily"
              value="daily"
              sx={{ color: "#fff", minWidth: "unset" }}
              icon={isMobile ? <ScheduleIcon fontSize="small" /> : null}
              iconPosition="start"
            />
            <Tab
              label="Weekly"
              value="weekly"
              sx={{ color: "#fff", minWidth: "unset" }}
              icon={isMobile ? <ScheduleIcon fontSize="small" /> : null}
              iconPosition="start"
            />
            <Tab
              label="Monthly"
              value="monthly"
              sx={{ color: "#fff", minWidth: "unset" }}
              icon={isMobile ? <ScheduleIcon fontSize="small" /> : null}
              iconPosition="start"
            />
            <Tab
              label="Annual"
              value="annual"
              sx={{ color: "#fff", minWidth: "unset" }}
              icon={isMobile ? <ScheduleIcon fontSize="small" /> : null}
              iconPosition="start"
            />
          </Tabs>
        </Paper>
  
        {/* Notification Panel */}
        <Box sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000
      }}>
        <Tooltip title={`${newIncidentsCount} new incidents`}>
          <IconButton 
            color="inherit" 
            onClick={() => setShowNotifications(!showNotifications)}
            sx={{ 
              position: 'relative',
              backgroundColor: '#fff',
              boxShadow: 3,
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            <Badge 
              badgeContent={newIncidentsCount} 
              color="error"
              overlap="circular"
            >
              <NotificationsIcon color="action" />
            </Badge>
          </IconButton>
        </Tooltip>
        
        {/* Notifications dropdown - now toggleable */}
        {showNotifications && (
          <Paper sx={{
            mt: 1,
            maxHeight: 400,
            overflow: 'auto',
            width: 300
          }}>
            {recentChanges.length > 0 ? (
              recentChanges.map((change, index) => (
                <Box key={index} sx={{
                  p: 2,
                  borderBottom: '1px solid #eee',
                  backgroundColor: change.isNew ? '#fff8e1' : '#fff',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {change.isNew && <NewIcon color="error" sx={{ mr: 1 }} />}
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {change.fireReportNumber}
                    </Typography>
                    <Chip 
                      label={change.natureOfCall} 
                      size="small" 
                      sx={{ ml: 1 }} 
                      color={change.isNew ? 'error' : 'default'}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {change.incidentAddress}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(change.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2">No recent notifications</Typography>
              </Box>
            )}
          </Paper>
        )}
      </Box>

         {/* Demo button - remove in production */}
         <Button 
        variant="contained" 
        color="secondary" 
        onClick={simulateNewIncident}
        sx={{ mb: 2 }}
      >
        Simulate New Incident
      </Button>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            borderLeft: '4px solid #f44336',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Incidents
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ mr: 1 }}>
                  {stats.totalIncidents}
                </Typography>
                {newIncidentsCount > 0 && (
                  <Chip 
                    label={`+${newIncidentsCount}`} 
                    color="error" 
                    size="small"
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* ... other KPI cards ... */}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FireDepartmentIcon color="error" sx={{ mr: 1 }} />
            <Typography variant="h5">
              Recent Incidents
            </Typography>
            {newIncidentsCount > 0 && (
              <Chip 
                label={`${newIncidentsCount} new`} 
                color="error" 
                size="small"
                sx={{ ml: 2 }}
              />
            )}
          </Box>
          
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Report #</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date/Time</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {fireIncidents.map((incident) => (
                  <tr 
                    key={incident.id}
                    style={{ 
                      borderBottom: '1px solid #eee',
                      backgroundColor: incident.isNew ? '#fff8e1' : 'transparent',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      {incident.fireReportNumber}
                      {incident.isNew && (
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#f44336',
                          borderRadius: '50%',
                          marginLeft: '8px',
                          animation: 'pulse 1.5s infinite'
                        }}></span>
                      )}
                    </td>
                    <td style={{ padding: '12px' }}>{incident.incidentAddress}</td>
                    <td style={{ padding: '12px' }}>
                      <Chip 
                        label={incident.natureOfCall} 
                        size="small" 
                        color={
                          incident.natureOfCall === 'Emergency' ? 'error' : 
                          incident.natureOfCall === 'Rescue' ? 'primary' : 'default'
                        }
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      {new Date(incident.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {incident.isNew ? (
                        <Chip 
                          label="NEW" 
                          color="error" 
                          size="small"
                          icon={<NewIcon fontSize="small" />}
                        />
                      ) : (
                        <Chip 
                          label="Processed" 
                          color="default" 
                          size="small"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
    
  
        {/* Main Content */}
        <Grid container spacing={isMobile ? 2 : 3}>
          {/* KPI Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              boxShadow: 3,
              borderLeft: `4px solid ${themeColors.error}`,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmergencyIcon
                    sx={{
                      fontSize: isMobile ? "2rem" : "2.5rem",
                      color: themeColors.error,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    {timeRangeData.label} Incidents
                  </Typography>
                </Box>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{ fontWeight: "bold" }}
                >
                  {timeRangeData.incidents}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Chip
                    label={`${formatNumber(timeRangeData.responseTime)} min avg`}
                    size="small"
                    sx={{
                      backgroundColor: themeColors.error,
                      color: "#fff",
                      mr: 1,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              boxShadow: 3,
              borderLeft: `4px solid ${themeColors.success}`,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PeopleIcon
                    sx={{
                      fontSize: isMobile ? "2rem" : "2.5rem",
                      color: themeColors.success,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Lives Saved
                  </Typography>
                </Box>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{ fontWeight: "bold" }}
                >
                  {timeRangeData.livesSaved}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Chip
                    label={`${timeRange === "annual" ? "425" : "35"} animals saved`}
                    size="small"
                    sx={{
                      backgroundColor: themeColors.success,
                      color: "#fff",
                      mr: 1,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              boxShadow: 3,
              borderLeft: `4px solid ${themeColors.warning}`,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <VehicleIcon
                    sx={{
                      fontSize: isMobile ? "2rem" : "2.5rem",
                      color: themeColors.warning,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Equipment Status
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant={isMobile ? "h4" : "h3"}
                    sx={{ fontWeight: "bold", mr: 2 }}
                  >
                    {equipmentData.filter((e) => e.status === "Functional").length}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /{equipmentData.length} operational
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Chip
                    icon={<OperationalIcon fontSize="small" />}
                    label={`${equipmentData.filter((e) => e.status === "Functional").length} functional`}
                    size="small"
                    sx={{
                      backgroundColor: themeColors.success,
                      color: "#fff",
                      mr: 1,
                    }}
                  />
                  <Chip
                    icon={<DysfunctionalIcon fontSize="small" />}
                    label={`${equipmentData.filter((e) => e.status === "Dysfunctional").length} dysfunctional`}
                    size="small"
                    sx={{
                      backgroundColor: themeColors.error,
                      color: "#fff",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: "100%",
              boxShadow: 3,
              borderLeft: `4px solid ${themeColors.info}`,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PeopleIcon
                    sx={{
                      fontSize: isMobile ? "2rem" : "2.5rem",
                      color: themeColors.info,
                      mr: 2,
                    }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Staff Utilization
                  </Typography>
                </Box>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{ fontWeight: "bold" }}
                >
                  {formatNumber(
                    staffData.reduce((acc, curr) => acc + curr.utilization, 0) /
                      staffData.length
                  )}
                  %
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Chip
                    label={`${staffData.reduce((acc, curr) => acc + curr.vacant, 0)} vacancies`}
                    size="small"
                    sx={{
                      backgroundColor: themeColors.info,
                      color: "#fff",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
  
          {/* New Incidents */}
          {fireIncidents.filter((i) => i.isNew).map((incident) => (
            <Grid item xs={12} key={incident.id}>
              <Card
                sx={{
                  borderLeft: "4px solid #f44336",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 60px 60px 0",
                    borderColor: "transparent #ffebee transparent transparent",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#f44336",
                    fontWeight: "bold",
                    transform: "rotate(45deg)",
                  }}
                >
                  NEW
                </Box>
                <CardContent>
                  <Typography variant="h6">{incident.fireReportNumber}</Typography>
                  <Typography>{incident.incidentAddress}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
  
          {/* Charts Section */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                boxShadow: 3,
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TrendIcon
                    sx={{
                      color: themeColors.primary,
                      mr: 1,
                      fontSize: "2rem",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Incident Trends & Response Times
                  </Typography>
                </Box>
                <ReactApexChart
                  options={incidentTrendsChart.options}
                  series={incidentTrendsChart.series}
                  type="line"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <VehicleIcon
                    sx={{
                      color: themeColors.primary,
                      mr: 1,
                      fontSize: "2rem",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Equipment Utilization
                  </Typography>
                </Box>
                <ReactApexChart
                  options={utilizationRadarChart.options}
                  series={utilizationRadarChart.series}
                  type="radar"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <VehicleIcon
                    sx={{
                      color: themeColors.primary,
                      mr: 1,
                      fontSize: "2rem",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Equipment Inventory Status
                  </Typography>
                </Box>
                <ReactApexChart
                  options={equipmentStatusChart.options}
                  series={equipmentStatusChart.series}
                  type="bar"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PeopleIcon
                    sx={{
                      color: themeColors.primary,
                      mr: 1,
                      fontSize: "2rem",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Staff Utilization Rates
                  </Typography>
                </Box>
                <ReactApexChart
                  options={staffUtilizationChart.options}
                  series={staffUtilizationChart.series}
                  type="bar"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <ScheduleIcon
                    sx={{
                      color: themeColors.primary,
                      mr: 1,
                      fontSize: "2rem",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Training Performance ({timeRangeData.label})
                  </Typography>
                </Box>
                <ReactApexChart
                  options={trainingChart.options}
                  series={trainingChart.series}
                  type="bar"
                  height={350}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  
        {/* Export Modal */}
        <Dialog
          open={exportDialogOpen}
          onClose={() => setExportDialogOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              backgroundColor: themeColors.primary,
              color: "#fff",
            }}
          >
            Export Data
          </DialogTitle>
          <FormControl fullWidth sx={{ px: 3, py: 2 }}>
            <InputLabel>Select File Format</InputLabel>
            <Select
              value={exportType}
              onChange={(e) => setExportType(e.target.value)}
              label="Select File Format"
            >
              <MenuItem value="excel">Excel (.xlsx)</MenuItem>
              <MenuItem value="pdf">PDF (.pdf)</MenuItem>
            </Select>
          </FormControl>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => setExportDialogOpen(false)}
              sx={{ color: themeColors.dark }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleExport}
              disabled={!exportType}
              sx={{
                px: 3,
                backgroundColor: themeColors.primary,
                "&:hover": {
                  backgroundColor: themeColors.secondary,
                },
              }}
            >
              Export
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default FireDashboard;
