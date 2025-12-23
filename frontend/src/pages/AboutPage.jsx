import React from "react";


export default function About() {
  return (
    <>


      <div className="bg-white">

        {/* HERO SECTION */}
        <section className="px-10 py-24 text-center max-w-5xl mx-auto">
          <h1 className="text-6xl font-serif tracking-tight text-[#111]">
            Crafted for Modern Living
          </h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            FUNIO is a contemporary furniture brand focused on timeless design,
            thoughtful craftsmanship, and spaces that feel like home.
          </p>
        </section>

        {/* IMAGE + STORY SECTION */}
        <section className="grid md:grid-cols-2 gap-16 px-10 py-20 max-w-7xl mx-auto items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-4xl font-serif text-[#111] mb-6">
              Our Philosophy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At FUNIO, we believe furniture should do more than fill a space.
              It should inspire calm, comfort, and confidence in everyday life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each piece is designed with a balance of aesthetics and function,
              blending modern silhouettes with enduring materials.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="/src/assets/about/about1.jpg"
              alt="Modern interior"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="bg-[#f7f7f7] py-20">
          <div className="max-w-6xl mx-auto px-10">

            <h2 className="text-4xl font-serif text-center mb-16">
              What We Stand For
            </h2>

            <div className="grid md:grid-cols-3 gap-12 text-center">

              <div>
                <h3 className="text-xl font-medium mb-3">Minimal Design</h3>
                <p className="text-gray-600">
                  Clean lines, balanced proportions, and designs that never go out of style.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Premium Quality</h3>
                <p className="text-gray-600">
                  Carefully selected materials and precise craftsmanship in every detail.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Sustainable Thinking</h3>
                <p className="text-gray-600">
                  Designed to last longer, reducing waste and encouraging mindful living.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* AR SECTION (VERY IMPORTANT FOR YOUR PROJECT) */}
        <section className="px-10 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="/src/assets/about/about-ar.jpg"
              alt="AR Furniture Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl font-serif mb-6">
              Experience Furniture in AR
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              With our AR-powered previews, you can visualize furniture directly
              in your space before making a decision.
            </p>
            <p className="text-gray-600 leading-relaxed">
              No guesswork. No surprises. Just confidence.
            </p>
          </div>

        </section>

        {/* FINAL QUOTE */}
        <section className="text-center px-10 py-24 bg-[#111] text-white">
          <h2 className="text-4xl font-serif mb-6">
            Designed to Feel Like Home
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            FUNIO is more than furniture — it’s a way of living thoughtfully,
            beautifully, and comfortably.
          </p>
        </section>

      </div>
    </>
  );
}
