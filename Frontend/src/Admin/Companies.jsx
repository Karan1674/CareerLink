import Footer from '@/components/sharedComponents/Footer'
import Navbar from '@/components/sharedComponents/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompany } from '@/redux/companySlice'

const Companies = () => {

    const navigate = useNavigate();
    useGetAllCompanies();

    const [filterCompanyInput, setFilterCompanyInput] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompany(filterCompanyInput))
    }, [filterCompanyInput]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 bg-gray-100 rounded-lg '>
                <div className='flex items-center justify-between gap-5  rounded-lg   text-gray-800 p-10 text-center'>
                    <Input
                        placeholder="Filter By Companies"
                        onChange={(e) => setFilterCompanyInput(e.target.value)}
                        value={filterCompanyInput}
                        className="tracking-wide focus:border-2 py-4 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                    />
                    <Button onClick={() => navigate('/admin/companies/create')} className="bg-[#f83002] rounded-sm hover:bg-[#d22d01] text-white px-6 py-0 transition duration-300">New Company</Button>
                </div>
                <div className='py-3 px-8'>
                    <CompaniesTable />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Companies