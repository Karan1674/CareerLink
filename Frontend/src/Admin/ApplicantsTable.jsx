import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const statusMethods = ["Accepted", "Rejected"]

const ApplicantsTable = ({fetchAllApplicants}) => {

    const { applicants } = useSelector(store => store.application);



    const statushandler = async (status, id) => {

        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/updateApplication/${id}`, { status }, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchAllApplicants()
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <div className="border bg-white  m-5 p-5 rounded-md ">
            <Table >
                <TableCaption className="text-gray-500 text-sm">
                    A list of users who applied for the job.
                </TableCaption>
                <TableHeader className="bg-gray-100 border-b border-gray-200">
                    <TableRow>
                        <TableHead className="p-4 text-left text-gray-700">Full Name</TableHead>
                        <TableHead className="p-4 text-left text-gray-700">Email</TableHead>
                        <TableHead className="p-4 text-left text-gray-700">Contact</TableHead>
                        <TableHead className="p-4 text-left text-gray-700">Resume</TableHead>
                        <TableHead className="p-4 text-left text-gray-700">Date</TableHead>
                        <TableHead className="p-4 text-right text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item, index) => (
                            <TableRow className="hover:bg-white" key={index} >
                                <TableCell className="p-4 text-gray-600">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="p-4 text-gray-600">{item?.applicant?.email}</TableCell>
                                <TableCell className="p-4 text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="p-4 text-blue-800 hover:underline  cursor-pointer">
                                    {
                                        item?.applicant?.profile?.resume
                                            ?
                                            <a href={item?.applicant?.profile?.resume} target='_blank'>{item?.applicant?.profile?.resumeOriginalName}</a>
                                            :
                                            <span>N/A</span>
                                    }
                                </TableCell>
                                <TableCell className="p-4 text-gray-600">{item?.applicant?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className="p-4 text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger className="text-gray-600 hover:text-gray-800 focus:outline-none">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-white border border-gray-200 shadow-md rounded-md p-2">
                                        {statusMethods?.map((status, index) => {
    const lowerStatus = status.toLowerCase();
    const isRejected = item?.status === 'rejected' && lowerStatus === 'rejected';
    const isAccepted = item?.status === 'accepted' && lowerStatus === 'accepted';

    return (
        <div
            key={index}
            onClick={() => statushandler(status, item?._id)}
            className={`py-1 px-3 rounded-md cursor-pointer ${
                isRejected
                    ? 'bg-red-600 hover:bg-red-600'
                    : isAccepted
                    ? 'bg-green-600 hover:bg-green-600'
                    : 'bg-white hover:bg-gray-100'
            }`}
        >
            <span
                className={`${
                    isRejected
                        ? 'text-white'
                        : isAccepted
                        ? 'text-white'
                        : lowerStatus === 'rejected'
                        ? 'text-red-600'
                        : lowerStatus === 'accepted'
                        ? 'text-green-600'
                        : 'text-gray-600'
                }`}
            >
                {status}
            </span>
        </div>
    );
})}

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
