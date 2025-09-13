import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Home,
  Search,
  ArrowBack,
  ContactSupport,
  Spa,
  Schedule
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: "Home",
      description: "Return to our homepage",
      icon: <Home color="primary" sx={{ fontSize: 40 }} />,
      path: "/",
      color: "primary"
    },
    {
      title: "Our Services",
      description: "Explore Panchakarma therapies",
      icon: <Spa color="secondary" sx={{ fontSize: 40 }} />,
      path: "/therapies",
      color: "secondary"
    },
    {
      title: "Book Appointment",
      description: "Schedule your consultation",
      icon: <Schedule color="success" sx={{ fontSize: 40 }} />,
      path: "/appointments",
      color: "success"
    },
    {
      title: "Contact Us",
      description: "Get help and support",
      icon: <ContactSupport color="warning" sx={{ fontSize: 40 }} />,
      path: "/contact",
      color: "warning"
    }
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8, textAlign: 'center', minHeight: '60vh' }}>
        {/* 404 Error Display */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2
            }}
          >
            Oops! Page Not Found
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            The page you are looking for seems to have taken a detour on its wellness journey. 
            Don't worry, we'll help you find your way back to inner peace and balance.
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            mb: 6
          }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              component={RouterLink}
              to="/"
              sx={{ minWidth: 160 }}
            >
              Go Home
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              sx={{ minWidth: 160 }}
            >
              Go Back
            </Button>
          </Box>
        </Box>

        {/* Quick Navigation Cards */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Where would you like to go?
          </Typography>
          
          <Grid container spacing={3}>
            {quickLinks.map((link, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  component={RouterLink}
                  to={link.path}
                  sx={{ 
                    height: '100%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      '& .icon': {
                        transform: 'scale(1.1)'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <Box className="icon" sx={{ 
                      mb: 2, 
                      transition: 'transform 0.3s ease'
                    }}>
                      {link.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom color={`${link.color}.main`}>
                      {link.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {link.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Search Suggestion */}
        <Paper elevation={2} sx={{ p: 4, backgroundColor: 'primary.light', color: 'white' }}>
          <Typography variant="h5" gutterBottom>
            🔍 Looking for something specific?
          </Typography>
          <Typography variant="body1" paragraph>
            Try using our search feature or browse through our comprehensive therapy guides and services.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="outlined" 
              color="inherit"
              startIcon={<Search />}
              size="large"
            >
              Search Site
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              component={RouterLink}
              to="/therapies"
              size="large"
            >
              Browse Services
            </Button>
          </Box>
        </Paper>

        {/* Help Section */}
        <Box sx={{ mt: 6, p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Still need help?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Our support team is here to assist you on your wellness journey.
          </Typography>
          <Button 
            variant="text" 
            color="primary"
            component={RouterLink}
            to="/contact"
            startIcon={<ContactSupport />}
          >
            Contact Support
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFound;