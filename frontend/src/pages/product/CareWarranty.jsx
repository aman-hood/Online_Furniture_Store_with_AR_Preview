export default function CareWarranty() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-[#1a1816]">
      <h1 className="text-3xl font-semibold mb-10">Quality & Care</h1>

      {/* Craftsmanship */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-3">Craftsmanship</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Our furniture is crafted by skilled professionals, combining
          traditional techniques with modern manufacturing standards to ensure
          strength, comfort, and timeless design.
        </p>
      </section>

      {/* Care */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-3">Care Instructions</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Regular dusting, gentle cleaning, and avoiding direct sunlight
          will help maintain the quality and appearance of your furniture.
        </p>
      </section>

      {/* Warranty */}
      <section>
        <h2 className="text-xl font-medium mb-3">Warranty Coverage</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Homespace products come with a limited warranty covering
          manufacturing defects. Warranty terms may vary by product category.
        </p>
      </section>
    </div>
  );
}
