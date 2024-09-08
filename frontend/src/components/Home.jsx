import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCrousel from './CategoryCrousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import userGetAllJobs from '@/hooks/userGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  userGetAllJobs(); // calling the function
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=> {
    if(user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  },[]);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCrousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home