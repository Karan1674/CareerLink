import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx"
import { Button } from "@/components/ui/button.jsx"
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {

            const res = await axios.get(`${USER_API_END_POINT}/logoutUser`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/")
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    return (
        <div className="bg-white p-4  w-full">
            <div className="container mx-auto flex items-center justify-between w-full">
                <div>
                    <Link to="/">
                        <h1 className="text-3xl font-bold text-black tracking-wide">
                            Career<span className="text-[#f83002]">Link</span>
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center gap-10">
                    <ul className="flex items-center gap-5 text-black font-medium">

                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <Link to="/admin/companies" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Companies</Link>
                                    <Link to="/admin/jobs" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Jobs</Link>
                                    {/* <Link to="/browser" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Browser</Link> */}

                                </>
                            ) :
                                (
                                    <>
                                        <Link to="/" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Home</Link>
                                        <Link to="/jobs" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Jobs</Link>
                                        <Link to="/browser" className="hover:text-[#f83002] transition duration-300 cursor-pointer">Browser</Link>

                                    </>
                                )
                        }

                    </ul>

                    {!user ?
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="outline" className="px-4 py-2 text-sm font-medium">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="px-4 py-2 text-sm font-medium bg-[#f83002] text-white hover:bg-[#e72b00] transition duration-300">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                        :
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-12 h-12 border-2 border-gray-300">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt="profilePhoto"
                                    />
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-80 bg-white shadow-lg rounded-lg p-4 space-y-3">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-14 h-14  border-2 border-gray-300">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="profilePhoto"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{user?.fullname}</h4>
                                        <p className="text-sm text-gray-500">Good To See You Again...</p>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2 px-3">

                                    {user && user.role === "student" && (
                                        <Link to="/profile">
                                            <div className="flex items-center w-fit gap-2 cursor-pointer">
                                                <User2 className=" text-gray-600" />
                                                <Button variant="link" className="text-gray-700 hover:no-underline">
                                                    View Profile
                                                </Button>
                                            </div>
                                        </Link>
                                    )

                                    }

                                    <div onClick={logoutHandler} className="flex items-center w-fit gap-2 cursor-pointer">
                                        <LogOut className=" text-gray-600" />
                                        <Button variant="link" className="text-gray-700 hover:no-underline">
                                            Logout
                                        </Button>
                                    </div>
                                </div>

                            </PopoverContent>
                        </Popover>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
