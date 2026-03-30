import { setAllCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error)
                dispatch(setAllCompanies([]))
            }
        }
        fetchAllCompany();
    }, [])
}

export default useGetAllCompanies