import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchReservations = async () => {
      try {
        console.log('Fetching reservations for user:', user.id);
        const response = await axios.get(`http://localhost:5002/api/reservations/user/${user.id}`);
        console.log('Reservations API response:', response);
        console.log('Reservations data:', response.data);
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Failed to load reservations');
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Not available';
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)} ${phone.slice(6)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{user?.name || 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">Surname</p>
              <p className="font-semibold">{user?.surname || 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{user?.email || 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">TCKN</p>
              <p className="font-semibold">{user?.tckn || 'Not available'}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone Number</p>
              <p className="font-semibold">{formatPhoneNumber(user?.phone)}</p>
            </div>
            <div>
              <p className="text-gray-600">Member Since</p>
              <p className="font-semibold">
                {user?.created_at ? formatDate(user.created_at) : 'Not available'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
          
          {loading ? (
            <p>Loading reservations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : reservations.length === 0 ? (
            <p>You don't have any reservations yet.</p>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Bungalow</p>
                      <p className="font-semibold">{reservation.bungalow_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className={`font-semibold ${
                        reservation.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-in</p>
                      <p className="font-semibold">{formatDate(reservation.check_in_date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-out</p>
                      <p className="font-semibold">{formatDate(reservation.check_out_date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Nights</p>
                      <p className="font-semibold">
                        {calculateNights(reservation.check_in_date, reservation.check_out_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Price</p>
                      <p className="font-semibold">${reservation.total_price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 