import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper
} from '@mui/material';
import {
  Spa,
  Schedule,
  NotificationImportant,
  TrendingUp
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: <Schedule color="primary" sx={{ fontSize: 40 }} />,
      title: 'Automated Scheduling',
      description: 'Book and manage Panchakarma therapy sessions with ease'
    },
    {
      icon: <NotificationImportant color="primary" sx={{ fontSize: 40 }} />,
      title: 'Smart Notifications',
      description: 'Get timely reminders for pre and post-therapy care'
    },
    {
      icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />,
      title: 'Progress Tracking',
      description: 'Monitor your therapy progress and recovery milestones'
    },
    {
      icon: <Spa color="primary" sx={{ fontSize: 40 }} />,
      title: 'Traditional Therapies',
      description: 'Authentic Ayurvedic treatments with modern management'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          AyurSutra
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
          Traditional Panchakarma Therapy Management System
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Experience the perfect blend of ancient Ayurvedic wisdom and modern technology. 
          Manage your Panchakarma journey with automated scheduling, personalized care, 
          and comprehensive therapy tracking.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/therapies"
            sx={{ minWidth: 200 }}
          >
            Explore Therapies
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={RouterLink} 
            to="/register"
            sx={{ minWidth: 200 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Why Choose AyurSutra?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center', 
                  p: 2,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Panchakarma Section */}
      <Box sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4, backgroundColor: 'background.default' }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            About Panchakarma
          </Typography>
          <Typography variant="body1" paragraph>
            Panchakarma is a cornerstone of Ayurvedic medicine, representing a comprehensive 
            detoxification and rejuvenation therapy system. This ancient practice involves 
            five primary procedures designed to eliminate toxins, restore balance, and 
            promote optimal health.
          </Typography>
          <Typography variant="body1" paragraph>
            With the global Ayurveda market projected to reach USD 16 billion by 2026, 
            Panchakarma is gaining recognition worldwide for its effectiveness in treating 
            chronic diseases and promoting overall wellness.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/therapies"
              color="secondary"
            >
              Learn More About Our Therapies
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 6 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              10+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Traditional Therapies
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              500+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Satisfied Patients
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              50+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Certified Practitioners
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;