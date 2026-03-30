import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { RefreshCcw } from 'lucide-react';


const UpdateProfile = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)

    const [inputs, setInputs] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        profilePhoto: user?.profile?.profilePhoto || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        resume: user?.profile?.resume || ""
    });


    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        const { name, files } = e.target;

        setInputs(prevState => ({
            ...prevState,
            [name]: files?.[0] || null,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const preResumeId = user?.profile?.resume?.split('/').slice(-1)[0].split('.')[0];
            const preProfilePhotoId = user?.profile?.profilePhoto?.split('/').slice(-1)[0].split('.')[0];

            const formData = new FormData();
            formData.append("fullname", inputs.fullname)
            formData.append("email", inputs.email)
            formData.append("phoneNumber", inputs.phoneNumber)
            formData.append("bio", inputs.bio)
            formData.append("skills", inputs.skills)


            if (preResumeId) {
                formData.append("preResumeId", preResumeId)
            }

            if (preProfilePhotoId) {
                formData.append("preProfilePhotoId", preProfilePhotoId)
            }

            if (inputs.profilePhoto) {
                formData.append("profilePhoto", inputs.profilePhoto);
            }

            if (inputs.resume) {
                formData.append("resume", inputs.resume);
            }

            const res = await axios.put(`${USER_API_END_POINT}/updateUser`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))

            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || 'Something went wrong!')
        }

        finally {
            setOpen(false);
            setLoading(false);
        }
    };


    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="max-w-2xl bg-white p-6 rounded-md shadow-md" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800">
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-4">

                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="name" className="font-medium text-gray-700">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    value={inputs.fullname}
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="bio" className="font-medium text-gray-700">
                                    Bio
                                </Label>
                                <Input
                                    id="bio"
                                    onChange={changeEventHandler}
                                    name="bio"
                                    value={inputs.bio}
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="profilePhoto" className="font-medium text-gray-700">
                                    Profile Photo
                                </Label>
                                <Input
                                    id="profilePhoto"
                                    name="profilePhoto"
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="email" className="font-medium text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    onChange={changeEventHandler}
                                    type="email"
                                    value={inputs.email}
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="phone" className="font-medium text-gray-700">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone"
                                    name="phoneNumber"
                                    value={inputs.phoneNumber}
                                    onChange={changeEventHandler}
                                    type="tel"
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="skills" className="font-medium text-gray-700">
                                    Skills
                                </Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    onChange={changeEventHandler}
                                    value={inputs.skills}
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label htmlFor="resume" className="font-medium text-gray-700">
                                    Resume
                                </Label>
                                <Input
                                    id="resume"
                                    name="resume"
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="col-span-3 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <DialogFooter>
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className={`w-full bg-[#f83002] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d22d01] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={loading}
                                >
                                    {
                                        loading ?   <RefreshCcw className=' animate-spin' /> : " Save Changes"
                                    }
                                </Button>
                            </div>


                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfile;
