import React from 'react';
import Logo2 from "../../../assets/images/Logo2.png";
import { FaFacebook, FaGoogle, FaTwitterSquare, FaYoutube, FaHeart, FaCopyright } from "react-icons/fa";

function FooterHome() {
  return (
    <footer className="px-4 py-10 md:px-14 bg-richblack-300 text-white">
      {/* Top Grid */}
      <div className="flex flex-col lg:flex-row gap-10 border-b border-blue-300 pb-10">
        {/* Left Side */}
        <div className="flex flex-col md:flex-row gap-10 w-full lg:w-1/2">
          {/* Column 1 */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <div className="flex items-center gap-2 font-bold text-xl">
              <img src={Logo2} alt="logo" className="h-6 w-6" />
              <h1>StudyNotion</h1>
            </div>
            <h3 className="font-bold text-lg mt-2">Company</h3>
            <p>About</p>
            <p>Careers</p>
            <p>Affiliates</p>
            <div className="flex gap-2 mt-2">
              <a href="https://facebook.com"><FaFacebook /></a>
              <a href="https://google.com"><FaGoogle /></a>
              <a href="https://twitter.com"><FaTwitterSquare /></a>
              <a href="https://youtube.com"><FaYoutube /></a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h3 className="font-bold text-lg">Resources</h3>
            <p>Articles</p>
            <p>Blog</p>
            <p>Chart Sheet</p>
            <p>Code Challenges</p>
            <p>Docs</p>
            <p>Projects</p>
            <p>Videos</p>
            <p>Workspaces</p>
            <h3 className="font-bold text-lg mt-4">Support</h3>
            <p>Help Center</p>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h3 className="font-bold text-lg">Plans</h3>
            <p>Paid memberships</p>
            <p>For students</p>
            <p>Business solutions</p>
            <h3 className="font-bold text-lg mt-4">Community</h3>
            <p>Forums</p>
            <p>Chapters</p>
            <p>Events</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col md:flex-row gap-10 w-full lg:w-1/2">
          {/* Column 4 */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h3 className="font-bold text-lg">Subjects</h3>
            <p>AI</p>
            <p>Cloud Computing</p>
            <p>Web Development</p>
            <p>JavaScript</p>
            <p>Advanced Python</p>
            <p>Data Structures</p>
            <p>Machine Learning</p>
            <p>Full Stack</p>
            <p>Responsive Design</p>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h3 className="font-bold text-lg">Languages</h3>
            <p>Bash</p>
            <p>C</p>
            <p>C++</p>
            <p>Java</p>
            <p>Python</p>
            <p>JavaScript</p>
            <p>Ruby</p>
            <p>Go</p>
            <p>Swift</p>
            <p>Kotlin</p>
            <p>PHP</p>
            <p>R</p>
          </div>

          {/* Column 6 */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h3 className="font-bold text-lg">Career Building</h3>
            <p>Career paths</p>
            <p>Interview prep</p>
            <p>Full Catalog</p>
            <p>Beta Content</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-richblack-200">
        <div className="flex gap-4 text-sm">
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Terms</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p className="flex items-center gap-2">
            Made with <FaHeart className="text-red-500" /> by Sandeep <FaCopyright /> 2025 StudyNotion
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterHome;
