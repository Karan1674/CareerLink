import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import "../../App.css"
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        arrays: ["Dehli", "Pune", "Mumbai", "NCR", "Punjab", "Hyderabad", "Bangalore", "Chennai", "Kolkata"]
    },
    {
        filterType: "Industry",
        arrays: ["Technology", "Finance", "Healthcare", "Retail", "Manufacturing", "Consulting", "Education"]
    },
    {
        filterType: "Job Type",
        arrays: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"]
    },
    {
        filterType: "Salary Range",
        arrays: ["$30k-$50k", "$50k-$70k", "$70k-$100k", "$100k-$150k"]
    },
    {
        filterType: "Experience Level",
        arrays: ["Entry-Level", "Mid-Level", "Senior-Level", "Manager", "Director", "Executive"]
    },
    {
        filterType: "Skills",
        arrays: ["JavaScript", "Python", "React", "Node.js", "SQL", "AWS", "Java", "C++"]
    },
    {
        filterType: "Job Categories",
        arrays: ["Software Engineer", "Data Science", "Product Management", "Marketing", "Sales", "HR", "Design"]
    }
];

const FilterCard = () => {

    const [selectedValue, setSelectedValue] = useState("");

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const dispatch = useDispatch()

    useEffect(() => {

        if (selectedValue === "Alljobs" || selectedValue === "") {
            dispatch(setSearchQuery(""));
        }
        else if (selectedValue) {
            dispatch(setSearchQuery(selectedValue));
        } else {
            dispatch(setSearchQuery(""))
        }

        return () => {
            dispatch(setSearchQuery(""));
        };
    }, [selectedValue, dispatch]);


    return (
        <div className='sidebar w-full p-5 rounded-md bg-white overflow-y-auto h-[88vh]'>
            <h2 className="text-2xl font-semibold text-gray-800">Filter Jobs</h2>
            <hr className='mt-3 mb-5' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                <ul className="space-y-3 mt-3">
                    <li className="flex items-center space-x-3">
                        <RadioGroupItem id="Alljobs" value="Alljobs" className="w-5 h-5 text-[#f83002] border-gray-300 rounded-full" />
                        <Label htmlFor="Alljobs" className="text-sm text-gray-700 cursor-pointer hover:text-gray-500">All jobs</Label>
                    </li>
                    <li className="flex items-center space-x-3">
                        <RadioGroupItem id="savedJobs" value="savedJobs" className="w-5 h-5 text-[#f83002] border-gray-300 rounded-full" />
                        <Label htmlFor="savedJobs" className="text-sm text-gray-700 cursor-pointer hover:text-gray-500">Saved Jobs</Label>
                    </li>
                </ul>
            </RadioGroup>



            <RadioGroup value={selectedValue} onValueChange={changeHandler}>

                {filterData.map((filter, index) => (
                    <div key={index} className="my-5">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">{filter.filterType}</h3>
                        </div>
                        <ul className="space-y-3 mt-3">
                            {filter.arrays.map((item, idx) => {
                                const itemid = `id${index}-${idx} `
                                return (
                                    <li key={idx} className="flex items-center space-x-3">
                                        <RadioGroupItem id={itemid} value={item} className="w-5 h-5 text-[#f83002] border-gray-300 rounded-full" />
                                        <Label htmlFor={itemid} className="text-sm text-gray-700 cursor-pointer hover:text-gray-500">{item}</Label>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
