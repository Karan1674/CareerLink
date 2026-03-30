import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';



const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.jobs);

    return (

        <div className="max-w-7xl px-8 mx-auto my-20  ">
            <h1 className="text-4xl font-bold text-gray-800  text-center">
                <span className="text-[#f83002]">Latest & Top</span> Job Openings
            </h1>

            <div className='grid grid-cols-3 gap-5 my-5 mt-16'>
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0, 6).map((job, index) =>
                        <LatestJobCards key={index} job={job} />
                    )
                }

            </div>
        </div>
    );
};

export default LatestJobs;
