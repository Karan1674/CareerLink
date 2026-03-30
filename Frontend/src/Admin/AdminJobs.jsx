import Footer from '@/components/sharedComponents/Footer'
import Navbar from '@/components/sharedComponents/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminJobsTable from './AdminJobsTable'
import useGetAdminAllJobs from '@/Hooks/useGetAdminAllJobs'
import { setSearchJob } from '@/redux/jobSlice'

const AdminJobs = () => {


  const navigate = useNavigate();
  useGetAdminAllJobs()

  const [filterJobInput, setFilterJobInput] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJob(filterJobInput))
  }, [filterJobInput]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10 bg-gray-100 rounded-lg '>
        <div className='flex items-center justify-between gap-5  rounded-lg   text-gray-800 p-10 text-center'>
          <Input
            placeholder="Filter By Jobs Role and Company Name"
            onChange={(e) => setFilterJobInput(e.target.value)}
            value={filterJobInput}
            className="tracking-wide focus:border-2 py-4 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
          />
          <Button onClick={() => navigate('/admin/jobs/create')} className="bg-[#f83002] rounded-sm hover:bg-[#d22d01] text-white px-6 py-0 transition duration-300">Post New Job</Button>
        </div>
        <div className='py-3 px-8'>
          <AdminJobsTable />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminJobs