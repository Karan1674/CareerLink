import React, { useState } from 'react';
import Navbar from './sharedComponents/navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import Footer from './sharedComponents/Footer';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Contact, Mail, PenIcon } from 'lucide-react';
import { Label } from './ui/label';
import AppliedJobs from './sharedComponents/AppliedJobs';
import UpdateProfile from './sharedComponents/UpdateProfile';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/Hooks/useGetAppliedJobs';



const Profile = () => {

    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth)

    useGetAppliedJobs();


    return (
        <div>
            <Navbar />
            <div className="bg-gray-100  p-8">
                <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl  p-8 shadow-md">
                    {/* Profile Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-28 w-28 border-4 border-gray-300">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto}
                                    alt="profilePhoto"
                                    className="rounded-full"
                                />
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-800">{user?.fullname}</h1>
                                <p className="text-sm text-gray-600 mt-2">
                                    {user?.profile?.bio}
                                </p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} variant="outline" className="text-gray-600 hover:bg-gray-100">
                            <PenIcon className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail className="h-5 w-5" />
                                <span>
                                   {user?.email} 
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Contact className="h-5 w-5" />
                                <span>{user?.phoneNumber}</span>
                            </div>
                        </div>
                    </div>


                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {user?.profile?.skills.length !== 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm"
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-500">N/A</span>
                            )}
                        </div>
                    </div>


                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Resume</h2>
                        <div className="w-full  max-w-sm space-x-3 ">
                            <Label className="text-gray-600">Download:</Label>
                            {user?.profile?.resume ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Resume
                                </a>
                            ) : (
                                <span className="text-gray-500">N/A</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-5">Applied Jobs</h1>
                <div className="bg-white  p-5">
                    <AppliedJobs />
                </div>
            </div>

            <UpdateProfile open={open} setOpen={setOpen} />

            <Footer />
        </div>
    );
};

export default Profile;
