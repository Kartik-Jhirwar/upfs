import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Description as ReportIcon,
  Fireplace as FireIcon,
  LocalFireDepartment as FireDepartmentIcon,
  Schedule as ScheduleIcon,
  Home as BuildingIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Warning as WarningIcon,
  ReportProblem as ProblemIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useFireData } from "./FireDataContext";

const FireIncidentReportForm = () => {
  const { addIncident } = useFireData();
  const [formData, setFormData] = useState({
    currentDate: null,
    fireReportNumber: "",
    jurisdiction: "",
    infoReceivedFrom: "",
    callerName: "",
    callerPhone: "",
    incidentAddress: "",
    callDate: null,
    callTime: null,
    departureTime: null,
    approxDistance: "",
    arrivalTime: null,
    deathDetails: "",
    natureOfCall: "",
    leaveDate: null,
    leaveTime: null,
    occupancyType: "",
    occupancyDetails: "",
    fireCategory: "",
    causeOfFire: "",
    buildingType: "",
    buildingDetails: "",
    areaDetails: "",
    injuryDetails: "",
    savedDetails: "",
    lossDetails: "",
    remarks: "",
    authorizedOfficer: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const natureOfCallOptions = [
    "Emergency",
    "False Alarm",
    "Drill",
    "Rescue",
    "Other",
  ];
  const occupancyTypeOptions = [
    "Residential",
    "Commercial",
    "Industrial",
    "Public",
    "Other",
  ];
  const fireCategoryOptions = [
    "Class A (Ordinary combustibles)",
    "Class B (Flammable liquids)",
    "Class C (Electrical)",
    "Class D (Combustible metals)",
    "Class K (Cooking oils)",
  ];
  const buildingTypeOptions = [
    "Concrete",
    "Wood",
    "Steel",
    "Mixed",
    "High-rise",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentDate) newErrors.currentDate = "Required";
    if (!formData.fireReportNumber) newErrors.fireReportNumber = "Required";
    if (!formData.jurisdiction) newErrors.jurisdiction = "Required";
    if (!formData.incidentAddress) newErrors.incidentAddress = "Required";
    if (!formData.callDate) newErrors.callDate = "Required";
    if (!formData.callTime) newErrors.callTime = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleDateChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleResetForm = () => {
    setFormData({
      currentDate: null,
      fireReportNumber: "",
      jurisdiction: "",
      infoReceivedFrom: "",
      callerName: "",
      callerPhone: "",
      incidentAddress: "",
      callDate: null,
      callTime: null,
      departureTime: null,
      approxDistance: "",
      arrivalTime: null,
      deathDetails: "",
      natureOfCall: "",
      leaveDate: null,
      leaveTime: null,
      occupancyType: "",
      occupancyDetails: "",
      fireCategory: "",
      causeOfFire: "",
      buildingType: "",
      buildingDetails: "",
      areaDetails: "",
      injuryDetails: "",
      savedDetails: "",
      lossDetails: "",
      remarks: "",
      authorizedOfficer: "",
    });
    setUploadedFile(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Submit Fire Incident Report?",
      text: "Please confirm all details are accurate before submission.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#757575",
      confirmButtonText: "Submit Report",
      cancelButtonText: "Review",
    });

    if (result.isConfirmed) {
      addIncident(formData); // Add to context instead of console.log

      Swal.fire({
        title: "Report Submitted!",
        text: "Fire incident report has been successfully recorded.",
        icon: "success",
        confirmButtonColor: "#d32f2f",
      });

      handleResetForm();
    }
  };
  const SectionHeader = ({ icon, title }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 4 }}>
      {React.createElement(icon, { color: "error", sx: { mr: 1 } })}
      <Typography variant="h5" color="error" fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <FireDepartmentIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" fontWeight={700} color="error">
            FORM-A 20 (FIRE INCIDENT REPORT)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          <WarningIcon color="warning" sx={{ fontSize: 16, mr: 0.5 }} />
          Disclaimer: This is a computer generated report. Neither department
          nor its associates, information providers or content providers warrant
          or guarantee the timeliness, sequence.
        </Typography>
        <Divider sx={{ mb: 3 }} />
      </Paper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SectionHeader icon={ScheduleIcon} title="Date & Time Information" />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Current Date *"
                value={formData.currentDate}
                onChange={handleDateChange("currentDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.currentDate}
                    helperText={errors.currentDate}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Call Received Date *"
                value={formData.callDate}
                onChange={handleDateChange("callDate")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.callDate}
                    helperText={errors.callDate}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TimePicker
                label="Call Received Time *"
                value={formData.callTime}
                onChange={handleDateChange("callTime")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.callTime}
                    helperText={errors.callTime}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TimePicker
                label="Departure Time from Station"
                value={formData.departureTime}
                onChange={handleDateChange("departureTime")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Approximate Distance (km)"
                fullWidth
                value={formData.approxDistance}
                onChange={handleChange("approxDistance")}
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TimePicker
                label="Arrival Time at Fire Scene"
                value={formData.arrivalTime}
                onChange={handleDateChange("arrivalTime")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Date Left Fire Scene"
                value={formData.leaveDate}
                onChange={handleDateChange("leaveDate")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TimePicker
                label="Time Left Fire Scene"
                value={formData.leaveTime}
                onChange={handleDateChange("leaveTime")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SectionHeader icon={ReportIcon} title="Report & Jurisdiction" />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fire Report Number *"
                fullWidth
                value={formData.fireReportNumber}
                onChange={handleChange("fireReportNumber")}
                error={!!errors.fireReportNumber}
                helperText={errors.fireReportNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Operational Jurisdiction *"
                fullWidth
                value={formData.jurisdiction}
                onChange={handleChange("jurisdiction")}
                error={!!errors.jurisdiction}
                helperText={errors.jurisdiction}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Information Received From"
                fullWidth
                value={formData.infoReceivedFrom}
                onChange={handleChange("infoReceivedFrom")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Authorized Fire Officer"
                fullWidth
                value={formData.authorizedOfficer}
                onChange={handleChange("authorizedOfficer")}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SectionHeader icon={PersonIcon} title="Caller Information" />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Caller Name"
                fullWidth
                value={formData.callerName}
                onChange={handleChange("callerName")}
                InputProps={{
                  startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Caller Phone Number"
                fullWidth
                value={formData.callerPhone}
                onChange={handleChange("callerPhone")}
                InputProps={{
                  startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SectionHeader icon={BuildingIcon} title="Incident Location" />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Address of Incident *"
                fullWidth
                multiline
                rows={2}
                value={formData.incidentAddress}
                onChange={handleChange("incidentAddress")}
                error={!!errors.incidentAddress}
                helperText={errors.incidentAddress}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SectionHeader icon={FireIcon} title="Incident Details" />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Nature of Call</InputLabel>
                <Select
                  value={formData.natureOfCall}
                  onChange={handleChange("natureOfCall")}
                  label="Nature of Call"
                >
                  {natureOfCallOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type of Occupancy</InputLabel>
                <Select
                  value={formData.occupancyType}
                  onChange={handleChange("occupancyType")}
                  label="Type of Occupancy"
                >
                  {occupancyTypeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {formData.occupancyType === "Other" && (
                  <TextField
                    label="Occupancy Details"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.occupancyDetails}
                    onChange={handleChange("occupancyDetails")}
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category of Fire</InputLabel>
                <Select
                  value={formData.fireCategory}
                  onChange={handleChange("fireCategory")}
                  label="Category of Fire"
                >
                  {fireCategoryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Probable Cause of Fire"
                fullWidth
                value={formData.causeOfFire}
                onChange={handleChange("causeOfFire")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type of Building</InputLabel>
                <Select
                  value={formData.buildingType}
                  onChange={handleChange("buildingType")}
                  label="Type of Building"
                >
                  {buildingTypeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {formData.buildingType === "Other" && (
                  <TextField
                    label="Building Details"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={formData.buildingDetails}
                    onChange={handleChange("buildingDetails")}
                  />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Details of Affected Area"
                fullWidth
                multiline
                rows={4.5}
                value={formData.areaDetails}
                onChange={handleChange("areaDetails")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Details of Injuries"
                fullWidth
                multiline
                rows={2}
                value={formData.injuryDetails}
                onChange={handleChange("injuryDetails")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Details of Death(s)"
                fullWidth
                multiline
                rows={2}
                value={formData.deathDetails}
                onChange={handleChange("deathDetails")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Details of Lives Saved"
                fullWidth
                multiline
                rows={2}
                value={formData.savedDetails}
                onChange={handleChange("savedDetails")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Details of Loss / Property Saved"
                fullWidth
                multiline
                rows={2}
                value={formData.lossDetails}
                onChange={handleChange("lossDetails")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remarks and Full Incident Details"
                fullWidth
                multiline
                rows={4}
                value={formData.remarks}
                onChange={handleChange("remarks")}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <SectionHeader icon={ProblemIcon} title="Media Attachments" />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                sx={{ mr: 2 }}
              >
                Upload Photos/Videos
                <input
                  type="file"
                  accept="image/*,video/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setUploadedFile(file);
                    }
                  }}
                />
              </Button>

              {uploadedFile && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    {uploadedFile.name}
                  </Typography>
                  <Tooltip title="View File">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        const url = URL.createObjectURL(uploadedFile);
                        window.open(url, "_blank");
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove File">
                    <IconButton
                      color="error"
                      onClick={() => setUploadedFile(null)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <FormHelperText>
                Maximum file size: 10MB. Supported formats: JPG, PNG, MP4
              </FormHelperText>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetForm}
          sx={{ mr: 2 }}
        >
          Reset Form
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit}
          size="large"
          startIcon={<FireDepartmentIcon />}
        >
          Submit Fire Incident Report
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default FireIncidentReportForm;
