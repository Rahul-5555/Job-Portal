import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { USER_API_ENDPOINT } from '@/utils/Constant';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='bg-white shadow-md'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
        {/* Logo Section */}
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Job<span className='text-[#F83002]'>Quest</span>
          </h1>
        </div>
        {/* Links Section */}
        <div className='hidden md:flex items-center gap-8'>
          <ul className='flex font-medium items-center gap-6'>
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>
        </div>
        {/* User/Authentication Section */}
        <div className='flex items-center gap-4'>
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#A050C6] hover:from-[#5b30a6] hover:to-[#8f4baf] shadow-md hover:shadow-lg transition-shadow duration-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className='flex gap-4 space-y-2'>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground '>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {user && user.role === "student" && (
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      {/* Responsive Links for Small Screens */}
      <div className='block md:hidden'>
        <ul className='flex justify-center space-x-4 p-2 bg-gray-100'>
          {user && user.role === 'recruiter' ? (
            <>
              <li><Link to="/admin/companies">Companies</Link></li>
              <li><Link to="/admin/jobs">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/browse">Browse</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
