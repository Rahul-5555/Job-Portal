import { setSingleJob } from '@/redux/jobSlice'; // Import the correct action
import { COMPANY_API_ENDPOINT } from '@/utils/Constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.company)); // Use setSingleJob here
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany(); // Calling the function
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
