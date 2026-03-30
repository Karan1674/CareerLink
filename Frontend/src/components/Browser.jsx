import React, { useEffect, useState } from 'react';
import Navbar from './sharedComponents/navbar';
import SingleJob from './sharedComponents/SingleJob';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/Hooks/useGetAllJobs';
import axios from 'axios';
import { SAVEDJOBS_API_END_POINT } from '@/utils/constant';

const Browser = () => {

    const { allJobs } = useSelector(store => store.jobs);

    useGetAllJobs();

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


    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-2xl text-gray-800 my-6'>
                    Search Results ({allJobs?.length} Jobs Found)
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allJobs?.map((job, index) => {
                            return (
                                <div key={index} >
                                    <SingleJob job={job} allsavedJobs={allsavedJobs} findAllSavedJobs={findAllSavedJobs}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

        </div>
    );
}

export default Browser;
