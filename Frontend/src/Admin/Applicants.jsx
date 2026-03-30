import Navbar from '@/components/sharedComponents/navbar';
import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '@/redux/applicationSlice';

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application)

    const fetchAllApplicants = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/getApplicants/${params.id}`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setApplicants(res.data.job))
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllApplicants();
    }, [])

    return (
        <div >
            <Navbar />
            <div className="max-w-6xl mx-auto bg-gray-100 my-10 rounded-lg py-8 px-4 ">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    Applicants <span className="text-gray-600">({applicants?.applications?.length})</span>
                </h1>
                <ApplicantsTable fetchAllApplicants={fetchAllApplicants} />
            </div>
        </div>
    );
};

export default Applicants;
