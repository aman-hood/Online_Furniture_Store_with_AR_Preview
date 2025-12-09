import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../../common/ProductCard";

const MasonryItem = ({ product }) => {
  const cardRef = useRef(null);
  const [rowSpan, setRowSpan] = useState(1);

  useEffect(() => {
    const height = cardRef.current.clientHeight;
    const span = Math.ceil(height / 10);     // 10px = auto-row height
    setRowSpan(span);
  }, []);

  return (
    <div
      ref={cardRef}
      className="break-inside-avoid bg-white rounded-xl shadow p-4 mb-6"
      style={{ gridRowEnd: `span ${rowSpan}` }}
    >
      <ProductCard product={product} />
    </div>
  );
};

export default MasonryItem;
