export default function Help() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-[#1a1816]">
      <h1 className="text-3xl font-semibold mb-10">Buying Help</h1>

      {/* Choose */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-3">How to Choose</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Consider room size, usage, material preference, and comfort needs
          while selecting furniture. Our product details are designed to guide
          you at every step.
        </p>
      </section>

      {/* Delivery */}
      <section className="mb-12">
        <h2 className="text-xl font-medium mb-3">Delivery Process</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          Orders are carefully packed and delivered through trusted logistics
          partners. Estimated delivery timelines are shown during checkout.
        </p>
      </section>

      {/* Returns */}
      <section>
        <h2 className="text-xl font-medium mb-3">Returns & Support</h2>
        <p className="text-sm leading-relaxed text-[#6b6258]">
          If you face any issues, our support team is here to help. Return and
          support policies are designed to keep the experience smooth and fair.
        </p>
      </section>
    </div>
  );
}
