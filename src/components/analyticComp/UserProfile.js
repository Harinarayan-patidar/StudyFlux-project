import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  User,
  ShieldCheck,
  CalendarDays,
  Phone,
  Quote,
  Sparkles,
  BookOpen,
  Award,
  Clock3,
  ArrowUpRight,
  Zap,
  CheckCircle2,
} from "lucide-react";

import { updateProfilePicture } from "../../services/operations/profileAPI";
import { setUserProfile } from "../../Slices/profileSlice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingTags = [
  { text: "LEARN", top: "12%", left: "7%", delay: 0 },
  { text: "CREATE", top: "22%", right: "8%", delay: 1 },
  { text: "GROW", bottom: "18%", left: "5%", delay: 2 },
  { text: "BUILD", bottom: "12%", right: "7%", delay: 0.5 },
];

function UserProfile() {
  const profile = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    try {
      setLoading(true);

      const response = await updateProfilePicture(file);

      // Keep this according to your API response structure
      dispatch(setUserProfile(response.data));

      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to update profile picture.");
    } finally {
      setLoading(false);

      // Allows selecting same file again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-red-500/20 bg-red-500/10 px-8 py-6 text-center"
        >
          <p className="text-red-300 font-medium">
            No profile data found.
          </p>
        </motion.div>
      </div>
    );
  }

  const fullName =
    `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
    "User";

  const details = [
    {
      label: "Email Address",
      value: profile.email || "Not specified",
      icon: Mail,
    },
    {
      label: "Account Role",
      value: profile.accountType || "Not specified",
      icon: ShieldCheck,
    },
    {
      label: "Gender",
      value: profile.additionalDetails?.gender || "Not specified",
      icon: User,
    },
    {
      label: "Date of Birth",
      value: profile.additionalDetails?.dateOfBirth
        ? new Date(
            profile.additionalDetails.dateOfBirth
          ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "Not specified",
      icon: CalendarDays,
    },
    {
      label: "Contact Number",
      value:
        profile.additionalDetails?.contactNumber || "Not specified",
      icon: Phone,
    },
  ];

  const completedFields = details.filter(
    (item) => item.value && item.value !== "Not specified"
  ).length;

  const completion = Math.round(
    ((completedFields + 2) / (details.length + 2)) * 100
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* ================= BACKGROUND GRID ================= */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* ================= ANIMATED BACKGROUND ORBS ================= */}
      <motion.div
        animate={{
          x: [0, 100, 20, 0],
          y: [0, 50, 120, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, -80, -20, 0],
          y: [0, 100, 30, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-32 top-[20%] h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -60, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-180px] left-[35%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[130px]"
      />

      {/* ================= FLOATING TEXT ================= */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingTags.map((tag, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -14, 0],
              rotate: [-2, 2, -2],
              opacity: [0.18, 0.4, 0.18],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: tag.delay,
              ease: "easeInOut",
            }}
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom,
            }}
            className="absolute font-black tracking-[0.4em] text-cyan-300/20"
          >
            {tag.text}
          </motion.div>
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14"
      >
        {/* ================= TOP HEADING ================= */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-3 flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </motion.div>

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                Personal Dashboard
              </span>
            </motion.div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              My{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent"
              >
                Profile
              </motion.span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Your digital command center. Identity, progress, and
              learning journey, all orbiting in one place.
            </p>
          </div>

          {/* Status Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex w-fit items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 backdrop-blur-xl"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-emerald-300/60">
                Account Status
              </p>
              <p className="text-sm font-semibold text-emerald-300">
                Active & Ready
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          {/* ================= LEFT PROFILE CARD ================= */}
          <motion.section
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl"
          >
            {/* Decorative corner glow */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative">
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, #22d3ee, transparent, #8b5cf6, transparent)",
                  }}
                />

                <div className="absolute -inset-[10px] rounded-full bg-[#070b18]" />

                <motion.img
                  whileHover={{ scale: 1.04 }}
                  src={profile.image || "/default-avatar.png"}
                  alt={fullName}
                  className="relative h-44 w-44 rounded-full border-4 border-[#0b1220] object-cover shadow-[0_0_45px_rgba(34,211,238,0.25)]"
                />

                {/* Camera Button */}
                <motion.button
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => inputRef.current?.click()}
                  disabled={loading}
                  className="absolute bottom-2 right-1 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-[0_10px_30px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-5 w-5 rounded-full border-2 border-slate-900 border-t-transparent"
                    />
                  ) : (
                    <Camera size={19} />
                  )}
                </motion.button>

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Name */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-7 text-center text-2xl font-bold tracking-tight"
              >
                {fullName}
              </motion.h2>

              <p className="mt-1 text-sm text-slate-400">
                {profile.email}
              </p>

              {/* Role */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-4 flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2"
              >
                <Zap size={13} className="text-violet-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
                  {profile.accountType || "Member"}
                </span>
              </motion.div>

              {/* Upload Button */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 15px 35px rgba(34,211,238,0.2)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => inputRef.current?.click()}
                disabled={loading}
                className="group relative mt-7 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 p-[1px] disabled:opacity-60"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-[15px] bg-[#0a1020] px-5 py-3.5 transition-colors duration-300 group-hover:bg-transparent">
                  <Camera size={17} />

                  <span className="text-sm font-semibold">
                    {loading
                      ? "Uploading image..."
                      : "Change profile photo"}
                  </span>

                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </div>
              </motion.button>

              {/* Profile Completion */}
              <div className="mt-8 w-full rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-cyan-300"
                    />
                    <span className="text-sm font-medium text-slate-300">
                      Profile Completion
                    </span>
                  </div>

                  <span className="text-sm font-bold text-cyan-300">
                    {completion}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{
                      duration: 1.4,
                      delay: 0.6,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-6">
            {/* ================= STATS ================= */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                {
                  label: "Courses",
                  value: profile.courses?.length || 0,
                  icon: BookOpen,
                  gradient: "from-cyan-400/20 to-blue-500/5",
                },
                {
                  label: "Achievements",
                  value: "12",
                  icon: Award,
                  gradient: "from-violet-400/20 to-purple-500/5",
                },
                {
                  label: "Learning Hours",
                  value: "48h",
                  icon: Clock3,
                  gradient: "from-emerald-400/20 to-cyan-500/5",
                },
              ].map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                    }}
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${stat.gradient} p-5 backdrop-blur-xl`}
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

                    <div className="flex items-center justify-between">
                      <div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-3xl font-black"
                        >
                          {stat.value}
                        </motion.p>

                        <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                          {stat.label}
                        </p>
                      </div>

                      <motion.div
                        whileHover={{ rotate: 12 }}
                        className="rounded-2xl border border-white/10 bg-white/10 p-3"
                      >
                        <Icon
                          size={20}
                          className="text-cyan-200"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ================= PERSONAL INFO ================= */}
            <motion.section
              variants={itemVariants}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-8"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-[70px]" />

              <div className="relative">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className="text-cyan-300"
                      />
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/70">
                        Identity Matrix
                      </p>
                    </div>

                    <h3 className="mt-2 text-2xl font-bold">
                      Personal Information
                    </h3>
                  </div>

                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 sm:block"
                  >
                    <User className="text-cyan-300" size={21} />
                  </motion.div>
                </div>

                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  {details.map((item) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.02,
                          x: 3,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.05]"
                      >
                        <div className="flex items-start gap-4">
                          <motion.div
                            whileHover={{
                              rotate: 8,
                              scale: 1.1,
                            }}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10"
                          >
                            <Icon
                              size={18}
                              className="text-cyan-300"
                            />
                          </motion.div>

                          <div className="min-w-0">
                            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                              {item.label}
                            </p>

                            <p className="mt-1 truncate text-sm font-semibold text-slate-200 sm:text-base">
                              {item.value}
                            </p>
                          </div>
                        </div>

                        {/* Hover shine */}
                        <div className="absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-700 group-hover:left-[130%]" />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.section>

            {/* ================= ABOUT CARD ================= */}
            <motion.section
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.04] to-cyan-500/[0.08] p-6 backdrop-blur-2xl sm:p-8"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -right-20 -top-20 h-48 w-48 rounded-[40%] border border-violet-400/10"
              />

              <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10">
                  <Quote
                    size={20}
                    className="text-violet-300"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-300/70">
                    About Me
                  </p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base"
                  >
                    {profile.additionalDetails?.about ||
                      "No bio added yet. Your story is still waiting for its first line."}
                  </motion.p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>

        {/* ================= BOTTOM MOTIVATIONAL STRIP ================= */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.005 }}
          className="relative mt-6 overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 px-6 py-5 backdrop-blur-xl"
        >
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-32 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />

          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10"
              >
                <Zap size={18} className="text-cyan-300" />
              </motion.div>

              <div>
                <p className="font-semibold text-slate-200">
                  Keep building, {profile.firstName || "Explorer"}.
                </p>

                <p className="text-xs text-slate-500">
                  Tiny commits. Ridiculous momentum.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{
                x: 5,
                scale: 1.03,
              }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 text-sm font-semibold text-cyan-300"
            >
              Explore Dashboard
              <ArrowUpRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}

export default UserProfile;