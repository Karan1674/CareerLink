import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {

    const { allAdminJobs, searchJob } = useSelector(store => store.jobs);
    const [filterJob, setFilterJob] = useState(allAdminJobs);

    const navigate = useNavigate()


    useEffect(() => {
        const filter = allAdminJobs?.length > 0 && allAdminJobs.filter((job) => {
            if (!searchJob) {
                return true;
            };
            return job?.company?.companyName?.toLowerCase()?.includes(searchJob?.toLowerCase()) || job?.title?.toLowerCase()?.includes(searchJob?.toLowerCase())
        });
        setFilterJob(filter)

    }, [allAdminJobs, searchJob])


    return (
        <div className="p-8 bg-white rounded-lg  border mb-5">
            <Table>
                <TableCaption className="text-gray-500 text-sm m-10">
                    A list of your posted Job
                </TableCaption>
                <TableHeader>
                    <TableRow >
                        {/* <TableHead className="text-center text-gray-700">Company Logo</TableHead> */}
                        <TableHead className=" text-gray-700">Company Name</TableHead>
                        <TableHead className=" text-gray-700">Job Role</TableHead>
                        <TableHead className=" text-gray-700">Date</TableHead>
                        <TableHead className="text-end text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJob?.length <= 0
                            ?
                            <></>
                            :
                            <>
                                {
                                  filterJob &&  filterJob?.map((job, index) => {
                                        return (

                                            <TableRow className="hover:bg-gray-100" key={index}>
                                                <TableCell className=" text-gray-600  ">
                                                 {job?.company?.companyName}
                                                </TableCell>
                                                <TableCell className=" text-gray-600">
                                                    {job?.title}
                                                </TableCell>
                                                <TableCell className=" text-gray-600">
                                                    {job?.createdAt?.split('T')[0]}
                                                </TableCell>
                                                <TableCell className="text-end">
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-gray-700 transition" />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <div onClick={() => navigate(`/admin/jobs/update/${job._id}`)} className="flex items-center gap-5 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                                                <Edit2 className="w-4 text-gray-700" />
                                                                <span className="text-gray-700">Edit</span>
                                                            </div>
                                                            <div onClick={() => navigate(`/admin/jobs/applicants/${job._id}`)} className="flex items-center gap-5 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                                                <Eye className="w-4 text-gray-700" />
                                                                <span className="text-gray-700">Applicants</span>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>

                                        )
                                    })
                                }

                            </>
                    }
                </TableBody>
            </Table>
        </div>

    )
}

export default AdminJobsTable