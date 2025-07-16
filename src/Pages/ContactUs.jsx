import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Integrate email API or backend call here
  };

  return (
    <div className="relative min-h-screen bg-black z-0 text-white font-sans overflow-hidden border-2 border-red-500">
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold text-cyan-300 drop-shadow-[0_0_20px_#00ffcc]"
        >
          Contact Us
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          We'd love to hear from you! Whether you're a student, instructor, or curious learner —
          reach out with questions, feedback, or just to say hi.
        </motion.p>

        {/* Gita Quote with Tilt Effect */}
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.3}
          scale={1.02}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          className="w-full mt-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="bg-white/10 border border-cyan-500 rounded-2xl px-8 py-6 text-base md:text-lg text-gray-200 italic backdrop-blur-lg shadow-[0_0_50px_#00ffff30]"
          >
            “कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।” <br />
            <span className="text-sm text-gray-400 not-italic">
              (You have the right to perform your actions, but not the outcomes – Bhagavad Gita 2.47)
            </span>
          </motion.div>
        </Tilt>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          onSubmit={handleSubmit}
          className="mt-16 w-full md:w-[90%] lg:w-[80%] bg-white/5 backdrop-blur-md border border-cyan-400 p-10 rounded-3xl shadow-[0_0_30px_#00ffff50] text-left space-y-6"
        >
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm text-cyan-300 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-transparent border border-cyan-300 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md transition-all duration-200 shadow-[0_0_20px_#00ffff]"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="mt-16 text-sm text-gray-500"
        >
          Built with love, empathy, and futuristic design — Harinarayan Patidar
        </motion.p>
      </div>
    </div>
  );
}
