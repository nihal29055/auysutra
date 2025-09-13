import React, { useState, useEffect } from 'react';
import { therapiesAPI, appointmentsAPI, authAPI } from '../services/apiService';

// Example 1: Basic data fetching with useEffect
const TherapyList = () => {
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTherapies();
  }, []);

  const fetchTherapies = async () => {
    try {
      setLoading(true);
      const data = await therapiesAPI.getAll(1, 10); // page 1, 10 items
      setTherapies(data.therapies || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch therapies');
      console.error('Error fetching therapies:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading therapies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Available Therapies</h2>
      <ul>
        {therapies.map((therapy) => (
          <li key={therapy._id}>
            {therapy.name} - ${therapy.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Example 2: Fetching with search/filter
const SearchableTherapies = () => {
  const [therapies, setTherapies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await therapiesAPI.search(searchQuery);
      setTherapies(data.therapies || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search therapies..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      <div>
        {therapies.map((therapy) => (
          <div key={therapy._id}>
            <h3>{therapy.name}</h3>
            <p>{therapy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example 3: Creating/Posting data
const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    therapyId: '',
    practitionerId: '',
    date: '',
    time: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const result = await appointmentsAPI.create(formData);
      setMessage('Appointment booked successfully!');
      
      // Reset form
      setFormData({
        therapyId: '',
        practitionerId: '',
        date: '',
        time: '',
        notes: ''
      });
    } catch (err) {
      setMessage('Failed to book appointment: ' + err.message);
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Additional notes..."
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
      
      {message && <p>{message}</p>}
    </form>
  );
};

// Example 4: Updating data
const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  // Fetch current profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await authAPI.getProfile();
      setProfile(data.user || {});
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await authAPI.updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="email"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="tel"
        value={profile.phone}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
        placeholder="Phone"
      />
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </div>
  );
};

// Example 5: Deleting data
const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentsAPI.getUserAppointments();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      setLoading(true);
      await appointmentsAPI.cancel(appointmentId, 'User requested cancellation');
      
      // Remove from local state
      setAppointments(appointments.filter(apt => apt._id !== appointmentId));
      alert('Appointment cancelled successfully');
    } catch (err) {
      alert('Failed to cancel appointment');
      console.error('Cancel error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id}>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <p>Status: {appointment.status}</p>
          <button 
            onClick={() => handleCancel(appointment._id)}
            disabled={loading || appointment.status === 'cancelled'}
          >
            Cancel Appointment
          </button>
        </div>
      ))}
    </div>
  );
};

// Example 6: Real-time data with polling
const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch initially
    fetchUnreadCount();

    // Poll every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const data = await notificationsAPI.getUnreadCount();
      setUnreadCount(data.count || 0);
    } catch (err) {
      console.error('Failed to fetch notification count:', err);
    }
  };

  return (
    <div>
      🔔 {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
};

// Example 7: Custom hook for data fetching
const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

// Using the custom hook
const TherapyDetails = ({ therapyId }) => {
  const { data, loading, error } = useApi(
    () => therapiesAPI.getById(therapyId),
    [therapyId]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No therapy found</div>;

  return (
    <div>
      <h1>{data.therapy.name}</h1>
      <p>{data.therapy.description}</p>
      <p>Duration: {data.therapy.duration} minutes</p>
      <p>Price: ${data.therapy.price}</p>
    </div>
  );
};

// Export all examples
export {
  TherapyList,
  SearchableTherapies,
  AppointmentBooking,
  UpdateProfile,
  AppointmentManager,
  NotificationBell,
  TherapyDetails,
  useApi
};