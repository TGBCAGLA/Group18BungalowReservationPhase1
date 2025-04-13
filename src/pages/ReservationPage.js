import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import "./ReservationPage.css";

const ReservationPage = () => {
  const { bungalowId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const bungalowIdNum = parseInt(bungalowId);
  
  const bungalowPrices = {
    1: 120, // family-bungalow
    2: 180, // big-family-bungalow
    3: 250  // luxury-bungalow
  };

  const bungalowNames = {
    1: "Family Bungalow",
    2: "Big Family Bungalow",
    3: "Luxury Bungalow"
  };

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [sameDayError, setSameDayError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    if (!bungalowIdNum) {
      navigate('/');
    }
    fetchBookedDates();
  }, [bungalowIdNum, navigate]);

  const fetchBookedDates = async () => {
    try {
      console.log('Fetching booked dates for bungalow type:', bungalowId);
      const response = await axios.get(`http://localhost:5002/api/reservations/bungalow/${bungalowId}`);
      console.log('Received booked dates:', response.data);
      
      // Convert dates to local timezone and set time to midnight
      const dates = response.data.map(reservation => {
        const start = new Date(reservation.check_in_date);
        const end = new Date(reservation.check_out_date);
        
        // Set time to midnight in local timezone
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        
        return {
          start,
          end
        };
      });
      
      console.log('Processed dates:', dates);
      setBookedDates(dates);
    } catch (error) {
      console.error("Error fetching booked dates:", error);
      setBookedDates([]); // Set empty array on error
    }
  };

  const isDateBooked = (date) => {
    // Set time to midnight for comparison
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    const isBooked = bookedDates.some(booking => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      
      // Set time to midnight for comparison
      bookingStart.setHours(0, 0, 0, 0);
      bookingEnd.setHours(0, 0, 0, 0);
      
      const result = checkDate >= bookingStart && checkDate <= bookingEnd;
      console.log('Checking date:', checkDate, 'against booking:', booking, 'result:', result);
      return result;
    });
    
    console.log('Is date booked:', checkDate, isBooked);
    return isBooked;
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate >= today && !isDateBooked(checkDate);
  };

  const handleDateClick = (date) => {
    if (!isDateSelectable(date)) return;

    // Yerel tarih formatını kullan
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(dateStr);
      setCheckOutDate("");
    } else if (dateStr > checkInDate) {
      setCheckOutDate(dateStr);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(selectedMonth);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button 
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
            className="calendar-nav"
          >
            &lt;
          </button>
          <h3>{selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <button 
            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
            className="calendar-nav"
          >
            &gt;
          </button>
        </div>
        <div className="calendar-grid">
          {weekDays.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
          {days.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} className="calendar-day empty" />;
            
            const isBooked = isDateBooked(date);
            const isSelectable = isDateSelectable(date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            const isSelected = dateStr === checkInDate || dateStr === checkOutDate;
            const isInRange = checkInDate && checkOutDate &&
                            date > new Date(checkInDate) && 
                            date < new Date(checkOutDate);

            return (
              <div
                key={dateStr}
                className={`calendar-day ${isBooked ? 'booked' : ''} ${isSelectable ? 'selectable' : ''} ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <span>{date.getDate()}</span>
              </div>
            );
          })}
        </div>
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-color booked"></div>
            <span>Booked</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    );
  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();
    return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
  };

  const calculatePrice = () => {
    setErrorMessage("");
    setSameDayError("");

    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);

      if (start >= end) {
        setSameDayError("Check-out date must be after check-in date.");
        setTotalPrice(0);
        return;
      }

      const nights = Math.max((end - start) / (1000 * 60 * 60 * 24), 0);

      if (nights > 30) {
        setErrorMessage("Reservations can only be made for up to 30 days.");
        setTotalPrice(0);
        return;
      }

      setTotalPrice(nights * bungalowPrices[bungalowIdNum]);
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [checkInDate, checkOutDate]);

  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);

    if (checkOutDate && new Date(newCheckInDate) >= new Date(checkOutDate)) {
      setCheckOutDate("");
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);
  };

  const blockManualDateEntry = (e) => {
    e.preventDefault();
  };

  const stepNames = ["Choose Dates", "Confirm Reservation", "Payment"];

  const handleContinue = () => {
    if (totalPrice > 0 && !sameDayError && !errorMessage) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleSubmit = async () => {
    try {
      if (currentStep === 3) { // Payment step
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
          setErrorMessage("Please fill in all payment details");
          return;
        }

        // Tarihleri YYYY-MM-DD formatında gönder
        const reservationData = {
          bungalow_id: bungalowIdNum,
          user_id: user.id,
          check_in_date: checkInDate, // Zaten YYYY-MM-DD formatında
          check_out_date: checkOutDate, // Zaten YYYY-MM-DD formatında
          total_price: totalPrice,
          payment_method: paymentMethod,
          card_number: cardNumber.replace(/\s/g, ''), // Remove spaces from card number
          card_name: cardName,
          expiry_date: expiryDate,
          cvv: cvv,
          status: 'pending'
        };

        console.log('Sending reservation data:', reservationData);
        
        const response = await axios.post('http://localhost:5002/api/reservations', reservationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data) {
          setShowPopup(true);
        }
      } else {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error creating reservation:', error.response?.data || error);
      setErrorMessage(error.response?.data?.error || 'Failed to create reservation. Please try again.');
    }
  };

  const handleConfirmClick = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Reservation</h1>
      <div className="flex flex-wrap justify-center mb-6">
        {stepNames.map((stepName, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-4 mb-4 sm:mb-0"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 
                ${
                  currentStep === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
            >
              {index + 1}
            </div>
            <span className="text-sm">{stepName}</span>
          </div>
        ))}
      </div>

      {currentStep === 1 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            {renderCalendar()}
          </div>

          <div className="mt-4">
            <label className="block mb-2 font-semibold">Check-in Date:</label>
            <input
              type="date"
              className="w-full border p-2 rounded-lg mb-4"
              value={checkInDate}
              min={getCurrentDate()}
              onChange={handleCheckInChange}
              onKeyDown={blockManualDateEntry}
            />

            <label className="block mb-2 font-semibold">Check-out Date:</label>
            <input
              type="date"
              className="w-full border p-2 rounded-lg mb-4"
              value={checkOutDate}
              min={checkInDate || getCurrentDate()}
              onChange={handleCheckOutChange}
              onKeyDown={blockManualDateEntry}
            />
          </div>

          {sameDayError && (
            <p className="text-red-500 text-sm">{sameDayError}</p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <p className="text-lg font-semibold">
            Total Price: {totalPrice === 0 ? "-" : `$${totalPrice}`}
          </p>

          <button
            className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto"
            disabled={totalPrice === 0 || sameDayError || errorMessage}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Confirm Reservation</h2>

          <p className="text-lg mb-2">
            <strong>Name:</strong> {user?.name || 'Not available'}
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {user?.email || 'Not available'}
          </p>
          <p className="text-lg mb-2">
            <strong>Bungalow Type:</strong> {bungalowNames[bungalowIdNum]}
          </p>
          <p className="text-lg mb-2">
            <strong>Check-in Date:</strong> {checkInDate}
          </p>
          <p className="text-lg mb-2">
            <strong>Check-out Date:</strong> {checkOutDate}
          </p>
          <p className="text-lg font-semibold mb-4">
            <strong>Total Price:</strong> ${totalPrice}
          </p>

          <button 
            className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto"
            onClick={handleSubmit}
          >
            Continue to Payment
          </button>

          <button 
            className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto inline-flex ml-4"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}

      {currentStep === 3 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Payment Method:</label>
            <select
              className="w-full border p-2 rounded-lg"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Card Number:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Cardholder Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Expiry Date:</label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">CVV:</label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
              />
            </div>
          </div>

          <p className="text-lg font-semibold mb-4">
            Total Amount: ${totalPrice}
          </p>

          <button
            className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto"
            onClick={handleSubmit}
          >
            Complete Payment
          </button>

          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto inline-flex ml-4"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Success!</h2>
            <p className="text-lg mb-4">Reservation has been created successfully.</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleConfirmClick}
            >
              Go Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;