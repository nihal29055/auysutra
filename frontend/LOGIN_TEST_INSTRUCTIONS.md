# Login to Dashboard Redirect Test Instructions

## How to Test Login Redirect to Dashboard

### 1. Start the Application
```bash
npm start
```

### 2. Test Login Flow

#### A. Direct Login Test
1. Navigate to `http://localhost:3000/login`
2. Use the demo credentials:
   - **Email:** `demo@ayursutra.com`
   - **Password:** `demo123`
3. Click "Sign In"
4. **Expected Result:** You should be automatically redirected to `/dashboard`

#### B. Protected Route Test
1. While logged out, try to access a protected route directly:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/appointments`
   - `http://localhost:3000/profile`
2. **Expected Result:** You should be redirected to `/login`
3. After logging in, you should be redirected back to the originally requested page

#### C. Already Logged In Test
1. After successfully logging in, try to access `/login` again
2. **Expected Result:** You should be automatically redirected to `/dashboard`

### 3. Implementation Details

The login redirect is handled in several places:

1. **Login.js (lines 46-52)**: Auto-redirects to dashboard if user is already authenticated
   ```javascript
   useEffect(() => {
     if (isAuthenticated) {
       const from = location.state?.from?.pathname || '/dashboard';
       navigate(from, { replace: true });
     }
   }, [isAuthenticated, navigate, location]);
   ```

2. **Login.js (lines 121-123)**: Redirects after successful login
   ```javascript
   const from = location.state?.from?.pathname || '/dashboard';
   navigate(from, { replace: true });
   ```

3. **App.js (lines 44-53)**: Protected Route Component
   ```javascript
   function ProtectedRoute({ children }) {
     const { user, loading } = useAuth();
     if (loading) return <div>Loading...</div>;
     return user ? children : <Navigate to="/login" />;
   }
   ```

### 4. Troubleshooting

If the redirect is not working:

1. **Check Browser Console** for any errors
2. **Verify AuthContext** is properly wrapping the app
3. **Check localStorage** for the token:
   - Open Developer Tools (F12)
   - Go to Application/Storage > Local Storage
   - Look for 'token' key
4. **Clear Browser Cache** and try again

### 5. Mock Authentication

The app currently uses mock authentication for demo purposes:
- The login service simulates a successful login with demo credentials
- A demo token is generated and stored in localStorage
- The user profile is mocked to return demo user data

To switch to real backend authentication:
1. Uncomment the actual API calls in `authService.js`
2. Comment out the mock responses
3. Ensure your backend API is running on the correct port

## Success Indicators

✅ Login with demo credentials works  
✅ Redirect to dashboard happens automatically after login  
✅ Protected routes redirect to login when not authenticated  
✅ Already logged-in users can't access login page  
✅ Token is stored in localStorage  
✅ User information is displayed in the dashboard  

## Additional Features

- **Remember Me**: When checked, keeps the user logged in longer
- **Social Login**: Buttons are present but need OAuth implementation
- **Forgot Password**: Redirects to password reset page (needs implementation)