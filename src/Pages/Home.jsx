import React from 'react';
import { TiArrowRightOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/Button';
import Video from '../assets/images/homeVideo.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import FooterHome from '../components/core/HomePage/FooterHome';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/core/HomePage/ReviewSlider';

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-white w-full px-4 sm:px-6 md:px-12 lg:px-24">
        <Link to="/signup" className="mt-16 group w-fit rounded-full bg-richblack-300 text-richblack-100 font-bold p-1 transition-transform hover:scale-95">
          <div className="flex gap-2 items-center rounded-full px-4 py-1 group-hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <TiArrowRightOutline />
          </div>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-semibold text-center mt-6">
          Empower Your Future With <HighlightText text={"Coding Skills"} />
        </h1>

        <p className="text-center text-richblack-200 text-sm sm:text-lg mt-4 max-w-2xl">
          Our course teaches essential coding skills, helping you build real-world applications and solve complex problems, preparing you for success in the fast-paced tech industry.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <CTAButton active linkto="/signup">Learn More</CTAButton>
          <CTAButton active={false} linkto="/login">Book a Demo</CTAButton>
        </div>

        {/* Hero Video */}
        <div className="mt-10 shadow-xl max-w-xl w-full">
          <video className="w-full rounded-md" muted loop autoPlay>
            <source src={Video} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div className="w-full mt-10">
          <CodeBlocks
            position="lg:flex-row"
            heading={
              <h2 className="text-2xl sm:text-3xl font-bold">
                Unlock your <HighlightText text={"coding potential"} /> with our online courses
              </h2>
            }
            subheading="Our courses are designed by industry experts, providing practical knowledge and skills to help you succeed in the tech world."
            ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
            codeblock={`<<!DOCTYPE html> \n<html>\n<meta charset="UTF-8">\n<meta name="viewport">\n<title>Sample Page</title>\n</head>\n<body>\n<header>`}
            codeColour="text-yellow-500"
          />
        </div>

        {/* Code Section 2 */}
        <div className="w-full mt-10">
          <CodeBlocks
            position="lg:flex-row-reverse"
            heading={
              <h2 className="text-2xl sm:text-3xl font-bold">
                Start Coding <HighlightText text={"in seconds"} />
              </h2>
            }
            subheading="Our courses are best-selling worldwide. Hurry up and grab the best opportunity!"
            ctabtn1={{ btnText: "Let's learn", linkto: "/signup", active: true }}
            ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
            codeblock={`<<!DOCTYPE html> \n<html>\n<meta charset="UTF-8">\n<meta name="viewport">\n<title>Sample Page</title>\n</head>\n<body>\n<header>`}
            codeColour="text-yellow-500"
          />
        </div>

        <ExploreMore />
      </section>

      {/* Timeline Section */}
      <section className="bg-gray-50 text-richblack-900 mt-16">
        <div className="homepage_bg h-[280px] w-full flex justify-center items-center">
          <div className="w-11/12 max-w-6xl text-white flex flex-col items-center gap-6">
            <div className="flex flex-wrap gap-4">
              <CTAButton active linkto="/signup">
                <div className="flex items-center gap-2">Explore Full Catalog <TiArrowRightOutline /></div>
              </CTAButton>
              <CTAButton active={false} linkto="/login">
                <div className="flex items-center gap-2">Learn More <TiArrowRightOutline /></div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="text-3xl lg:text-4xl font-semibold text-center lg:text-left lg:w-1/2">
              Get the skills you need for a <HighlightText text="Job that is in demand" />
            </div>
            <div className="lg:w-1/2 text-blue-900 text-sm sm:text-base">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum saepe omnis repellat officia corporis sit mollitia quam nobis neque enim?
              </p>
              <div className="mt-4">
                <CTAButton active linkto="/signup">
                  <div className="flex items-center gap-2">Learn More <TiArrowRightOutline /></div>
                </CTAButton>
              </div>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </section>

      {/* Instructor & Reviews */}
      <section className="bg-richblack-900 text-white w-full py-12 px-4 sm:px-6 lg:px-20">
        <InstructorSection />
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mt-10 mb-6">Reviews From Other Learners</h2>
        <ReviewSlider />
      </section>

      {/* Footer */}
      <footer className="bg-richblack-300 py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <FooterHome />
        </div>
      </footer>
    </div>
  );
}

export default Home; 