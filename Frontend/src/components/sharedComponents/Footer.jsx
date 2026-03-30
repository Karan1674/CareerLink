import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {

  const { user } = useSelector(store => store.auth);

  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-16">
      <div className="container mx-auto px-6 flex justify-between items-center">

        <div className="text-2xl font-bold ">
          Career<span className='text-[#f83002]'>Link</span>
        </div>


        <div className="flex space-x-6">

          {
            user && user.role === 'recruiter' ? (
              <>
                <Link to="/admin/companies" className="text-gray-600 hover:text-[#f83002] transition duration-300 cursor-pointer">Companies</Link>
                <Link to="/admin/jobs" className="text-gray-600 hover:text-[#f83002] transition duration-300 cursor-pointer">Jobs</Link>
                {/* <Link to="/browser" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Browser</Link> */}

              </>
            ) :
              (
                <>
                  <Link to="/" className="text-gray-600 hover:text-[#f83002] transition duration-300 cursor-pointer">Home</Link>
                  <Link to="/jobs" className="text-gray-600 hover:text-[#f83002] transition duration-300 cursor-pointer">Jobs</Link>
                  <Link to="/browser" className="text-gray-600 hover:text-[#f83002] transition duration-300 cursor-pointer">Browser</Link>

                </>
              )
          }


        </div>


        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-[#f83002]">
            <FaFacebookF className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-600 hover:text-[#f83002]">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-gray-600 hover:text-[#f83002]">
            <FaLinkedinIn className="h-5 w-5" />
          </a>
        </div>
      </div>


      <div className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} Career Link. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
