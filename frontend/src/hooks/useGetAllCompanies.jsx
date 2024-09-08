import { setCompanies } from '@/redux/companySlice'

import { COMPANY_API_ENDPOINT } from '@/utils/Constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanies(); // calling the function
  }, [])
}

export default useGetAllCompanies;