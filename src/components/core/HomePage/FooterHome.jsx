import React from 'react'
import Logo2 from "../../../assets/images/Logo2.png"
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";

function FooterHome() {
  return (
    <div className='p-14'>
        <div className='flex flex-row -mr-14 '>
             <div className='flex flex-row w-[50%] gap-10 text-white border-r-2 border-blue-300'>
                  <div className='flex flex-col gap-2 '>
                      <div className='flex flex-row gap-2 font-bold text-xl'><img src={Logo2} style={{ height: '25px', width: '25px' }}/><h1>StudyNotion</h1></div>
                      <div ><h3 className='font-bold text-[18px]'> Company</h3></div>
                       <p>About</p>
                       <p>Careers</p>
                       <p>Affiliates</p>
                       <div className='flex flex-row gap-2'>
                          <a href=' https://www.facebook.com'><FaFacebook /></a>
                          <a href='https://www.google.com'><FaGoogle /></a>
                          <a href=' https://www.twitter.com'><FaTwitterSquare /></a>
                          <a href='https://www.youtube.com'><FaYoutube /></a>
                          
                       </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                     <h3 className='font-bold text-[18px]'>Resources</h3>
                     <p>Articles</p>
                     <p>Blog</p>
                     <p>Chart Sheet</p>
                     <p>Code Challenges</p>
                     <p>Docs</p>
                     <p>Projects</p>
                     <p>Videos</p>
                     <p>Workspaces</p>
                     <br></br>
                     <br></br>
                     <h3 className='font-bold text-[18px]'>Support</h3>
                     <p>Help Center</p>

                  </div>

                  <div className='flex flex-col gap-2'>
                      <h3 className='font-bold text-[18px]'>Plans</h3>
                      <p>Paid memberships</p>
                      <p>For students</p>
                      <p>Business solutions</p>
                      <br></br>
                      <br></br>
                      <h3 className='font-bold text-[18px]'>Community</h3>
                      <p>Forums</p>
                      <p>Chapters</p>
                      <p>Events</p>
                  </div>
               </div>
                
             <div className='flex flex-row w-[50%] ml-5 gap-10  text-white'>
                  <div className=' flex flex-col gap-2' >
                        <h3 className='font-bold text-[18px]'>Subjects</h3>
                         <p>Ai</p>
                         <p>Clouding Computing</p>
                         <p>Web Development</p>
                         <p>JavaScript</p>                         
                         <p>Advanced Python</p>
                         <p>Data Structures</p>
                         <p>Machine Learning</p>
                         <p>Full Stack</p>
                         <p>Responsive Design</p>
                        
                  </div>
                  <div className='flex flex-col gap-2'>
                       <h3 className='font-bold text-[18px]'>Languages</h3>
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

                  <div className='flex flex-col gap-2'>
                       <h3 className='font-bold text-[18px]'>Career building</h3>
                       <p>Career paths</p>
                       <p>Interview prep</p>
                       <p> Full CAtelog</p>
                        <p>Beta Content</p>
                        
                  </div>

                </div>
          </div>
          <div className='flex flex-row  justify-between gap-8 text-white mt-9 border-t-2'>
                 <div className='flex flex-row items-center gap-5'>
                    <p>privacy Policy</p>
                    <p>Cookie Policy</p>
                    <p>Terms</p>
                 </div>
                 <div className='flex flex-row'>
                    <p className='flex flex-row gap-2 items-center'>Made with <span><FaHeart style={{ color: 'red' }} /></span> Sandeep  <span><FaCopyright /></span> 2025 StudyNotion</p>
                 </div>
            </div>
    </div>
  )
}

export default FooterHome
