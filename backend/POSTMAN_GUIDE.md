# 📮 Postman API Testing Guide for AyurSutra

## 🚀 Quick Start

### 1. Import Collection to Postman
1. Open Postman
2. Click **Import** button (top left)
3. Select the file: `AyurSutra_API.postman_collection.json`
4. Click **Import**

### 2. Verify Backend is Running
Make sure your backend is running on port 5000:
```bash
npm run dev
```

## 📋 API Endpoints Overview

### Base URL
- **Local Development**: `http://localhost:5000`
- **API Base Path**: `http://localhost:5000/api`

## 🔑 Authentication Flow

### Step 1: Register a New User
```
POST http://localhost:5000/api/auth/register
```
**Body (JSON):**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "Password123",
    "phone": "+91 9876543210",
    "age": 30,
    "gender": "male",
    "role": "patient"
}
```

### Step 2: Login
```
POST http://localhost:5000/api/auth/login
```
**Body (JSON):**
```json
{
    "email": "john.doe@example.com",
    "password": "Password123"
}
```
**Response:** You'll receive a JWT token. This token is automatically saved in Postman variables.

### Step 3: Use Token for Protected Routes
The token is automatically added to requests that need authentication via:
```
Authorization: Bearer {{token}}
```

## 📝 Testing Each Module

### 1️⃣ Health Check (No Auth Required)
```
GET http://localhost:5000/health
```
Test if API is running properly.

### 2️⃣ Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/profile` | ✅ | Get current user profile |
| PUT | `/api/auth/profile` | ✅ | Update profile |
| PUT | `/api/auth/change-password` | ✅ | Change password |
| GET | `/api/auth/practitioners` | ❌ | Get all practitioners |
| PUT | `/api/auth/deactivate` | ✅ | Deactivate account |

### 3️⃣ Therapies Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/therapies` | ❌ | Get all therapies |
| GET | `/api/therapies/categories` | ❌ | Get categories |
| GET | `/api/therapies/types` | ❌ | Get therapy types |
| GET | `/api/therapies/search?q=detox` | ❌ | Search therapies |
| GET | `/api/therapies/recommended` | ❌ | Get recommendations |
| GET | `/api/therapies/:id` | ❌ | Get therapy by ID |
| POST | `/api/therapies` | ✅ (Practitioner) | Create therapy |
| PUT | `/api/therapies/:id` | ✅ (Practitioner) | Update therapy |
| DELETE | `/api/therapies/:id` | ✅ (Practitioner) | Delete therapy |

### 4️⃣ Appointments Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/appointments` | ✅ | Get user appointments |
| GET | `/api/appointments/available-slots` | ✅ | Check available slots |
| GET | `/api/appointments/:id` | ✅ | Get appointment details |
| POST | `/api/appointments` | ✅ | Create appointment |
| PUT | `/api/appointments/:id` | ✅ | Update appointment |
| PUT | `/api/appointments/:id/cancel` | ✅ | Cancel appointment |

### 5️⃣ Notifications Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/notifications` | ✅ | Get notifications |
| PUT | `/api/notifications/:id/read` | ✅ | Mark as read |
| PUT | `/api/notifications/read-all` | ✅ | Mark all as read |
| GET | `/api/notifications/unread-count` | ✅ | Get unread count |
| DELETE | `/api/notifications/:id` | ✅ | Delete notification |

## 🧪 Testing Workflow

### Basic Testing Flow:
1. **Register** a new user account
2. **Login** with credentials (token auto-saved)
3. **Test protected routes** using the token
4. **Create** test data (therapies, appointments)
5. **Read** the created data
6. **Update** the data
7. **Delete** test data

### Sample Test Scenarios:

#### Scenario 1: Patient Books Appointment
1. Register as patient
2. Login
3. Get list of therapies
4. Get list of practitioners
5. Check available slots
6. Book appointment
7. View appointment details
8. Cancel appointment if needed

#### Scenario 2: Practitioner Manages Therapies
1. Register as practitioner
2. Login
3. Create new therapy
4. Update therapy details
5. Get therapy list
6. Delete therapy

## 🔧 Postman Tips

### Using Variables
- `{{baseUrl}}` - Base URL (http://localhost:5000)
- `{{token}}` - JWT token (auto-set after login)

### Environment Setup (Optional)
Create environments for different setups:
- **Local**: `baseUrl = http://localhost:5000`
- **Staging**: `baseUrl = https://staging-api.ayursutra.com`
- **Production**: `baseUrl = https://api.ayursutra.com`

### Auto Token Management
The collection includes scripts that automatically:
- Save token after login/register
- Add token to Authorization header for protected routes

### Testing with Different Data
Modify the request bodies to test:
- Valid data
- Invalid data (missing fields)
- Edge cases (special characters, long strings)
- Validation errors

## 🐛 Common Issues & Solutions

### Issue: "Unauthorized" Error
**Solution:** Login again to get a fresh token

### Issue: "Cannot connect to server"
**Solution:** Ensure backend is running on port 5000

### Issue: "Validation error"
**Solution:** Check request body format and required fields

### Issue: "Token expired"
**Solution:** Login again to refresh token

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

## 🎯 Quick Test Commands

### Using cURL (Alternative to Postman)

```bash
# Health Check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123","phone":"+919876543210","gender":"male"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123"}'

# Get Therapies
curl http://localhost:5000/api/therapies

# Protected Route (replace YOUR_TOKEN)
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📚 Additional Resources

- [Postman Documentation](https://learning.postman.com/docs/)
- [JWT Token Debugger](https://jwt.io/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

Happy Testing! 🚀