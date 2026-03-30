import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SAVEDJOBS_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const SingleJob = ({ job, allsavedJobs, findAllSavedJobs }) => {

  const navigate = useNavigate();



  const getPostedDate = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - createdDate;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }



  const handleSave = async (jobId) => {
    const isSaved = allsavedJobs.some((savedJob) => savedJob._id === jobId);
    try {
      const endpoint = isSaved
      ? `${SAVEDJOBS_API_END_POINT}/changeSavedJob`
      : `${SAVEDJOBS_API_END_POINT}/saveJob`;

    const res = await axios({
      method: isSaved ? "put" : "post",
      url: endpoint,
      data: { jobId },
      withCredentials: true,
    });

      if (res.data.success) {
        toast.success(res.data.message)
        findAllSavedJobs()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const isJobSaved = allsavedJobs.some((savedJob) => savedJob._id === job._id);

 

  return (
    <div className="p-5 rounded-md h-[100%] bg-white border border-gray-200 shadow-md flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{getPostedDate(job?.createdAt) === 0 ? "Today" : `${getPostedDate(job?.createdAt)} Days Ago`}</p>
        <Button onClick={() => handleSave(job._id)} variant="outline" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-6 my-2">
        <Button className="p-0" size="icon" variant="outline">
          <Avatar className="rounded-md">
            <AvatarImage
              src={job?.company?.logo}
              alt="Company Logo"
              className="w-10 h-10  "
            />
          </Avatar>
        </Button>
        <div className='space-y-1'>
          <h1 className="font-semibold text-lg">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="my-4 space-y-3 flex-grow">
        <h1 className="font-bold text-xl text-gray-800">{job?.title}</h1>
        <p className="text-sm text-justify text-gray-600">
          {job?.discription}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 ">
        <Badge className="bg-blue-100 font-medium p-2 px-3 rounded-md text-blue-800 hover:text-white">{job?.position}</Badge>
        <Badge className="bg-green-100 font-medium p-2 px-3 rounded-md text-green-800 hover:text-white">{job?.jobType}</Badge>
        <Badge className="bg-yellow-100 font-medium p-2 px-3 rounded-md text-yellow-800 hover:text-white">{job?.salary}</Badge>
      </div>

      <div className='flex items-center justify-between mt-5'>
        <Button onClick={() => navigate(`/jobs/discription/${job?._id}`)} variant="outline">
          Details
        </Button>

        <Button
          onClick={() => handleSave(job._id)}
          className={`${isJobSaved ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-[#f83002] hover:bg-[#d22d01]"
            } text-white `}
        >
          {isJobSaved ? "Unsave" : "Save For Later"}
        </Button>

      </div>
    </div>
  )
}

export default SingleJob
