import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Your Panchakarma therapy dashboard
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Upcoming Appointments</Typography>
              <Typography variant="body2" color="text.secondary">
                No upcoming appointments
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Active Therapies</Typography>
              <Typography variant="body2" color="text.secondary">
                No active therapies
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Recent Notifications</Typography>
              <Typography variant="body2" color="text.secondary">
                No new notifications
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;