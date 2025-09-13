import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip
} from '@mui/material';
import {
  LockOutlined,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Spa,
  Google,
  Facebook
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, loading, clearError, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [localErrors, setLocalErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    // Clear field error when user starts typing
    if (localErrors[name]) {
      setLocalErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear global error
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError();
    setLocalErrors({});

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setLocalErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use the AuthContext login function
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Navigate to intended destination or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Error handling is done in AuthContext
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSocialLogin = (provider) => {
    // Implement social login
    console.log(`Social login with ${provider}`);
    // This would typically redirect to OAuth provider
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}>
        <Paper elevation={6} sx={{
          padding: { xs: 3, sm: 4, md: 5 },
          borderRadius: 3,
          width: '100%',
          maxWidth: 480,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Spa sx={{ fontSize: 56, color: 'primary.main', mb: 2 }} />
            <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to AyurSutra Wellness Portal
            </Typography>
          </Box>

          {/* Error Alert */}
          {(error || localErrors.submit) && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => {
              clearError();
              setLocalErrors(prev => ({ ...prev, submit: '' }));
            }}>
              {error || localErrors.submit}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!localErrors.email}
              helperText={localErrors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!localErrors.password}
              helperText={localErrors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me and Forgot Password */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link
                component="button"
                variant="body2"
                onClick={handleForgotPassword}
                type="button"
                sx={{ textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 2,
                textTransform: 'none',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #00ACC1 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                },
                transition: 'all 0.3s ease'
              }}
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 3 }}>
              <Chip label="OR" size="small" />
            </Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin('google')}
                sx={{
                  py: 1,
                  borderColor: '#4285f4',
                  color: '#4285f4',
                  '&:hover': {
                    borderColor: '#357ae8',
                    backgroundColor: 'rgba(66, 133, 244, 0.04)'
                  }
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={() => handleSocialLogin('facebook')}
                sx={{
                  py: 1,
                  borderColor: '#1877f2',
                  color: '#1877f2',
                  '&:hover': {
                    borderColor: '#166fe5',
                    backgroundColor: 'rgba(24, 119, 242, 0.04)'
                  }
                }}
              >
                Facebook
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'primary.main',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign up now
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Demo Credentials Info */}
          <Box sx={{
            mt: 3,
            p: 2,
            backgroundColor: 'info.light',
            borderRadius: 2,
            opacity: 0.9
          }}>
            <Typography variant="caption" display="block" sx={{ fontWeight: 500, mb: 1 }}>
              Demo Credentials:
            </Typography>
            <Typography variant="caption" display="block">
              Email: demo@ayursutra.com
            </Typography>
            <Typography variant="caption" display="block">
              Password: demo123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
