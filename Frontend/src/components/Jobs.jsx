import React, { useEffect, useState } from 'react';
import Navbar from './sharedComponents/navbar';
import Footer from './sharedComponents/Footer';
import FilterCard from './sharedComponents/FilterCard';
import SingleJob from './sharedComponents/SingleJob';
import "../App.css";
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/Hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SAVEDJOBS_API_END_POINT } from '@/utils/constant';


const Jobs = () => {

    useGetAllJobs();

    const { allJobs, searchQuery } = useSelector((store) => store.jobs);
    const [filterjobs, setFilterJobs] = useState(allJobs);
    const [allsavedJobs, setsavedJobs] = useState([])

    const findAllSavedJobs = async () => {
        try {
            const res = await axios.get(`${SAVEDJOBS_API_END_POINT}/fetchSavedJobs`, {
                withCredentials: true
            });

            if (res.data.success) {
                setsavedJobs(res.data.savedJobs.savedJobs)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        findAllSavedJobs()
    }, [])


    useEffect(() => {
        if (searchQuery) {
            if (searchQuery === "savedJobs") {
                setFilterJobs(allJobs);
            } else {
                const filteredJobs =
                    allJobs &&
                    allJobs.filter((job) =>
                        job?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                        job?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                        job?.jobType?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                        job?.position?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                        job?.salary?.toLowerCase()?.includes(searchQuery?.toLowerCase())
                    );

                setFilterJobs(filteredJobs);
            }
        } else {
            setFilterJobs(allJobs);
        }

    }, [allJobs, searchQuery]);




    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto mt-8 px-2">
                <div className="flex gap-5">
                    <div className="w-1/6">
                        <FilterCard />
                    </div>
                    {filterjobs && filterjobs.length <= 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-700">
                                Job Not Found
                            </span>
                        </div>
                    ) : (
                        <div className="sidebar flex-1 h-[88vh] overflow-y-auto p-2">
                            <div className="grid grid-cols-3 gap-3">
                                {filterjobs &&
                                    filterjobs.map((job, index) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 100, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.2 }}
                                            key={index}>
                                            <SingleJob job={job} allsavedJobs={allsavedJobs} findAllSavedJobs={findAllSavedJobs}/>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;
