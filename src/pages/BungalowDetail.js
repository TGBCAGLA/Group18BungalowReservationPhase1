import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';
import { useAuth } from '../contexts/AuthContext';
import './BungalowDetail.css';

const BungalowDetail = () => {
  const { bungalowId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  // Bungalow ID mapping
  const bungalowIdMap = {
    "small-family": 1,
    "big-family": 2,
    "luxury": 3
  };

  // Bungalow detayları
  const bungalowDetails = {
    "small-family": {
      name: "Family Bungalow",
      price: 120,
      rating: 4.5,
      totalReviews: 3,
      features: ["🏊 Private Pool", "🏠 Cozy Bungalow", "🛏️ 4 Beds"],
      description: () => (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Family Bungalow - Affordable and Secure Family Getaway
          </h2>
          <p className="text-lg">
            Looking for the perfect place to enjoy an unforgettable holiday with
            your family? Family Bungalow offers a comfortable and affordable
            retreat for up to four people. This bungalow is designed to provide
            both comfort and a budget-friendly experience, making it the ideal
            choice for a peaceful family getaway.
          </p>
          <h3 className="text-xl font-bold">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-2">
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
              system to ensure a peaceful and worry-free stay.
            </li>
            <li>
              <span className="font-semibold">Affordable Price:</span> A great
              vacation doesn't have to break the bank. The Family Bungalow
              offers an affordable price without compromising comfort.
            </li>
          </ul>
        </div>
      ),
      image: "/assets/small1.jpg",
      gallery: [
        "/assets/small2.jpg",
        "/assets/small3.jpg",
        "/assets/small4.jpg",
        "/assets/small5.jpg",
        "/assets/small6.png",
        "/assets/small7.png",
      ]
    },
    "big-family": {
      name: "Big Family Bungalow",
      price: 180,
      rating: 4.8,
      totalReviews: 5,
      features: ["🏊 Large Pool", "🏠 Spacious Home", "🛏️ 8 Beds"],
      description: () => (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Big Family Bungalow - Spacious, Comfortable, and Perfect for Large Groups
          </h2>
          <p className="text-lg">
            If you're looking for a spacious and luxurious stay, the Big Family
            Bungalow is the perfect choice for your family. With enough room for
            up to 8 people, this bungalow offers a comfortable, private, and
            secure environment for a memorable holiday.
          </p>
          <h3 className="text-xl font-bold">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-2">
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
              activities.
            </li>
            <li>
              <span className="font-semibold">Fully Equipped Kitchen:</span> The
              bungalow comes with a fully equipped kitchen, allowing you to
              prepare meals with ease.
            </li>
            <li>
              <span className="font-semibold">Private and Secure:</span> The
              bungalow is located in a private, secure area, ensuring that your
              family can enjoy a worry-free stay.
            </li>
          </ul>
        </div>
      ),
      image: "/assets/big_family.jpg",
      gallery: [
        "/assets/bigfamily3.jpg",
        "/assets/bigfamily2.jpg",
        "/assets/bigfamily4.jpg",
        "/assets/bigfamily5.jpg",
        "/assets/bigfamily6.jpg",
        "/assets/bigfamily7.png",
      ]
    },
    "luxury": {
      name: "Luxury Bungalow",
      price: 250,
      rating: 4.2,
      totalReviews: 4,
      features: ["🏊 Heated Pool", "🏠 Luxury Villa", "🛏️ 8 Beds"],
      description: () => (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Luxury Bungalow - Premium Experience
          </h2>
          <p className="text-lg">
            A luxurious bungalow with all the comforts you need, perfect for
            those who appreciate high-end amenities and serene surroundings.
          </p>
          <p className="text-lg">
            This bungalow is designed to offer ultimate relaxation with heated
            pools, a jacuzzi, and breathtaking views of Lake Sapanca. Whether
            you're here for a peaceful getaway or an unforgettable family
            retreat, this luxury bungalow provides the ideal escape.
          </p>
          <h3 className="text-xl font-bold">Key Features:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Heated Pool:</span> Unlike our
              regular bungalows, this bungalow comes with a private heated pool
              that allows for swimming all year round.
            </li>
            <li>
              <span className="font-semibold">Jacuzzi:</span> Enjoy ultimate
              relaxation in your own jacuzzi, ideal for unwinding after a busy
              day.
            </li>
            <li>
              <span className="font-semibold">Up to 8 Guests:</span> This
              spacious bungalow is ideal for larger families or groups,
              accommodating up to 8 people comfortably.
            </li>
            <li>
              <span className="font-semibold">Lake Sapanca View:</span> With
              stunning panoramic views of Lake Sapanca, you can relax while
              taking in the natural beauty of the area.
            </li>
          </ul>
        </div>
      ),
      image: "/assets/lux.jpg",
      gallery: [
        "/assets/lux1.png",
        "/assets/lux2.png",
        "/assets/lux3.png",
        "/assets/lux4.png",
        "/assets/lux5.png",
        "/assets/lux6.png",
      ]
    }
  };

  const details = bungalowDetails[bungalowId];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const numericBungalowId = bungalowIdMap[bungalowId];
        const response = await fetch(`${BASE_URL}/bungalows/${numericBungalowId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [bungalowId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const numericBungalowId = bungalowIdMap[bungalowId];
      const response = await fetch(`${BASE_URL}/bungalows/${numericBungalowId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          rating: userRating,
          user_id: user.id
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments(prevComments => [...prevComments, {
          ...newCommentData,
          user_name: user.name,
          rating: userRating
        }]);
        setNewComment('');
        setUserRating(0);
        
        // Update average rating
        const totalRating = [...comments, newCommentData].reduce((sum, comment) => sum + comment.rating, 0);
        setAverageRating(totalRating / (comments.length + 1));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { 
        state: { 
          fromBungalows: true, 
          bungalowId: bungalowIdMap[bungalowId],
          redirectTo: "/profile"
        } 
      });
    } else {
      const numericBungalowId = bungalowIdMap[bungalowId];
      navigate(`/reservation/${numericBungalowId}`);
    }
  };

  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  if (!details) return <div className="error">Bungalow not found</div>;

  return (
    <div className="bungalow-detail">
      <div className="main-content">
        <div className="main-image">
          <img src={details.image} alt={details.name} />
        </div>
        <div className="content">
          <h1 className="title">{details.name}</h1>
          <div className="price">${details.price}/night</div>
          
          <div className="features">
            {details.features.map((feature, index) => (
              <div key={index} className="feature">
                {feature}
              </div>
            ))}
          </div>

          <div className="description">
            {details.description()}
          </div>

          <button className="book-now" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>

      <div className="gallery">
        <h2>Photo Gallery</h2>
        <div className="gallery-grid">
          {details.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${details.name} ${index + 1}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>

      {user && (
        <div className="add-comment">
          <h3>Add a Review</h3>
          <form onSubmit={handleCommentSubmit}>
            <div className="rating-input">
              <span>Rating: </span>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < (hoverRating || userRating) ? 'filled' : 'empty'}
                  onClick={() => handleStarClick(i + 1)}
                  onMouseEnter={() => handleStarHover(i + 1)}
                  onMouseLeave={handleStarLeave}
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">
                {userRating ? `You rated this ${userRating} star${userRating > 1 ? 's' : ''}` : 'Select a rating'}
              </span>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your review..."
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}

      <div className="comments">
        <h2>Reviews</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="user-name">{comment.user_name}</span>
              <div className="comment-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < comment.rating ? 'filled' : 'empty'}>★</span>
                ))}
              </div>
            </div>
            <p className="comment-content">{comment.content}</p>
            <span className="comment-date">
              {new Date(comment.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={handleCloseImage}>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default BungalowDetail;
