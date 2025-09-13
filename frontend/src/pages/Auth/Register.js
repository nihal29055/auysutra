import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Alert, Paper, Grid,
  FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox,
  InputAdornment, IconButton, LinearProgress, Chip, Divider, Link
} from '@mui/material';
import {
  Visibility, VisibilityOff, Person, Email, Lock, Phone, CalendarToday,
  LocationOn, Spa, Google, Facebook
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', dateOfBirth: '', gender: '', address: '', city: '', state: '',
    pincode: '', medicalHistory: '', emergencyContact: '', emergencyPhone: '',
    agreeToTerms: false, subscribeNewsletter: true
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const steps = [
    { number: 1, title: 'Basic Information' },
    { number: 2, title: 'Contact Details' },
    { number: 3, title: 'Medical & Emergency' }
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  // 🔹 Password Strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'error';
    if (strength < 50) return 'warning';
    if (strength < 75) return 'info';
    return 'success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Very Weak';
    if (strength < 50) return 'Weak';
    if (strength < 75) return 'Medium';
    return 'Strong';
  };

  // 🔹 Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: fieldValue });

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  // 🔹 Step Content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" name="firstName" value={form.firstName}
                onChange={handleChange} fullWidth required
                InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="lastName" value={form.lastName}
                onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" name="email" type="email" value={form.email}
                onChange={handleChange} fullWidth required
                InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Password" name="password" type={showPassword ? 'text' : 'password'}
                value={form.password} onChange={handleChange} fullWidth required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
              {form.password && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    color={getPasswordStrengthColor(passwordStrength)}
                    sx={{ height: 6, borderRadius: 2 }}
                  />
                  <Typography variant="caption" color={`${getPasswordStrengthColor(passwordStrength)}.main`}>
                    {getPasswordStrengthText(passwordStrength)}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField label="Confirm Password" name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword}
                onChange={handleChange} fullWidth required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                  endAdornment: (
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Phone Number" name="phone" value={form.phone}
                onChange={handleChange} fullWidth required
                InputProps={{ startAdornment: <InputAdornment position="start"><Phone /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth}
                onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={form.gender} onChange={handleChange}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" name="address" value={form.address}
                onChange={handleChange} fullWidth multiline rows={2}
                InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="City" name="city" value={form.city} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select name="state" value={form.state} onChange={handleChange}>
                  {indianStates.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} fullWidth />
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Medical History (Optional)" name="medicalHistory"
                value={form.medicalHistory} onChange={handleChange} fullWidth multiline rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Emergency Contact Name" name="emergencyContact"
                value={form.emergencyContact} onChange={handleChange} fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Emergency Contact Phone" name="emergencyPhone"
                value={form.emergencyPhone} onChange={handleChange} fullWidth
                InputProps={{ startAdornment: <InputAdornment position="start"><Phone /></InputAdornment> }}
              />
            </Grid>
          </Grid>
        );

      default: return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Spa color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h3" color="primary" gutterBottom>
            Join AyurSutra
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Begin your wellness journey with authentic Ayurvedic care
          </Typography>
        </Box>

        {/* Step Indicator */}
        <Box mb={4}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            {steps.map((s, i) => (
              <React.Fragment key={s.number}>
                <Box
                  sx={{
                    width: 40, height: 40, borderRadius: '50%',
                    bgcolor: currentStep >= s.number ? 'primary.main' : 'grey.300',
                    color: currentStep >= s.number ? 'white' : 'text.secondary',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {s.number}
                </Box>
                {i < steps.length - 1 && (
                  <Box sx={{
                    width: 60, height: 2,
                    bgcolor: currentStep > s.number ? 'primary.main' : 'grey.300'
                  }} />
                )}
              </React.Fragment>
            ))}
          </Box>
          <Typography align="center" variant="h6">{steps[currentStep - 1].title}</Typography>
        </Box>

        {/* Form */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {errors.submit && <Alert severity="error" sx={{ mt: 3 }}>{errors.submit}</Alert>}

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={handleBack} disabled={currentStep === 1} variant="outlined">
                Back
              </Button>
              {currentStep < 3 ? (
                <Button onClick={handleNext} variant="contained">Next</Button>
              ) : (
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
              )}
            </Box>
          </form>
        </Paper>

        {/* Social */}
        <Box mt={4} textAlign="center">
          <Divider sx={{ mb: 3 }}><Chip label="Or Register with" /></Divider>
          <Box display="flex" gap={2} justifyContent="center">
            <Button variant="outlined" startIcon={<Google />} sx={{ minWidth: 150 }}>Google</Button>
            <Button variant="outlined" startIcon={<Facebook />} sx={{ minWidth: 150 }}>Facebook</Button>
          </Box>
        </Box>

        {/* Login link */}
        <Box textAlign="center" mt={4}>
          <Typography>Already have an account?{' '}
            <Link component={RouterLink} to="/login" color="primary">Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
