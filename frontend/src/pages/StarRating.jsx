import { FaStar } from "react-icons/fa";

const getStarStyle = (rating) => {
  if (rating <= 2) return "text-amber-400/60";
  if (rating === 3) return "text-amber-400/80";
  return "text-amber-400";
};

const StarRating = ({ rating, setRating, editable = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={18}
          onClick={() => editable && setRating(star)}
          className={`
            transition-all duration-200
            ${editable ? "cursor-pointer hover:scale-110" : ""}
            ${
              star <= rating
                ? `${getStarStyle(rating)}`
                : "text-gray-300"
            }
          `}
        />
      ))}

      {editable && (
        <span className="ml-2 text-sm text-gray-500">
          {rating}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;
