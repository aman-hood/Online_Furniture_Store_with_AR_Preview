import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 4.5, count = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex text-yellow-500">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) return <FaStar key={i} />;
          if (i === fullStars && hasHalf) return <FaStarHalfAlt key={i} />;
          return <FaRegStar key={i} />;
        })}
      </div>
      <span className="text-gray-600">
        {rating} ({count} reviews)
      </span>
    </div>
  );
};

export default StarRating;
