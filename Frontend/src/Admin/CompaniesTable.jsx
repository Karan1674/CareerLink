import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit2, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {

    const { allCompanies, searchCompany } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(allCompanies );


    const navigate = useNavigate()


    useEffect(() => {
        const filter = allCompanies?.length > 0 && allCompanies?.filter((company) => {
            if (!searchCompany) {
                return true;
            };
            return company?.companyName?.toLowerCase()?.includes(searchCompany.toLowerCase())
        });
        setFilterCompany(filter)

    }, [allCompanies, searchCompany])

    return (

        <div className="p-8 bg-white rounded-lg  border mb-5">
            <Table>
                <TableCaption className="text-gray-500 text-sm">
                    A list of your registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className="text-center text-gray-700">Logo</TableHead>
                        <TableHead className="text-center text-gray-700">Name</TableHead>
                        <TableHead className="text-center text-gray-700">Date</TableHead>
                        <TableHead className="text-center text-gray-700">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length <= 0
                            ?
                            <></>
                            :
                            <>
                                {
                               filterCompany &&  filterCompany?.map((company, index) => {
                                        return (

                                            <TableRow className="hover:bg-gray-100" key={index}>
                                                <TableCell className="flex items-center justify-center">
                                                    <Avatar className="cursor-pointer w-10 h-10 rounded-sm border border-gray-300">
                                                        <AvatarImage
                                                            src={company?.logo}
                                                            alt="Company Logo"
                                                        />
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell className="text-center  text-gray-600">
                                                    {company?.companyName}
                                                </TableCell>
                                                <TableCell className="text-center text-gray-600">
                                                    {company?.createdAt?.split('T')[0]}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <MoreHorizontal className="cursor-pointer text-gray-500 hover:text-gray-700 transition" />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <div onClick={() => navigate(`/admin/companies/create/${company._id}`)} className="flex items-center gap-5 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded">
                                                                <Edit2 className="w-4 text-gray-700" />
                                                                <span className="text-gray-700">Edit</span>
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

    );
};

export default CompaniesTable;
