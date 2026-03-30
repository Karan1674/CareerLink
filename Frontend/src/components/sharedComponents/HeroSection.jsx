import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/Hooks/useGetAllJobs";

const HeroSection = () => {

    const [query, setQuery] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const searchHandler = () => {
        if (query.trim() === '') {
            return
        }

        dispatch(setSearchQuery(query));
        navigate('/browser')

    }

    return (
        <div className="bg-gray-100 text-gray-800 py-20 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-lg font-semibold uppercase tracking-wide text-[#f83002]">
                    No. 1 Job Hunt Website
                </h2>
                <h1 className="text-4xl md:text-6xl font-bold mt-4  leading-tight">
                    Search, Apply & <br />
                    <span className="text-[#f83002] ">Get Your Dream Job</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                    Explore thousands of job opportunities with just a few clicks.
                </p>
                {/* <div className="mt-8">
                    <button className="bg-[#f83002] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#d22d01] transition duration-300">
                        Get Started
                    </button>
                </div> */}
                <div className="flex w-[50%] shadow-lg border  border-gray-200 rounded-sm items-center  mx-auto mt-8">

                    <input
                        type="text"
                        placeholder="Search jobs, roles, or companies..."
                        onChange={(e) => setQuery(e.target.value)}

                        className="outline-none border-none rounded-sm w-full text-gray-700  py-2 px-2  tracking-wide"
                    />
                    <Button onClick={searchHandler} className=" bg-[#f83002] rounded-sm hover:bg-[#d22d01] text-white px-6 py-3 transition duration-300" >
                        <Search className=" h-5 w-5" />
                        <span>Search</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
