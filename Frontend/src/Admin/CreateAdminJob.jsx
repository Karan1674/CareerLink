import Navbar from '@/components/sharedComponents/navbar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Check, RefreshCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JOB_API_END_POINT } from '@/utils/constant';



const CreateAdminJob = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()


    const { allCompanies } = useSelector(store => store.company)

    const [jobData, setJobData] = useState({
        title: '',
        discription: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        position: '',
        experience: '',
        companyId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const selectChangeHandler =(value)=>{
        const selectedCompany = allCompanies?.find((company)=>company.companyName === value);
        setJobData({ ...jobData, companyId: selectedCompany._id});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}/postJob`, jobData,{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

           

            if (res.data.success) {
                toast.success('Job created successfully!');
                setJobData({
                    title: '',
                    discription: '',
                    requirements: '',
                    salary: '',
                    location: '',
                    jobType: '',
                    position: '',
                    experience: '',
                    companyId: ''
                });
                navigate('/admin/jobs');
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to create the job. Please try again.');
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className='max-w-4xl mx-auto my-8 p-6 border rounded-md shadow-sm'>
                <h1 className='text-xl font-bold mb-6'>Create Job</h1>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="title">Post Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={jobData.title}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="discription">Job Description</Label>
                            <Input
                                type="text"
                                name="discription"
                                value={jobData.discription}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2 col-span-2'>
                            <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={jobData.requirements}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={jobData.salary}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={jobData.location}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="jobType">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={jobData.jobType}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="position">No. Of Position</Label>
                            <Input
                                type="text"
                                name="position"
                                value={jobData.position}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="experience">Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={jobData.experience}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        {
                            allCompanies?.length > 0 && (
                                <div className='space-y-2'>
                                    <Label htmlFor="experience">Select A company</Label>
                                    <Select onValueChange={selectChangeHandler} className="focus:border-2 focus:border-gray-700  focus:ring-0 ">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                
                                                {
                                                    allCompanies?.map((company,index)=>{
                                                        return (
                                                            <SelectItem value={company?.companyName} key={index}>
                                                                {company?.companyName}
                                                            </SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-5">
                        <Button onClick={() => navigate("/admin/jobs")} className="px-6 py-3  border-gray-300">
                            <X />
                            <span>Cancel</span>
                        </Button>
                        <Button className={`bg-[#f83002] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d22d01] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loading}>
                            {loading ?
                                <>
                                    <RefreshCcw className=' animate-spin' />
                                    <span>Please wait</span>
                                </>
                                :
                                <>
                                    <Check />
                                    <span>Submit</span>
                                </>
                            }
                        </Button>
                    </div>

                    {allCompanies?.length === 0 && <p className='text-xs font-bold text-red-600 text-center my-3'>Please register a company first, before posting a job</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateAdminJob;
