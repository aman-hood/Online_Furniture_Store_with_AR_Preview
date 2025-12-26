import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { getReviews, addReview } from "../services/reviewService";
import { useNavigate } from "react-router-dom";

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const load = async () => {
    const r = await getReviews(productId);
    setReviews(r);
  };

  useEffect(() => {
    load();
  }, [productId]);

  const submit = async () => {
    if (!comment.trim()) {
      alert("Please write a comment");
      return;
    }

    try {
      setLoading(true);

      await addReview({
        productId,
        rating,
        comment,
      });

      // reset
      setComment("");
      setRating(5);

      await load();
    } catch (err) {
      const status = err?.response?.status;

      if (status === 401) {
        alert("Please login to submit a review");
        navigate("/login");
      } else {
        alert("Failed to submit review");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ADD REVIEW */}
      <div className="border p-5 rounded-xl bg-white">
        <h3 className="font-semibold mb-3">Write a Review</h3>

        {/* ⭐ Adjustable Rating */}
        <StarRating rating={rating} setRating={setRating} editable />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border mt-3 p-2 rounded"
          placeholder="Share your experience"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-3 bg-black text-white px-6 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* REVIEWS LIST */}
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
