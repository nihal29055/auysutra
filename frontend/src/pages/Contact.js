import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Send,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  WhatsApp
} from '@mui/icons-material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const contactInfo = [
    {
      icon: <LocationOn color="primary" sx={{ fontSize: 30 }} />,
      title: "Visit Us",
      details: [
        "AyurSutra Wellness Center",
        "123 Wellness Avenue, Health District",
        "New Delhi, India - 110001"
      ]
    },
    {
      icon: <Phone color="primary" sx={{ fontSize: 30 }} />,
      title: "Call Us",
      details: [
        "+91 11 1234 5678",
        "+91 11 9876 5432",
        "Toll Free: 1800-123-4567"
      ]
    },
    {
      icon: <Email color="primary" sx={{ fontSize: 30 }} />,
      title: "Email Us",
      details: [
        "info@ayursutra.com",
        "appointments@ayursutra.com",
        "support@ayursutra.com"
      ]
    },
    {
      icon: <AccessTime color="primary" sx={{ fontSize: 30 }} />,
      title: "Working Hours",
      details: [
        "Monday - Saturday: 8:00 AM - 8:00 PM",
        "Sunday: 9:00 AM - 6:00 PM",
        "Emergency: 24/7 Available"
      ]
    }
  ];

  const inquiryTypes = [
    "General Inquiry",
    "Appointment Booking",
    "Therapy Information",
    "Treatment Consultation",
    "Pricing & Packages",
    "Technical Support",
    "Feedback & Suggestions",
    "Partnership Inquiry"
  ];

  const socialLinks = [
    { icon: <Facebook />, name: "Facebook", url: "#", color: "#1877F2" },
    { icon: <Twitter />, name: "Twitter", url: "#", color: "#1DA1F2" },
    { icon: <Instagram />, name: "Instagram", url: "#", color: "#E4405F" },
    { icon: <YouTube />, name: "YouTube", url: "#", color: "#FF0000" },
    { icon: <WhatsApp />, name: "WhatsApp", url: "#", color: "#25D366" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setAlertMessage('Please fill in all required fields.');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertMessage('Please enter a valid email address.');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Show success message
    setAlertMessage('Thank you for your message! We will get back to you soon.');
    setAlertType('success');
    setShowAlert(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container maxWidth="lg">
      {/* Header Section */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          We're here to help you on your wellness journey. Reach out to us for any questions, 
          appointments, or support you need.
        </Typography>
      </Box>

      {/* Contact Information Cards */}
      <Box sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%', 
                textAlign: 'center', 
                p: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {info.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom color="primary">
                    {info.title}
                  </Typography>
                  {info.details.map((detail, i) => (
                    <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {detail}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Form and Map Section */}
      <Box sx={{ py: 6 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Send Us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Inquiry Type</InputLabel>
                      <Select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        label="Inquiry Type"
                      >
                        {inquiryTypes.map((type, index) => (
                          <MenuItem key={index} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Please describe your inquiry or how we can help you..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{ minWidth: 150 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Map and Additional Info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom color="primary">
                Find Us
              </Typography>
              
              {/* Placeholder for Map - Replace with actual map integration */}
              <Box sx={{ 
                width: '100%', 
                height: 300, 
                backgroundColor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                borderRadius: 1,
                backgroundImage: 'url(https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <Typography variant="h6" color="white" sx={{ 
                  textAlign: 'center',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  p: 2,
                  borderRadius: 1
                }}>
                  AyurSutra Wellness Center
                  <br />
                  Interactive Map Coming Soon
                </Typography>
              </Box>

              {/* Emergency Contact */}
              <Paper elevation={1} sx={{ p: 3, backgroundColor: 'error.light', color: 'white', mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Emergency Contact
                </Typography>
                <Typography variant="body2">
                  For urgent health concerns or emergency situations:
                </Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  📞 Emergency Hotline: +91 11 9999 0000
                </Typography>
              </Paper>

              {/* Social Media Links */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: social.color,
                        border: `2px solid ${social.color}`,
                        '&:hover': {
                          backgroundColor: social.color,
                          color: 'white'
                        }
                      }}
                      aria-label={`Visit our ${social.name} page`}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* FAQ Quick Links */}
      <Box sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4, backgroundColor: 'primary.main', color: 'white' }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Quick Help
          </Typography>
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                📋 Book Appointment
              </Typography>
              <Typography variant="body2">
                Schedule your consultation or therapy session online
              </Typography>
              <Button variant="outlined" color="inherit" sx={{ mt: 2 }}>
                Book Now
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                💬 Live Chat
              </Typography>
              <Typography variant="body2">
                Get instant answers to your questions
              </Typography>
              <Button variant="outlined" color="inherit" sx={{ mt: 2 }}>
                Start Chat
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                📖 Resources
              </Typography>
              <Typography variant="body2">
                Browse our therapy guides and wellness tips
              </Typography>
              <Button variant="outlined" color="inherit" sx={{ mt: 2 }}>
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Alert Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact;