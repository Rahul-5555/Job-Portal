import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import userGetAllJobs from '@/hooks/userGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import Footer from './shared/Footer';

const Browse = () => {
  userGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <h1 className='text-2xl font-bold mb-8'>
          Search Results ({allJobs.length})
        </h1>
        {allJobs.length === 0 ? (
          <p className='text-gray-500'>No jobs found.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allJobs.map(job => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
     
      </div>
      <Footer/>
    </div>
    
  );
};

export default Browse;
