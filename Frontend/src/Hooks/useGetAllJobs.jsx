import { setallJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT, SAVEDJOBS_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {

    const dispatch = useDispatch()
    const { searchQuery } = useSelector(store => store.jobs)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getAllJobs?keyword=${searchQuery}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setallJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchAllSavedJobs = async () => {
            try {
                const res = await axios.get(`${SAVEDJOBS_API_END_POINT}/fetchSavedJobs`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setallJobs(res.data.savedJobs.savedJobs))                    
                }
            } catch (error) {
                console.log(error)
            }
        }
       searchQuery === "savedJobs" ? fetchAllSavedJobs() : fetchAllJobs();
    }, [searchQuery])
}

export default useGetAllJobs