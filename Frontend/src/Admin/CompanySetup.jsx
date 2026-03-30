import useGetCompanyById from '@/Hooks/useGetCompanyById';
import Navbar from '@/components/sharedComponents/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CompanySetup = () => {

    const [input, setInput] = useState({
        CompanyName: '',
        discription: '',
        website: '',
        location: '',
        file: null,
    });

    const [loading, setloading] = useState(false);
    const params = useParams();

    useGetCompanyById(params.id)

    const navigate = useNavigate();

    const { singleCompany} = useSelector(store => store.company);


    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const fileChangeHandler = (e) => {
        setInput({ ...input, file: e?.target?.files?.[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {

            setloading(true);

            const formData = new FormData();
            formData.append("companyName", input.CompanyName);
            formData.append("discription", input.discription);
            formData.append("website", input.website);
            formData.append("location", input.location);

            if (input.file) {
                formData.append("file", input.file);
            }

            const prefileId = singleCompany?.logo?.split('/').slice(-1)[0].split('.')[0] || ""
            if (prefileId) {
                formData.append("prefileId", prefileId);
            }

            const res = await axios.put(`${COMPANY_API_END_POINT}//updateCompany/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message)
              
                navigate('/admin/companies');

                setInput({
                    CompanyName: '',
                    discription: '',
                    website: '',
                    location: '',
                    file: null,
                })
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || 'Something went wrong!')
        }
        finally {
            setloading(false)
        }
    };


    useEffect(() => {

        if (singleCompany) {
            setInput({
                CompanyName: singleCompany?.companyName || "",
                discription: singleCompany?.discription || "",
                website: singleCompany?.website || "",
                location: singleCompany?.location || "",
            })
        }
    }, [singleCompany])

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl  border rounded-md  shadow-sm p-6 mx-auto my-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h1 className="text-xl font-bold">Company Setup</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className='space-y-2'>
                            <Label htmlFor="CompanyName">Company Name</Label>
                            <Input
                                type="text"
                                id="CompanyName"
                                name="CompanyName"
                                value={input.CompanyName}
                                onChange={changeEventHandler}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"

                            />
                        </div>


                        <div className='space-y-2'>
                            <Label htmlFor="discription">Discription</Label>
                            <Input
                                type="text"
                                id="discription"
                                name="discription"
                                value={input.discription}
                                onChange={changeEventHandler}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"

                            />
                        </div>


                        <div className='space-y-2'>
                            <Label htmlFor="website">Website</Label>
                            <Input
                                type="url"
                                id="website"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"

                            />
                        </div>


                        <div className='space-y-2'>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className=" focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"

                            />
                        </div>


                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="file">Company Logo</Label>
                            <Input
                                type="file"
                                id="file"
                                name="file"
                                onChange={fileChangeHandler}
                                accept="image/*"
                                className=" focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex justify-between">
                        <Button className="px-6 py-3" onClick={() => navigate('/admin/companies')}>
                            <ArrowLeft />
                            <span >Back</span>
                        </Button>


                        <Button
                            type="submit"
                            className={`bg-[#f83002] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d22d01] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading}
                        >
                            {loading ?
                                <>
                                    <RefreshCcw className=' animate-spin' />
                                    <span>Please wait</span>
                                </>
                                :
                                <>
                                    <span>Update</span>
                                    <RefreshCcw />
                                </>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
