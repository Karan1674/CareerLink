import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FaUserTie, FaEnvelope, FaMapMarkerAlt, FaTasks, FaBuilding, FaRegClipboard, FaBriefcase, FaMoneyBillWave, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {

    const params = useParams();
    const jobId = params.id

    const { singleJob } = useSelector(store => store.jobs);
    const { user } = useSelector(store => store.auth);

    const isInitialApplied = singleJob?.applications?.some(application => application.applicant === user?._id ? true : false);
    const [isApplied, setIsApplied] = useState(isInitialApplied);

    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/applyApplication/${jobId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setIsApplied(true)
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobById/${jobId}`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job?.applications?.some(application => application.applicant === user?._id) || false)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJobs();
    }, [jobId, dispatch, user?._id])






    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                {/* Job Title and Badges */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <Badge className="bg-blue-100 text-blue-800 font-medium p-2 px-3 rounded-md hover:text-white">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className="bg-green-100 text-green-800 font-medium p-2 px-3 rounded-md hover:text-white">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 font-medium p-2 px-3 rounded-md hover:text-white">
                                {singleJob?.salary}
                            </Badge>
                        </div>
                    </div>
                    <Button
                        className={`px-6 py-2 text-sm font-semibold ${isApplied
                            ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                            : 'bg-[#f83002] text-white hover:bg-[#e72b00] transition duration-300'
                            }`}
                        disabled={isApplied}
                        onClick={isApplied ? null : applyJobHandler}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>


                <div className="bg-gray-50 p-8 rounded-lg ">
                    <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-red-500 pb-3 mb-6">
                        Job Description
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between text-gray-700">

                        <div className="flex items-start  gap-4">
                            <span className="bg-blue-100 text-blue-600 p-3 rounded-full">
                                <FaUserTie className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Role:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.title}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-green-100 text-green-600 p-3 rounded-full">
                                <FaMapMarkerAlt className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Location:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 col-span-2">
                            <span className="bg-yellow-100 text-yellow-600 p-3 rounded-full">
                                <FaRegClipboard className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Description:</h3>
                                <p className="text-sm text-gray-600 text-justify">
                                    {singleJob?.discription}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-purple-100 text-purple-600 p-3 rounded-full">
                                <FaBriefcase className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Experience:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.experience}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-red-100 text-red-600 p-3 rounded-full">
                                <FaMoneyBillWave className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Salary:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.salary}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-teal-100 text-teal-600 p-3 rounded-full">
                                <FaUsers className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Total Applicants:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.applications?.length}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-gray-100 text-gray-600 p-3 rounded-full">
                                <FaCalendarAlt className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Posted Date:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.createdAt?.split('T')[0]}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                                <FaBuilding className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Company Name:</h3>
                                <p className="text-sm text-gray-600">{singleJob?.company?.companyName || "N/A"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                                <FaEnvelope className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg">Company Email:</h3>
                                {singleJob?.company?.email ? (
                                    <p className="text-sm text-gray-600">
                                        {singleJob.company.email}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-600">No email provided for this company.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-4 col-span-2">
                            <span className="bg-orange-100 text-orange-600 p-3 rounded-full">
                                <FaTasks className="text-lg" />
                            </span>
                            <div>
                                <h3 className="font-medium text-lg mb-2">Requirements:</h3>
                                {singleJob?.requirements?.length > 0 ? (
                                    <ul >
                                        {singleJob.requirements.map((req, index) => (
                                            <li
                                                key={index}
                                                className="flex flex-row items-start gap-2"
                                            >
                                                <span className="text-orange-500 font-bold">{index + 1}.</span>
                                                <span className="text-gray-700 text-sm">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-600">No specific requirements listed.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobDescription;
