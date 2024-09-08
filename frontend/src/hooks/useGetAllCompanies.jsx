import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          console.error('Error: Unable to fetch admin jobs. ', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching admin jobs:', error.response?.data || error.message);
      }
    };

    fetchAllAdminJobs(); // Calling the function

    // Optional: Cleanup (cancel the request if needed)
    return () => {
      // You can add logic to cancel the request if necessary, using axios.CancelToken
    };
  }, [dispatch]); // Add dispatch to the dependency array
};

export default useGetAllAdminJobs;
