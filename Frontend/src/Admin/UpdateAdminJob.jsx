import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';
import { RefreshCcw, Check, X } from 'lucide-react';
import Navbar from '@/components/sharedComponents/navbar';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const UpdateAdminJob = () => {
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [jobData, setJobData] = useState();
    const navigate = useNavigate();
    const { allCompanies } = useSelector(store => store.company)

    useEffect(() => {
        const fetchJobData = async () => {

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getJobById/${params.id}`, {
                    withCredentials: true
                });

                setJobData(res.data.job);
            } catch (error) {
                console.error('Error fetching job data:', error);
                toast.error('Failed to load job data.');
            }
        };

        fetchJobData();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies?.find((company) => company.companyName === value);
        setJobData({ ...jobData, companyId: selectedCompany._id, company: selectedCompany });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const formData = {
                title: jobData.title,
                discription: jobData.discription,
                requirements: jobData.requirements.toString(),
                salary: jobData.salary,
                location: jobData.location,
                jobType: jobData.jobType,
                position: jobData.position,
                experience: jobData.experience,
                companyId: jobData.company._id
            }


            const res = await axios.put(`${JOB_API_END_POINT}/updateJobById/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success('Job updated successfully!');
                navigate('/admin/jobs');
            } else {
                toast.error('Failed to update job.');
            }
            
        } catch (error) {
            console.error('Error updating job:', error);
            toast.error('An error occurred while updating the job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className='max-w-4xl mx-auto my-12 p-4 border rounded-md shadow-sm'>
                <h1 className='text-xl font-bold mb-6'>Edit Job</h1>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="title">Post Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={jobData?.title}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="discription">Job Description</Label>
                            <Input
                                type="text"
                                name="discription"
                                value={jobData?.discription}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2 col-span-2'>
                            <Label htmlFor="requirements">Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={jobData?.requirements}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={jobData?.salary}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={jobData?.location}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="jobType">Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={jobData?.jobType}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="position">No. Of Position</Label>
                            <Input
                                type="text"
                                name="position"
                                value={jobData?.position}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="experience">Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={jobData?.experience}
                                onChange={handleChange}
                                className="focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0 tracking-wide"
                            />
                        </div>
                        {
                            allCompanies?.length > 0 && (
                                <div className='space-y-2'>
                                    <Label htmlFor="experience">Select A company</Label>
                                    <Select value={jobData?.company?.companyName} onValueChange={selectChangeHandler} className="focus:border-2 focus:border-gray-700  focus:ring-0 ">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>

                                                {
                                                    allCompanies?.map((company, index) => {
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
                        <Button onClick={() => navigate('/admin/jobs')} className="px-6 py-3 border-gray-300">
                           <X/>
                            <span>Cancel</span>
                        </Button>
                        <Button
                            type="submit"
                            className={`bg-[#f83002] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d22d01] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <RefreshCcw className=' animate-spin' />
                            ) : (
                                <Check />
                            )}
                            <span>{loading ? 'Please wait' : 'Submit'}</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateAdminJob