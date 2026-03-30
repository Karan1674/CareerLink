import React, { useEffect, useState } from 'react';
import Navbar from '../sharedComponents/navbar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setloading } from '@/redux/authSlice';
import { RefreshCcw } from 'lucide-react';

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading ,user} = useSelector(store => store.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setloading(true))
            const res = await axios.post(`${USER_API_END_POINT}/loginUser`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            setInput({
                email: "",
                password: "",
                role: "",
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/")
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

            <div className="flex justify-center items-center mt-12">
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-xl space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Login to Your Account</h1>

                    <div className="space-y-4">
                        <div className="w-full">
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

                        <div className="w-full">
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

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Role</Label>
                            <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="student"
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
                                        id="recruiter"
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
                            {loading ?   <RefreshCcw className=' animate-spin' /> : 'Login'}
                        </Button>
                    </div>

                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-[#f83002] font-medium hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
