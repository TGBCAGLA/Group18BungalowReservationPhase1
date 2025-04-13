import React, { useEffect, useState } from "react";
import api from "../services/api";

const ManagerDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    totalRevenue: 0
  });
  const [activeTab, setActiveTab] = useState('reservations');
  const [showReservationLog, setShowReservationLog] = useState(false);
  const [showContactMessages, setShowContactMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageStatus, setMessageStatus] = useState('all');
  const [messageSearch, setMessageSearch] = useState('');
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    fetchReservations();
    fetchMessages();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/reservations");
      setReservations(response.data);
      calculateStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setError("Failed to load reservations. Please try again later.");
      setLoading(false);
    }
  };

  const calculateStats = (reservations) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Günün başlangıcına ayarla

    const thisWeek = new Date(today);
    thisWeek.setDate(today.getDate() - 7);

    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const stats = {
      total: reservations.length,
      pending: reservations.filter(r => r.status === 'pending').length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length,
      today: reservations.filter(r => {
        const reservationDate = new Date(r.created_at);
        reservationDate.setHours(0, 0, 0, 0);
        return reservationDate.getTime() === today.getTime();
      }).length,
      thisWeek: reservations.filter(r => new Date(r.created_at) >= thisWeek).length,
      thisMonth: reservations.filter(r => new Date(r.created_at) >= thisMonth).length,
      totalRevenue: reservations.reduce((sum, r) => sum + parseFloat(r.total_price), 0)
    };

    setStats(stats);
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await api.put(`/reservations/${reservationId}/status`, {
        status: newStatus
      });
      fetchReservations();
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Failed to update reservation status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.user_surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    
    const reservationDate = new Date(reservation.created_at);
    const matchesDate = dateFilter === "all" || 
      (dateFilter === "today" && reservationDate.toDateString() === new Date().toDateString()) ||
      (dateFilter === "thisWeek" && reservationDate >= new Date(new Date().setDate(new Date().getDate() - 7))) ||
      (dateFilter === "thisMonth" && reservationDate >= new Date(new Date().getFullYear(), new Date().getMonth(), 1));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const fetchMessages = async () => {
    try {
      const response = await api.get("/contact");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages. Please try again later.");
    }
  };

  const handleMessageStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/contact/${id}/status`, {
        status: newStatus
      });
      fetchMessages();
    } catch (error) {
      console.error("Error updating message status:", error);
      setError("Failed to update message status. Please try again.");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await api.delete(`/contact/${id}`);
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Failed to delete message. Please try again.");
    }
  };

  const toggleMessage = (messageId) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = 
        msg.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
        msg.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
        msg.subject.toLowerCase().includes(messageSearch.toLowerCase());
      const matchesStatus = messageStatus === 'all' || msg.status === messageStatus;
      
      console.log('Message:', msg);
      console.log('Matches search:', matchesSearch);
      console.log('Matches status:', matchesStatus);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Reservations</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Today's Reservations</h3>
          <p className="text-2xl">{stats.today}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">This Week</h3>
          <p className="text-2xl">{stats.thisWeek}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl">${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="quick-access-buttons mb-8">
        <button
          onClick={() => setShowReservationLog(!showReservationLog)}
          className={`quick-access-btn ${showReservationLog ? 'active' : ''}`}
        >
          <span className="icon">📋</span>
          Reservation Log
        </button>
        <button
          onClick={() => setShowContactMessages(!showContactMessages)}
          className={`quick-access-btn ${showContactMessages ? 'active' : ''}`}
        >
          <span className="icon">✉️</span>
          Contact Messages
        </button>
      </div>

      {/* Reservation Log Section */}
      {showReservationLog && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Reservation Log</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Reservation ID</th>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Bungalow</th>
                  <th className="px-6 py-3 text-left">Check In</th>
                  <th className="px-6 py-3 text-left">Check Out</th>
                  <th className="px-6 py-3 text-left">Nights</th>
                  <th className="px-6 py-3 text-left">Total Price</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-t">
                    <td className="px-6 py-4">{reservation.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{reservation.user_name} {reservation.user_surname}</div>
                        <div className="text-sm text-gray-600">{reservation.user_email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{reservation.bungalow_name}</div>
                        <div className="text-sm text-gray-600">Unit: {reservation.unit_number}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{formatDate(reservation.check_in_date)}</td>
                    <td className="px-6 py-4">{formatDate(reservation.check_out_date)}</td>
                    <td className="px-6 py-4">{calculateNights(reservation.check_in_date, reservation.check_out_date)}</td>
                    <td className="px-6 py-4">${reservation.total_price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={reservation.status}
                        onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                        className="p-2 border rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Messages Section */}
      {showContactMessages && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Messages</h2>
          <div className="filters mb-6">
            <input
              type="text"
              placeholder="Search messages..."
              value={messageSearch}
              onChange={(e) => setMessageSearch(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <select
              value={messageStatus}
              onChange={(e) => setMessageStatus(e.target.value)}
              className="w-full p-2 border rounded mt-2"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Subject</th>
                  <th className="px-6 py-3 text-left">From</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left w-1/3">Message</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((message) => (
                  <tr key={message.id} className="border-t">
                    <td className="px-6 py-4">{message.subject}</td>
                    <td className="px-6 py-4">{message.name}</td>
                    <td className="px-6 py-4">{message.email}</td>
                    <td className="px-6 py-4">{new Date(message.created_at).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <div className={`${expandedMessages[message.id] ? '' : 'line-clamp-3'} text-gray-700`}>
                          {message.message}
                        </div>
                        {message.message.length > 150 && (
                          <button
                            onClick={() => toggleMessage(message.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm mt-1"
                          >
                            {expandedMessages[message.id] ? 'Show Less' : 'Read More'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        message.status === 'unread' ? 'bg-red-100 text-red-800' :
                        message.status === 'read' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <select
                          value={message.status}
                          onChange={(e) => handleMessageStatusChange(message.id, e.target.value)}
                          className="p-2 border rounded"
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button 
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
