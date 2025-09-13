import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, List, ListItem,
  ListItemText, Divider, LinearProgress, Button
} from '@mui/material';
import { Spa, Event, Person } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [therapies, setTherapies] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    setAppointments([
      { therapy: 'Virechana', date: '2025-09-20', time: '10:00 AM' },
      { therapy: 'Basti', date: '2025-09-23', time: '2:00 PM' },
    ]);

    setTherapies([
      { name: 'Nasya', progress: 40 },
      { name: 'Basti', progress: 60 },
    ]);

    setNotifications([
      { message: 'Remember to fast before your Virechana therapy.' },
      { message: 'Stay hydrated after your last Nasya session.' },
    ]);

    setProgress([
      { label: 'Overall Therapy Completion', value: 55 },
      { label: 'Weekly Attendance', value: 80 },
    ]);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
        Welcome to AyurSutra Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
            <Spa sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Therapies</Typography>
            <Typography variant="body2" color="text.secondary">Explore Panchakarma therapies</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
            <Event sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Appointments</Typography>
            <Typography variant="body2" color="text.secondary">Manage your bookings</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
            <Person sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Profile</Typography>
            <Typography variant="body2" color="text.secondary">View and edit your details</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your Panchakarma therapy dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Upcoming Appointments */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Upcoming Appointments</Typography>
              <List>
                {appointments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No upcoming appointments
                  </Typography>
                ) : (
                  appointments.map((appt, i) => (
                    <React.Fragment key={i}>
                      <ListItem>
                        <ListItemText
                          primary={`${appt.therapy} – ${appt.date}`}
                          secondary={`Time: ${appt.time}`}
                        />
                      </ListItem>
                      {i < appointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                )}
              </List>
              <Button variant="outlined" sx={{ mt: 2 }} fullWidth>
                Book New Appointment
              </Button>
            </Paper>
          </Grid>

          {/* Active Therapies */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Active Therapies</Typography>
              <List>
                {therapies.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No active therapies
                  </Typography>
                ) : (
                  therapies.map((t, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={t.name}
                        secondary={`${t.progress}% completed`}
                      />
                      <Box sx={{ width: '40%', ml: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={t.progress}
                        />
                      </Box>
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Recent Notifications</Typography>
              <List>
                {notifications.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No new notifications
                  </Typography>
                ) : (
                  notifications.map((n, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={n.message} />
                    </ListItem>
                  ))
                )}
              </List>
            </Paper>
          </Grid>

          {/* Progress Overview */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Progress Overview</Typography>
              {progress.map((p, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="body2">{p.label}</Typography>
                  <LinearProgress variant="determinate" value={p.value} />
                  <Typography variant="caption" color="text.secondary">
                    {p.value}%
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Quick Actions</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" color="primary">
                  View All Therapies
                </Button>
                <Button variant="contained" color="secondary">
                  Download Report
                </Button>
                <Button variant="outlined" color="success">
                  Contact Practitioner
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
