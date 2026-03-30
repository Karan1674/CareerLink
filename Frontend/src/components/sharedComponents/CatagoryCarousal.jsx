import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/Hooks/useGetAllJobs';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UX/UI Designer",
  "DevOps Engineer",
  "Mobile Developer",
  "AI/ML Engineer",
  "Game Developer",
  "Cloud Engineer",
  "Cybersecurity Specialist",
  "Database Administrator"
];

const CatagoryCarousal = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const searchHandler =(query)=>{
      if(query.trim()===''){
          return
      }

      dispatch(setSearchQuery(query));
      navigate('/browser')

  }

  return (
    <div className="my-12 ">
      <h2 className="text-center text-gray-800 text-2xl font-bold mb-10">
        Explore Categories
      </h2>
      <Carousel className="w-full max-w-5xl mx-auto px-4">
        <CarouselPrevious className=" p-2 shadow-md ">
          &#8249; 
        </CarouselPrevious>
        <CarouselNext className="  p-2 shadow-md">
          &#8250; 
        </CarouselNext>
        <CarouselContent className=" flex gap-5">
          {categories.map((category, index) => (
            <CarouselItem key={index} >
              <Button onClick={()=>searchHandler(category)} variant="outline" className="py-2 px-4 border-gray-300 text-gray-700 hover:border-gray-500 rounded-md shadow-sm transition-all duration-300">
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CatagoryCarousal;
