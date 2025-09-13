import React, { useState } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  MenuItem, List, ListItem, ListItemText, Divider 
} from '@mui/material';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    therapyType: '',
    date: '',
    time: '',
    notes: ''
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // add appointment
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.therapyType || !formData.date || !formData.time) return;

    setAppointments([...appointments, formData]);
    setFormData({ therapyType: '', date: '', time: '', notes: '' });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Manage your therapy appointments here.
        </Typography>

        {/* Appointment Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            select
            label="Therapy Type"
            name="therapyType"
            value={formData.therapyType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Vamana">Vamana (Therapeutic Emesis)</MenuItem>
            <MenuItem value="Virechana">Virechana (Therapeutic Purgation)</MenuItem>
            <MenuItem value="Basti">Basti (Medicated Enema)</MenuItem>
            <MenuItem value="Nasya">Nasya (Nasal Administration)</MenuItem>
            <MenuItem value="Raktamokshana">Raktamokshana (Bloodletting)</MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            type="time"
            label="Time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Appointment
          </Button>
        </Box>

        {/* Appointments List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Upcoming Appointments</Typography>
          <List>
            {appointments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No appointments yet.
              </Typography>
            ) : (
              appointments.map((appt, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`${appt.therapyType} – ${appt.date} at ${appt.time}`}
                      secondary={appt.notes}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default Appointments;
