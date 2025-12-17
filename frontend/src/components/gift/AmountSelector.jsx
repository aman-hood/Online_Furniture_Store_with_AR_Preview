import React from "react";
import CardItem from "./CardItem";

const giftAmounts = [1000, 2000, 5000, 10000];

const AmountSelector = ({
  selected,
  customAmount,
  setSelected,
  setCustomAmount,
}) => {
  return (
    <div>
      <h2 className="text-[17px] font-medium text-[#3f3a33] mb-8">
        Choose a Gift Card Amount
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {giftAmounts.map((amount) => (
          <CardItem
            key={amount}
            active={selected === amount && !customAmount}
            onClick={() => {
              setSelected(amount);
              setCustomAmount("");
            }}
          >
            <p className="text-[11px] uppercase tracking-widest text-[#7a7166] mb-2">
              Gift Card
            </p>
            <p className="text-xl font-medium text-[#3f3a33]">
              ₹{amount.toLocaleString()}
            </p>
          </CardItem>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="max-w-md mx-auto">
        <input
          type="number"
          min="500"
          placeholder="Or enter a custom amount (₹)"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="
            w-full rounded-xl px-5 py-3
            bg-white border border-gray-200
            focus:outline-none focus:border-gray-400
            text-sm
          "
        />
      </div>
    </div>
  );
};

export default AmountSelector;
