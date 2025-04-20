import React, { useState } from "react";
import {
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { JumboCard } from "@jumbo/components";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

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
  "Category A",
  "Category B",
  "Category C",
  "Unknown",
];
const buildingTypeOptions = ["Concrete", "Wood", "Mixed", "Other"];

const FireComplaintForm = () => {
  const [formData, setFormData] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetForm = () => {
    setFormData({});
    setUploadedFile(null);
  };

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Please confirm you want to submit the fire incident complaint.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
    });

    if (result.isConfirmed) {
      console.log("Submitted data:", formData); // Replace with actual API call

      Swal.fire({
        title: "Submitted!",
        text: "Your complaint has been recorded.",
        icon: "success",
      });

      handleResetForm();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <JumboCard sx={{ p: 3,overflowX:"auto" }}>
        <CardContent>
          <Typography
            variant="h2"
            color="primary"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            Fire Incident Complaint Form
          </Typography>

          {/* --- Date & Time Section --- */}
          <Typography
            variant="h4"
            color="primary"
            fontWeight={400}
            sx={{ mb: 2 }}
          >
            Date and Time
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Current Date"
                value={formData.currentDate || null}
                onChange={handleDateChange("currentDate")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Call Received Date"
                value={formData.callDate || null}
                onChange={handleDateChange("callDate")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TimePicker
                label="Call Received Time"
                value={formData.callTime || null}
                onChange={handleDateChange("callTime")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TimePicker
                label="Departure Time from Station"
                value={formData.departureTime || null}
                onChange={handleDateChange("departureTime")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TimePicker
                label="Arrival Time at Fire Scene"
                value={formData.arrivalTime || null}
                onChange={handleDateChange("arrivalTime")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Date Left Fire Scene"
                value={formData.leaveDate || null}
                onChange={handleDateChange("leaveDate")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TimePicker
                label="Time Left Fire Scene"
                value={formData.leaveTime || null}
                onChange={handleDateChange("leaveTime")}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
          </Grid>

          {/* --- Incident Details --- */}
          <Typography
            variant="h4"
            color="primary"
            fontWeight={400}
            sx={{ mt: 2, mb: 2 }}
          >
            Incident Details
          </Typography>
          <Grid container spacing={3}>
            {[
              "fireReportNumber",
              "approxDistance",
              "jurisdiction",
              "infoReceivedFrom",
              "callerName",
              "callerPhone",
              "deathDetails",
              "occupancyDetails",
              "causeOfFire",
              "buildingDetails",
              "incidentAddress",
              "areaDetails",
              "injuryDetails",
              "savedDetails",
              "lossDetails",
              "remarks",
              "authorizedOfficer",
            ].map((field) => (
              <Grid
                item
                xs={12}
                sm={field === "incidentAddress" || field === "remarks" ? 12 : 6}
                key={field}
              >
                <TextField
                  label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                  fullWidth
                  multiline={[
                    "remarks",
                    "incidentAddress",
                    "areaDetails",
                    "injuryDetails",
                    "savedDetails",
                    "lossDetails",
                  ].includes(field)}
                  rows={["remarks"].includes(field) ? 3 : 2}
                  value={formData[field] || ""}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nature of Call"
                select
                fullWidth
                value={formData.natureOfCall || ""}
                onChange={handleChange("natureOfCall")}
              >
                {natureOfCallOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Type of Occupancy"
                select
                fullWidth
                value={formData.occupancyType || ""}
                onChange={handleChange("occupancyType")}
              >
                {occupancyTypeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Category of Fire"
                select
                fullWidth
                value={formData.fireCategory || ""}
                onChange={handleChange("fireCategory")}
              >
                {fireCategoryOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Type of Building"
                select
                fullWidth
                value={formData.buildingType || ""}
                onChange={handleChange("buildingType")}
              >
                {buildingTypeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Upload Video/Image (optional)
              </Typography>

              <Button variant="outlined" component="label" sx={{ mr: 2 }}>
                Upload File
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
                <span>
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
                </span>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
               
              >
                Submit Complaint
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </JumboCard>
    </LocalizationProvider>
  );
};

export default FireComplaintForm;
