import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className='bg-gradient-to-b from-[#f8f8f8] to-white py-16'>
      <div className='text-center max-w-4xl mx-auto px-5'>
        <div className='flex flex-col gap-5 my-10'>
          <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f3350a] font-medium'>No. 1 job hunt website</span>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            Search, Apply & Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Find your dream job fast! Our job portal connects you to top opportunities, making it easy to apply and track your progress. Start your career journey today!
          </p>
          <div className='flex w-full max-w-md mx-auto shadow-lg border border-gray-200 rounded-full items-center overflow-hidden'>
            <input 
              type="text"
              placeholder='Find your dream jobs'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='outline-none border-none w-full px-4 py-3 text-sm md:text-base'
            />
            <Button onClick={searchJobHandler} className="rounded-l-none bg-[#6A38C2] hover:bg-[#5630a6] transition-colors px-4 py-3">
              <Search className='h-5 w-5 text-white'/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
