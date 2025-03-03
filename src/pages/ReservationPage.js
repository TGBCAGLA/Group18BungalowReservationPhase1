import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ReservationPage = () => {
  const { bungalowId } = useParams();
  const navigate = useNavigate();
  const bungalowPrices = {
    "small-family": 120,
    "big-family": 180,
    luxury: 250,
  };

  const handleConfirmClick = () => {
    setShowPopup(false);
    navigate("/"); // homepage e gönderiyor
  };

  const pricePerNight = bungalowPrices[bungalowId] || 0;

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [sameDayError, setSameDayError] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // mevcut step için yapıldı
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tckn, setTckn] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [tcknError, setTcknError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; 
    const dd = today.getDate();
    return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
  };

  const calculatePrice = () => {
    setErrorMessage(""); // Reset error mesaj
    setSameDayError(""); // Reset same day error mesaj

    // Check if check in and check out dates are set
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);

      // checking for check-out date is before check in date
      if (start >= end) {
        setSameDayError("Check-out date must be after check-in date.");
        setTotalPrice(0); // reset total price if error happen
        return;
      }

      const nights = Math.max((end - start) / (1000 * 60 * 60 * 24), 0);

      // Check if the reservation exceed 30 days
      if (nights > 30) {
        setErrorMessage("Reservations can only be made for up to 30 days.");
        setTotalPrice(0); // dont show if exceed 30 day
        return;
      }

      setTotalPrice(nights * pricePerNight);
    } else {
      setTotalPrice(0); // Reset if dates is empty 
    }
  };

  //  price calculation when checkInDate or checkOutDate changes
  useEffect(() => {
    calculatePrice();
  }, [checkInDate, checkOutDate]);

  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);

    // If check-out date is less than the new check-in date, reset check-out date
    if (checkOutDate && new Date(newCheckInDate) >= new Date(checkOutDate)) {
      setCheckOutDate(""); // Reset check-out date
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOutDate = e.target.value;
    setCheckOutDate(newCheckOutDate);
  };

  //  for blocking manual date entry 
  const blockManualDateEntry = (e) => {
    e.preventDefault();
  };

  //  step names
  const stepNames = ["Choose Dates", "Enter Details", "Confirm Reservation"];

  // go to the next step when Continue is clicked
  const handleContinue = () => {
    if (totalPrice > 0 && !sameDayError && !errorMessage) {
      setCurrentStep(currentStep + 1); // move to next step
    }
  };

  //   back to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Move to previous 
    }
  };

  const handleSubmit = () => {
    // reset error states
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPhoneError(false);
    setTcknError(false);

    let valid = true;

    // check fields are empty or not
    if (firstName.trim() === "" || !/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(firstName)) {
      setFirstNameError(true);
      valid = false;
    }
    if (lastName.trim() === "" || !/^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(lastName)) {
      setLastNameError(true);
      valid = false;
    }

    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      valid = false;
    }
    if (phone.trim() === "" || !/^[1-9][0-9]{9}$/.test(phone)) {
      // Ensure 10 digits, no start 0
      setPhoneError(true);
      valid = false;
    }
    if (tckn.trim() === "" || !/^\d{11}$/.test(tckn)) {
      // Ensure 11 digits
      setTcknError(true);
      valid = false;
    }

    if (!valid) {
      return; // Don't continue if any required field is empty or invalid
    }

    // go to the next step
    setCurrentStep(3);
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
        
      {/* step1 choose dates */}
      {currentStep === 1 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-2 font-semibold">Check-in Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded-lg mb-4"
            value={checkInDate}
            min={getCurrentDate()} // Ensure the user cannot select past dates and block it
            onChange={handleCheckInChange}
            onKeyDown={blockManualDateEntry} // Block manual input
          />

          <label className="block mb-2 font-semibold">Check-out Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded-lg mb-4"
            value={checkOutDate}
            min={checkInDate || getCurrentDate()} // ensure the checkout date is not before check in date
            onChange={handleCheckOutChange}
            onKeyDown={blockManualDateEntry} // block manual input
          />

          {/* Error message for same-day check-in and check-out */}
          {sameDayError && (
            <p className="text-red-500 text-sm">{sameDayError}</p>
          )}

          {/* Error message for more than 30 days reservation */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <p className="text-lg font-semibold">
            Total Price: {totalPrice === 0 ? "-" : `$${totalPrice}`}
          </p>

          <button
            className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto"
            disabled={totalPrice === 0 || sameDayError || errorMessage} // Disable button if there are errors
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      )}
      {currentStep === 2 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Details</h2>

          {/* for name */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">First Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameError && (
              <p className="text-red-500 text-sm mt-1">
                First name must contain only letters
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Last Name:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameError && (
              <p className="text-red-500 text-sm mt-1">
                Last name must contain only letters
              </p>
            )}
          </div>

          {/* for mail */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Email:</label>
            <input
              type="email"
              className="w-full border p-2 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">
                Email must be valid (must contain '@' and '.com')
              </p>
            )}
          </div>

          {/* for number */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Phone Number:</label>
            <input
              type="tel"
              className="w-full border p-2 rounded-lg"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">
                Phone number must be 10 digits, without a leading 0
              </p>
            )}
          </div>

          {/* for tckn */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold">TCKN:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Enter your TCKN"
              value={tckn}
              onChange={(e) => setTckn(e.target.value)}
            />
            {tcknError && (
              <p className="text-red-500 text-sm mt-1">
                TCKN must be 11 digits
              </p>
            )}
          </div>

          <button
            className="bg-green-500 text-white py-2 px-6 rounded-lg mt-4 w-full sm:w-auto"
            onClick={handleSubmit} // Submit the form
          >
            Continue
          </button>

          {/* button to go  back */}
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
          <h2 className="text-2xl font-bold mb-4">Confirm Reservation</h2>

          <p className="text-lg mb-2">
            <strong>Name:</strong> {firstName} {lastName}
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-lg mb-2">
            <strong>Phone Number:</strong> {phone}
          </p>
          <p className="text-lg mb-2">
            <strong>TCKN:</strong> {tckn}
          </p>

          <p className="text-lg mb-2">
            <strong>Bungalow Type:</strong>{" "}
            {bungalowId.replace("-", " ").toUpperCase()}
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
            className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-4"
            onClick={() => setShowPopup(true)}
          >
            Confirm Reservation
          </button>

          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-4 ml-4"
            onClick={handleBack} // Go back to the previous step
          >
            Back
          </button>
        </div>
      )}
      {/* pop up  */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Reservation Confirmed</h2>
            <p className="mb-2">Your reservation has been successfully submitted.</p>
            <p className="mb-4">We will contact you soon for payment.</p>
            <button 
              className="bg-blue-500 text-white py-2 px-6 rounded-lg"
              onClick={handleConfirmClick} //  click to ok and go home page
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
