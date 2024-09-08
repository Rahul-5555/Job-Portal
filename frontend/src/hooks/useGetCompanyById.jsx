import { setSingleCompany } from '@/redux/jobSlice'
import { COMPANY_API_ENDPOINT } from '@/utils/Constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleCompany(); // calling the function
  }, [companyId, dispatch])
}

export default useGetCompanyById;