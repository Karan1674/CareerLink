import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJob: "",
        appliedJobs: [],
        searchQuery: "",
    },
    reducers: {
        setallJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJob: (state, action) => {
            state.searchJob = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
});

export const { setallJobs, setSingleJob, setAllAdminJobs, setSearchJob, setAllAppliedJobs, setSearchQuery } = jobSlice.actions;

export default jobSlice.reducer