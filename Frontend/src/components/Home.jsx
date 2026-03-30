import React, { useEffect } from 'react';
import Navbar from './sharedComponents/navbar';
import HeroSection from './sharedComponents/HeroSection';
import CatagoryCarousal from './sharedComponents/CatagoryCarousal';
import LatestJobs from './sharedComponents/LatestJobs';
import Footer from './sharedComponents/Footer';
import useGetAllJobs from '@/Hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    
    useGetAllJobs();
    
    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate('/admin/companies');
        }
    }, [user?.role, navigate]);

    return (
        <div>
            <Navbar />
            <HeroSection />
            <CatagoryCarousal />
            <LatestJobs />
            <Footer />
        </div>
    );
};

export default Home;
