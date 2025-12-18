import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms", content: "By accessing or using Homespace, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, you must discontinue use of our services immediately." },
  { id: "usage", title: "Use of Our Services", content: "Homespace services may only be used for lawful purposes. Any attempt to misuse, disrupt, or gain unauthorized access to our systems is strictly prohibited." },
  { id: "account", title: "Account Responsibility", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities carried out under your account." },
  { id: "orders", title: "Orders & Payments", content: "All orders are subject to acceptance and availability. Prices, specifications, and availability may change without prior notice." },
  { id: "returns", title: "Returns & Refunds", content: "Returns and refunds are governed by our Returns Policy. Homespace reserves the right to refuse returns that do not comply with stated conditions." },
  { id: "ip", title: "Intellectual Property", content: "All content on this website is the intellectual property of Homespace and may not be copied, reproduced, or redistributed without written permission." },
  { id: "liability", title: "Limitation of Liability", content: "Homespace shall not be liable for indirect, incidental, or consequential damages arising from use of our products or services." },
  { id: "changes", title: "Changes to These Terms", content: "We may update these terms periodically. Continued use of the website constitutes acceptance of the revised terms." },
  { id: "contact", title: "Contact Information", content: "For any questions regarding these Terms & Conditions, contact us at support@homespace.com." },
];

const HEADER_OFFSET = 200; // 🔑 adjust once, works everywhere

const TermsPage = () => {
  const [active, setActive] = useState("");

  /* ---------- MANUAL SCROLL ---------- */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      HEADER_OFFSET;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  /* ---------- ACTIVE SECTION ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F9F7F2] text-[#2D2926] overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#EFEBE3] rounded-full blur-[90px] opacity-70" />
        <div className="absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] bg-[#E7DFD4] rounded-full blur-[100px] opacity-40" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-40">

        {/* HEADER */}
        <header className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-[60px] md:text-[88px] font-light leading-[0.85]">
              Terms of <br />
              <span className="italic font-serif pl-16 md:pl-24">
                Service
              </span>
            </h1>
          </div>
        </header>

        {/* MOBILE JUMP */}
        <select
          onChange={(e) => scrollToSection(e.target.value)}
          className="lg:hidden mb-12 w-full bg-white rounded-xl px-4 py-3 text-sm"
        >
          <option>Jump to section</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-20">

          {/* SIDEBAR */}
          <aside className="hidden lg:block sticky top-32">
            <nav className="flex flex-col gap-5 border-l pl-6">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`text-left text-[11px] uppercase tracking-[0.25em] flex gap-3 transition
                    ${active === s.id ? "text-black" : "text-[#A19B91] hover:text-black"}`}
                >
                  <span className="italic text-[9px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="bg-white/40 rounded-[40px] p-1 divide-y">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="p-12 md:p-16"
              >
                <div className="grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-4 flex gap-4">
                    <span className="italic text-[#8a8177]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="uppercase tracking-[0.2em] text-sm font-medium">
                      {s.title}
                    </h2>
                  </div>

                  <div className="md:col-span-8">
                    <p className="text-[16px] leading-[1.8] text-[#5A544D]">
                      {s.content}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-40 flex justify-between border-t pt-12 text-xs uppercase tracking-widest">
          <span>Homespace © 2025</span>
          <Link to="/privacy">Privacy Policy</Link>
        </footer>
      </main>
    </div>
  );
};

export default TermsPage;
