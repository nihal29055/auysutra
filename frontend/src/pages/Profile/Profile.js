import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Name: {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Email: {user?.email}
        </Typography>
      </Box>
    </Container>
  );
}

export default Profile;