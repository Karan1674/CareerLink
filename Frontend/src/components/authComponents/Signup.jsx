import React, { useEffect, useState } from 'react';
import Navbar from '../sharedComponents/navbar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setloading } from '@/redux/authSlice';
import { RefreshCcw } from 'lucide-react';

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        confirmPassword: "",
        password: "",
        role: "",
        profilePhoto: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading ,user} = useSelector(store => store.auth)

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    })


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const changeFileHandler = (e) => {
        const { files } = e.target;
        setInput({ ...input, profilePhoto: files?.[0] || null })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input.password !== input.confirmPassword) {
            toast.error("Passwords do not match!")
            return;
        }


        dispatch(setloading(true))
        const formData = new FormData();

        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.profilePhoto) {
            formData.append("file", input.profilePhoto)
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/registerUser`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });


            setInput({
                fullname: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                role: "",
                profilePhoto: ""
            });


            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || 'Something went wrong!')
        }

        finally {
            dispatch(setloading(false))
        }
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center items-center mt-6">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-2xl space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Create an Account</h1>

                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Label className="block text-sm font-medium text-gray-700">Full Name</Label>
                                <Input type="text"
                                    name="fullname"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="mt-1 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <Label className="block text-sm font-medium text-gray-700">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="mt-1 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Label className="block text-sm font-medium text-gray-700">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    className="mt-1 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <Label className="block text-sm font-medium text-gray-700">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={input.confirmPassword}
                                    onChange={changeEventHandler}
                                    className="mt-1 focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                    required
                                />
                            </div>
                        </div>


                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <Label className="block text-sm font-medium text-gray-700">Phone Number</Label>
                                <Input
                                    type="tel"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="mt-1  focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                    required
                                />

                            </div>
                            <div className="w-1/2">
                                <Label className="block text-sm font-medium text-gray-700">Profile Picture</Label>
                                <Input
                                    accept="image/*"
                                    name="profilePhoto"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="mt-1  focus:border-2 focus:border-gray-700 focus-visible:ring-offset-0 focus-visible:ring-0"
                                    required
                                />

                            </div>
                        </div>



                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Role</Label>
                            <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        onChange={changeEventHandler}
                                        checked={input.role === "student"}
                                        required
                                    />
                                    <Label htmlFor="student" className="text-gray-700">
                                        Student
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        onChange={changeEventHandler}
                                        checked={input.role === "recruiter"}
                                        required
                                    />
                                    <Label htmlFor="recruiter" className="text-gray-700">
                                        Recruiter
                                    </Label>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="mt-6 flex justify-center">
                        <Button
                            type="submit"
                            className={`w-full bg-[#f83002] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#d22d01] transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading}
                        >
                            {loading ?   <RefreshCcw className=' animate-spin' /> : 'Sign Up'}
                        </Button>
                    </div>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#f83002] font-medium hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
