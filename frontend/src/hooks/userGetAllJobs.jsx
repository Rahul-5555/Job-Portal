import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/Constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const userGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllJobs(); // calling the function
  }, [searchedQuery, dispatch])
}

export default userGetAllJobs