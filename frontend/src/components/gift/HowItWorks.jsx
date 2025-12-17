import React from "react";

const steps = [
  {
    step: "01",
    title: "Choose an Amount",
    desc: "Select a gift card value that suits the moment.",
  },
  {
    step: "02",
    title: "Add a Personal Touch",
    desc: "Include a message and send it digitally.",
  },
  {
    step: "03",
    title: "Redeem with Ease",
    desc: "Redeem online and enjoy timeless furniture.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#fbf9f6] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="uppercase text-[12px] tracking-[0.35em] text-[#7a7166] mb-2">
            Simple & Thoughtful
          </p>
          <h2 className="text-[26px] font-medium text-[#3f3a33]">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-3xl p-8 text-center shadow-md"
            >
              <p className="text-[11px] tracking-widest text-[#7a7166] mb-4">
                STEP {s.step}
              </p>
              <h3 className="text-[17px] font-medium text-[#3f3a33] mb-3">
                {s.title}
              </h3>
              <p className="text-[#5f564c] text-[15px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
