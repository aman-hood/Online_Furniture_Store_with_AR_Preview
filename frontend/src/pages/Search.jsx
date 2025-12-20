import React from "react";
import { useLocation, Link } from "react-router-dom";
import { products } from "../data/products";
import MasonryGrid from "../components/shop/MasonryGrid";

const Search = () => {
  const query =
    new URLSearchParams(useLocation().search).get("q")?.toLowerCase() || "";

  const filteredProducts = products.filter(
    (product) =>
      typeof product.name === "string" &&
      (
        product.name.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      )
  );

  return (
    <section className="bg-[#fbf9f6] min-h-screen pt-30 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-12 max-w-3xl">
          <p className="uppercase text-[11px] tracking-[0.3em] text-[#8a8177] mb-3">
            Search Results
          </p>

          <h1 className="text-[30px] sm:text-[34px] font-medium text-[#3f3a33]">
            Results for “{query}”
          </h1>

          <p className="text-sm text-[#6b6258] mt-3">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 && "s"} found
          </p>
        </div>

        {/* CONTEXT ROW */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#6b6258]">
              Showing {filteredProducts.length} results
            </p>

            <Link
              to="/collections"
              className="text-sm text-[#3f3a33] hover:underline"
            >
              View all collections
            </Link>
          </div>
        )}

        {/* RESULTS */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32 max-w-md mx-auto">
            <p className="text-lg text-[#3f3a33] mb-3">
              No matching products
            </p>

            <p className="text-sm text-[#8a8177] mb-8">
              Try searching for sofas, chairs, beds, or lamps.
            </p>

            <Link
              to="/collections"
              className="
                inline-flex items-center
                px-7 py-3
                rounded-full
                border border-[#d8d2c7]
                text-sm font-medium text-[#3f3a33]
                hover:bg-[#f4eee6]
                transition
              "
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <MasonryGrid products={filteredProducts} />
        )}

      </div>
    </section>
  );
};

export default Search;
