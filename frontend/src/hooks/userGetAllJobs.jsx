import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/Constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const userGetAllJobs = () => {
  const fetchAllJobs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User is not logged in');
      return;
    }

    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.error('Error fetching jobs:', error.response?.data?.message || error.message);
    }
  };
}

export default userGetAllJobs