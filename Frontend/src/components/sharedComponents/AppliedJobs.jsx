import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobs = () => {

    const { appliedJobs} = useSelector(store=>store.jobs)

    return (
        <div className="p-10 bg-white rounded-lg shadow-md border">
            <Table>
                <TableCaption className="text-gray-600">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Job Role</TableHead>
                        <TableHead className="text-center">Company</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobs?.length >0 && appliedJobs?.map((applied, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">{applied?.createdAt?.split('T')[0]}</TableCell>
                            <TableCell className="text-center">{applied?.job?.title}</TableCell>
                            <TableCell className="text-center">{applied?.job?.company?.companyName}</TableCell>
                            <TableCell className="text-center ">
                                <Badge
                                    className={`rounded-sm p-3 w-24  justify-center  hover:text-white ${applied.status === 'accepted'
                                            ? 'bg-green-100 text-green-800 '
                                            : applied.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800 '
                                        }`}
                                >
                                    {applied.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobs;
