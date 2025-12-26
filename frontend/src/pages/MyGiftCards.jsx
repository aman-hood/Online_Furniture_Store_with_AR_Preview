import { useEffect, useState } from "react";

const MyGiftCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/giftcards/my", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setCards);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 pt-30">
      <h1 className="text-3xl font-medium mb-6">My Gift Cards</h1>

      {cards.length === 0 && (
        <p className="text-gray-600">No gift cards yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card._id}
            className="bg-white rounded-2xl p-6 shadow"
          >
            <p className="text-xs text-gray-500 mb-1">Gift Card Code</p>
            <p className="font-mono text-lg mb-3">{card.code}</p>

            <div className="flex justify-between text-sm">
              <span>Balance</span>
              <span>₹{card.balance}</span>
            </div>

            <div className="flex justify-between text-sm mt-1">
              <span>Status</span>
              <span>
                {card.isUsed ? "Used" : "Active"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyGiftCards;
