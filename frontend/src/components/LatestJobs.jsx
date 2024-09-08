import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        <span className="text-[#6A38c2]">Latest & Top </span>Job Openings
      </h1>
      {/* Job cards display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <span className="col-span-full text-center text-gray-600">No Jobs Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
