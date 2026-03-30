import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import React from "react";

const LatestJobCards = ({ job }) => {

  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/jobs/discription/${job._id}`)} className="bg-white shadow-md rounded-md cursor-pointer border border-gray-100 p-4 flex flex-col h-full">

      <div className="mb-2 space-y-2">
        <h1 className="text-lg font-bold text-gray-800">{job?.company?.companyName}</h1>
        <p className="text-gray-600 text-sm">{job?.location}</p>
      </div>


      <div className="mb-4 flex-grow">
        <h2 className="text-lg my-2 font-semibold text-gray-700">{job?.title}</h2>
        <p className="text-gray-500 text-sm ">
          {job?.discription}
        </p>
      </div>


      <div className="flex flex-wrap gap-5 mt-4 ">
        <Badge className="bg-blue-100 font-bold p-1 px-2 rounded-md text-blue-800 hover:text-white">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-green-100 font-bold p-1 px-2 rounded-md text-green-800 hover:text-white">
          {job?.jobType}
        </Badge>
        <Badge className="bg-yellow-100 font-bold p-1 px-2 rounded-md text-yellow-800 hover:text-white">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
