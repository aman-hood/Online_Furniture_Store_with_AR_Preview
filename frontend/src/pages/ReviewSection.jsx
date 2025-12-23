import { useEffect, useState } from "react";
import StarRating from "../common/StarRating";
import { getReviews, addReview } from "../services/reviewService";

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const load = async () => {
    const r = await getReviews(productId);
    setReviews(r);
  };

  useEffect(() => {
    load();
  }, [productId]);

  const submit = async () => {
    await addReview({ productId, rating, comment });
    setComment("");
    load();
  };

  return (
    <div className="space-y-6">
      {/* ADD REVIEW */}
      <div className="border p-5 rounded-xl bg-white">
        <h3 className="font-semibold mb-3">Write a Review</h3>

        <StarRating rating={rating} setRating={setRating} editable />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border mt-3 p-2 rounded"
          placeholder="Share your experience"
        />

        <button
          onClick={submit}
          className="mt-3 bg-black text-white px-6 py-2 rounded"
        >
          Submit Review
        </button>
      </div>

      {/* LIST */}
      {reviews.map((r) => (
        <div key={r._id} className="border p-5 rounded-xl bg-white">
          <div className="flex justify-between">
            <p className="font-medium">{r.name}</p>
            <span className="text-sm text-gray-500">
              {new Date(r.createdAt).toDateString()}
            </span>
          </div>
          <StarRating rating={r.rating} />
          <p className="mt-2">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
