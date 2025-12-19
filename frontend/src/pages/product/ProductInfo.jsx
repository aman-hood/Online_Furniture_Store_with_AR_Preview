export default function ProductInfo() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-[#1a1816]">
      <h1 className="text-3xl font-semibold mb-10">Product Information</h1>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-3">Product Overview</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Each product at Homespace is designed with functionality, comfort,
          and aesthetics in mind. Our product pages provide clear details to
          help you make confident buying decisions.
        </p>
      </section>

      {/* Materials */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-3">Materials & Finish</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          We use carefully selected materials such as solid wood, engineered
          wood, premium fabrics, and durable finishes to ensure longevity and
          visual appeal.
        </p>
      </section>

      {/* Dimensions */}
      <section>
        <h2 className="text-xl font-medium mb-3">Dimensions Guide</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Accurate measurements are provided for every product to help you
          assess space requirements and room fit before purchasing.
        </p>
      </section>
    </div>
  );
}
