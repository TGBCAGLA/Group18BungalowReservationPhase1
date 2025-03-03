import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); //  check form gönderildi mi
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        window.location.href = "/"; // homepage e gidiyor
      }, 3000); // 3 saniye sonra dönücek

      return () => clearTimeout(timer); //  home a gittiğinde timeout u temizle
    }
  }, [isSubmitted]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // form gönderildiğinde state güncelleniyor...
    setIsSubmitted(true);

    // burda form verisini göndericem apı ile backend de
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      {isSubmitted ? (
        // form gönderildikten sonraki mesaj
        <div className="bg-green-100 text-green-700 p-4 rounded-md text-center mb-8">
          <p className="text-lg font-semibold">
            Your information has been recorded, we will get back to you as soon
            as possible.
          </p>
        </div>
      ) : (
        // form
        <>
          <p className="text-lg text-gray-700 text-center mb-8">
            We'd love to hear from you! Please fill out the form below.
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your message"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactPage;
