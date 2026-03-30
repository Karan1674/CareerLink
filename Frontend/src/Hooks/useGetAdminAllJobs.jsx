import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAdminAllJobs = () => {
 
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchAdminAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAdminJobs`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
                dispatch(setAllAdminJobs([]))
            }
        }
        fetchAdminAllJobs();
    }, [])
}

export default useGetAdminAllJobs