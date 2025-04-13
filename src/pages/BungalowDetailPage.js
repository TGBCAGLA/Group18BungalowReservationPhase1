import React from "react";
import { useParams, Link } from "react-router-dom";
import ModalImage from "react-modal-image";

const BungalowDetailPage = () => {
  const { bungalowId } = useParams();

  const bungalowDetails = {
    "small-family": {
      name: "Family Bungalow",
      price: 120,
      rating: 4.5,
      totalReviews: 3,
      features: ["🏊 Private Pool", "🏠 Cozy Bungalow", "🛏️ 4 Beds"],
      description: (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Family Bungalow - Affordable and Secure Family Getaway
          </h2>
          <p className="text-lg mb-4">
            Looking for the perfect place to enjoy an unforgettable holiday with
            your family? Family Bungalow offers a comfortable and affordable
            retreat for up to four people. This bungalow is designed to provide
            both comfort and a budget-friendly experience, making it the ideal
            choice for a peaceful family getaway.
          </p>
          <h3 className="text-2xl font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <span className="font-semibold">4-Person Accommodation:</span> The
              Family Bungalow is perfect for families or small groups of up to
              four people. With spacious interiors and a lovely outdoor area,
              you'll have plenty of room to relax and enjoy each other's
              company.
            </li>
            <li>
              <span className="font-semibold">Private Pool:</span> Enjoy the
              luxury of your own private pool! On warm days, take a refreshing
              swim with your loved ones, surrounded by nature. It's the perfect
              space to unwind and make memories.
            </li>
            <li>
              <span className="font-semibold">Private and Secure:</span> Rest
              easy knowing that your family is safe and sound. The bungalow is
              situated in a secure, private area, equipped with a security
              system to ensure a peaceful and worry-free stay. Whether you're
              relaxing by the pool or in the living room, you can be sure of
              your family's safety.
            </li>
            <li>
              <span className="font-semibold">Affordable Price:</span> A great
              vacation doesn't have to break the bank. The Family Bungalow
              offers an affordable price without compromising comfort. It's the
              perfect choice for families looking for a budget-friendly yet
              luxurious experience.
            </li>
          </ul>
          <p className="text-lg mb-4">
            Everything You Need for a Perfect Family Stay! Whether you're
            lounging by the pool or spending quality time together indoors, the
            Family Bungalow offers all the comfort, security, and peace of mind
            you need for a wonderful vacation. You'll enjoy the perfect blend of
            nature and privacy, all in one place.
          </p>
          <p className="text-lg mb-4">
            For a relaxing, secure, and affordable family vacation, Family
            Bungalow is the ideal choice!
          </p>
        </>
      ),
      image: "/assets/small1.jpg",
      gallery: [
        "/assets/small2.jpg",
        "/assets/small3.jpg",
        "/assets/small4.jpg",
        "/assets/small5.jpg",
        "/assets/small6.png",
        "/assets/small7.png",
      ],
      reviews: [
        {
          name: "John Doe",
          date: "2025-02-15",
          text: "We had a wonderful time! Perfect place for a family vacation.",
          rating: 4,
        },
        {
          name: "Jane Smith",
          date: "2025-02-18",
          text: "Affordable, comfortable, and safe. Highly recommend for families!",
          rating: 5,
        },
        {
          name: "Abdul Dengi",
          date: "2025-02-09",
          text: "thank you for everything",
          rating: 5,
        },
      ],
    },
    "big-family": {
      name: "Big Family Bungalow",
      price: 180,
      rating: 4.8,
      totalReviews: 5,
      features: ["🏊 Large Pool", "🏠 Spacious Home", "🛏️ 8 Beds"],
      description: (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Big Family Bungalow - Spacious, Comfortable, and Perfect for Large
            Groups
          </h2>
          <p className="text-lg mb-4">
            If you're looking for a spacious and luxurious stay, the Big Family
            Bungalow is the perfect choice for your family. With enough room for
            up to 8 people, this bungalow offers a comfortable, private, and
            secure environment for a memorable holiday.
          </p>
          <h3 className="text-2xl font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <span className="font-semibold">8-Person Accommodation:</span> The
              Big Family Bungalow is ideal for larger families or groups,
              offering comfortable living spaces for up to 8 people.
            </li>
            <li>
              <span className="font-semibold">Private Pool:</span> Cool off with
              a refreshing swim in your own private pool. Perfect for sunny
              days, the pool offers a great way to unwind and enjoy time with
              your family.
            </li>
            <li>
              <span className="font-semibold">Jacuzzi:</span> Take your
              relaxation to the next level with your private jacuzzi. The
              jacuzzi is the perfect place to relax after a busy day of
              activities, offering the ultimate comfort and luxury.
            </li>
            <li>
              <span className="font-semibold">Fully Equipped Kitchen:</span> The
              bungalow comes with a fully equipped kitchen, allowing you to
              prepare meals with ease. Whether you want to cook a family dinner
              or prepare snacks, you’ll have everything you need right at your
              fingertips.
            </li>
            <li>
              <span className="font-semibold">Private and Secure:</span> The
              bungalow is located in a private, secure area, ensuring that your
              family can enjoy a worry-free stay. Equipped with a security
              system, you'll feel at ease throughout your vacation.
            </li>
          </ul>
          <p className="text-lg mb-4">
            Whether you're relaxing by the pool, enjoying a meal together in the
            kitchen, or soaking in the jacuzzi, the Big Family Bungalow offers
            the perfect space for your family to reconnect and make lasting
            memories.
          </p>
          <p className="text-lg mb-4">
            Choose the Big Family Bungalow for a spacious, comfortable, and
            secure family getaway with all the amenities you need for a perfect
            vacation.
          </p>
        </>
      ),
      image: "/assets/big_family.jpg",
      gallery: [
        "/assets/bigfamily3.jpg",
        "/assets/bigfamily2.jpg",
        "/assets/bigfamily4.jpg",
        "/assets/bigfamily5.jpg",
        "/assets/bigfamily6.jpg",
        "/assets/bigfamily7.png",
      ],
      reviews: [
        {
          name: "Alice Johnson",
          date: "2025-02-10",
          text: "A great experience for large families! Plenty of space and a private pool.",
          rating: 5,
        },
        {
          name: "Mike Brown",
          date: "2025-02-13",
          text: "Amazing stay, would definitely recommend to any big family looking for comfort.",
          rating: 4,
        },
        {
          name: "Ahmed Tağmin",
          date: "2024-09-13",
          text: "it was too expensive also there was too much people.",
          rating: 3.8,
        },
        {
          name: "Esman Lütvi",
          date: "2024-11-19",
          text: " everything was superrrrrr",
          rating: 5,
        },
        {
          name: "Rezzak Hüseyin",
          date: "2024-12-30",
          text: "we came for noel sapanca was beatifull",
          rating: 4.8,
        },
      ],
    },
    luxury: {
      name: "Luxury Bungalow",
      price: 250,
      rating: 4.2,
      totalReviews: 4,
      features: ["🏊 Heated Pool", "🏠 Luxury Villa", "🛏️ 8 Beds"],
      description: (
        <>
          <p className="text-xl font-semibold mb-4">
            A luxurious bungalow with all the comforts you need, perfect for
            those who appreciate high-end amenities and serene surroundings.
          </p>
          <p className="text-lg mb-4">
            This bungalow is designed to offer ultimate relaxation with heated
            pools, a jacuzzi, and breathtaking views of Lake Sapanca. Whether
            you're here for a peaceful getaway or an unforgettable family
            retreat, this luxury bungalow provides the ideal escape.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <span className="font-semibold">Heated Pool:</span> Unlike our
              regular bungalows, this bungalow comes with a private heated pool
              that allows for swimming all year round.
            </li>
            <li>
              <span className="font-semibold">Jacuzzi:</span> Enjoy ultimate
              relaxation in your own jacuzzi, ideal for unwinding after a busy
              day or soaking up the tranquil surroundings.
            </li>
            <li>
              <span className="font-semibold">Up to 8 Guests:</span> This
              spacious bungalow is ideal for larger families or groups,
              accommodating up to 8 people comfortably.
            </li>
            <li>
              <span className="font-semibold">Lake Sapanca View:</span> With
              stunning panoramic views of Lake Sapanca, you can relax while
              taking in the natural beauty of the area from the comfort of your
              own bungalow.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mb-2">
            Why Choose the Luxury Bungalow?
          </h2>
          <p className="text-lg mb-4">
            - The perfect blend of comfort, luxury, and breathtaking nature.
          </p>
          <p className="text-lg mb-4">
            - A large space that accommodates families and groups, offering
            peace and privacy.
          </p>
          <p className="text-lg mb-4">
            - Ideal for those seeking a premium experience with all the
            facilities for a memorable stay.
          </p>
        </>
      ),
      image: "/assets/lux.jpg",
      gallery: [
        "/assets/lux1.png",
        "/assets/lux2.png",
        "/assets/lux3.png",
        "/assets/lux4.png",
        "/assets/lux5.png",
        "/assets/lux6.png",
      ],
      reviews: [
        {
          name: "Chris Miller",
          date: "2025-02-20",
          text: "Luxury at its best! Loved the heated pool and jacuzzi.",
          rating: 4,
        },
        {
          name: "Sophie Taylor",
          date: "2025-02-22",
          text: "Perfect retreat for a peaceful getaway with beautiful views.",
          rating: 5,
        },
        {
          name: "Tom Cruise",
          date: "2025-02-25",
          text: "Perfect location.",
          rating: 4.2,
        },
        {
          name: "Jason Poor",
          date: "2025-01-02",
          text: "Too expensive.",
          rating: 3.5,
        },
      ],
    },
  };

  const bungalow = bungalowDetails[bungalowId];

  if (!bungalow) {
    return <div>Bungalow not found!</div>;
  }
 
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <span className="text-yellow-500 inline-flex items-center text-sm sm:text-lg md:text-xl">
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(5 - fullStars - (halfStar ? 1 : 0))}
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      
      <h1 className="text-4xl font-bold text-center mb-6">{bungalow.name}</h1>

      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          
          <img
            src={bungalow.image}
            alt={bungalow.name}
            className="w-full object-cover rounded-lg"
            style={{ height: "300px", objectFit: "cover" }}
          />

       
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bungalow.gallery.map((image, index) => (
              <div key={index} className="w-full h-48">
                <ModalImage
                  small={image}
                  large={image}
                  alt={`Bungalow Gallery Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
           
            <div className="flex justify-center items-center gap-2 mb-4">
              {renderStars(bungalow.rating)}
              <span className="text-lg font-semibold">{bungalow.rating}</span>
              <span className="text-gray-600">
                ({bungalow.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
         
          <div>{bungalow.description}</div>

          
          <div className="mt-6 flex justify-between items-center">
            <span className="text-2xl font-bold">
              ${bungalow.price} / Night
            </span>
          
            <div className="flex flex-wrap gap-2 text-lg">
              {bungalow.features.map((feature, index) => (
                <span key={index} className="bg-gray-200 px-3 py-1 rounded-md">
                  {feature}
                </span>
              ))}
            </div>
            <Link to={`/reservation/${bungalowId}`}>
              <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
        <div className="space-y-6">
          {bungalow.reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="font-semibold">{review.name}</div>
                <div className="text-sm text-gray-500">{review.date}</div>
              </div>
              <div className="mt-2 text-lg">{review.text}</div>
              <div className="mt-2">{renderStars(review.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BungalowDetailPage;
