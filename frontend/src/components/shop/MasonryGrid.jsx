import ProductCard from "../../common/ProductCard";

const MasonryGrid = ({ products }) => {
  return (
    <div className="columns-2 md:columns-4 gap-8">
      {products.map((product) => (
        <div
          key={product._id}
          className="mb-10 break-inside-avoid"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
