import React from "react";
import { motion } from "framer-motion";
import { DotPulse } from "@uiball/loaders";

const instructors = [
  {
    name: "Ankit Sharma",
    expertise: "Full Stack Development",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Riya Verma",
    expertise: "Data Science",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rahul Singh",
    expertise: "Competitive Programming",
    img: "https://randomuser.me/api/portraits/men/83.jpg",
  },
];

export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Background Loader */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 flex items-center justify-center">
        <DotPulse size={100} speed={1.2} color="#00ffcc" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-bold text-cyan-300 drop-shadow-[0_0_30px_#00ffcc]"
        >
          About Us
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed"
        >
          Welcome to <span className="text-cyan-400 font-semibold">our EdTech platform</span>,
          envisioned by <span className="text-pink-400 font-bold">Harinarayan Patidar</span>. Our mission
          is to empower students by providing high-quality, engaging, and affordable education
          across disciplines — all in a sleek dark-themed interface.
        </motion.p>

        {/* Bhagavad Gita Shloka */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 bg-white/10 border border-cyan-500 rounded-2xl px-8 py-6 max-w-2xl text-base md:text-lg text-gray-200 italic backdrop-blur-lg shadow-[0_0_30px_#00ffff30]"
        >
          “न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।” <br />
          <span className="text-sm text-gray-400 not-italic">
            (There is nothing as purifying as knowledge – Bhagavad Gita 4.38)
          </span>
        </motion.div>

        {/* Why Choose Us Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 border border-cyan-400 rounded-3xl p-10 shadow-[0_0_40px_#00ffff50] backdrop-blur-md bg-white/5"
        >
          <h2 className="text-3xl font-semibold text-cyan-200 mb-6 drop-shadow-[0_0_10px_#00ffff]">
            Why Choose Us?
          </h2>
          <ul className="text-left space-y-3 text-lg text-gray-300 list-disc pl-6">
            <li>🚀 Dark futuristic UI with animated neon visuals</li>
            <li>📚 Easy-to-follow structured learning paths</li>
            <li> 📝easy user interface</li>
            <li>🎥 Instructors upload video courses with notes</li>
            <li>📝 Students can review & track course progress</li>
          </ul>
        </motion.div>

        {/* Instructors Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-24 w-full"
        >
          <h2 className="text-3xl font-semibold text-pink-300 mb-10 drop-shadow-[0_0_10px_#ff00ff]">
            Meet Our Instructors
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {instructors.map((instructor, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 border border-pink-400 rounded-xl p-6 backdrop-blur-md shadow-[0_0_20px_#ff00ff50]"
              >
                <img
                  src={instructor.img}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-300"
                />
                <h3 className="text-xl font-semibold text-pink-200">{instructor.name}</h3>
                <p className="text-gray-300 text-sm mt-1">{instructor.expertise}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-28"
        >
          <p className="text-md text-gray-500">
            Built with ❤️, purpose, and neon vibes by Harinarayan Patidar
          </p>
        </motion.div>
      </div>
    </div>
  );
}
