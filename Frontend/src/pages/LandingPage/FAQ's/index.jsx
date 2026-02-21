import React, { useState, useRef } from "react";

const ques = [
  {
    head: "How is my privacy protected on GrowthNexus?",
    title:
      "Your privacy is our priority. We use industry-standard encryption for all data. Alumni can choose to stay anonymous when posting referrals, and student data is never shared with third parties without explicit consent for a specific application.",
  },
  {
    head: "Who can post technical blueprints?",
    title:
      "Technical blueprints are exclusive to verified Alumni and Seniors. This ensures that every roadmap or interview guide on the platform comes from someone who has successfully cleared the path they are describing.",
  },
  {
    head: "How do referrals work on the platform?",
    title:
      "Alumni post 'Inside Track' vacancies. Students can request a referral directly through the post. The Alumnus then reviews the student's profile and, if satisfied, pushes the referral through their company's internal portal.",
  },
  {
    head: "Is there a fee to join GrowthNexus?",
    title:
      "No. GrowthNexus is built on a 'Pay It Forward' philosophy. The platform is free for students to learn and for Alumni to give back. Our goal is community acceleration, not subscription revenue.",
  },
  {
    head: "How can I become a verified Mentor?",
    title:
      "Once you graduate and secure a professional role, you can upgrade your account to 'Alumni' status. After a quick verification of your professional credentials, you'll gain the ability to post referrals and blueprints.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleIndex = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="container mx-auto max-w-5xl py-12 flex flex-col items-center my-10">
      <header className="text-center mb-12">
        <h2 className="font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <p className="text-md md:text-xl text-slate-500 mt-3 font-medium">
          Everything you need to know about GrowthNexus
        </p>
      </header>

      <div className="w-full mt-4 space-y-2">
        {ques.map((item, i) => (
          <div
            key={i}
            className="border-b border-slate-200 py-5 cursor-pointer group"
            onClick={() => toggleIndex(i)}
          >
            <div className="flex justify-between items-center gap-4">
              <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                openIndex === i ? "text-blue-600" : "text-slate-800 group-hover:text-blue-500"
              }`}>
                {item.head}
              </h3>

              <span className={`text-2xl font-light transition-transform duration-300 ${
                openIndex === i ? "rotate-45 text-blue-600" : "text-slate-400"
              }`}>
                {openIndex === i ? "+" : "+"} 
                {/* Note: I used a '+' for both but rotate it 45 deg to make an 'x' when open */}
              </span>
            </div>

            {/* Animated section */}
            <div
              ref={(el) => (contentRefs.current[i] = el)}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight:
                  openIndex === i
                    ? contentRefs.current[i]?.scrollHeight + "px"
                    : "0px",
                opacity: openIndex === i ? 1 : 0,
              }}
            >
              <div className="pr-10">
                <p className="text-slate-500 mt-4 text-base md:text-lg leading-relaxed font-medium">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;