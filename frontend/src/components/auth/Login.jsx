import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/Constant';
import { setLoading, setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import Footer from '../shared/Footer';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
          <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-4 my-10 bg-slate-300'>
            <h1 className='font-bold text-xl mb-5 text-center'>Login</h1>

            <div className='my-2'>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Enter Your Email"
              />
            </div>

            <div className='my-2'>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter Your Password"
              />
            </div>

            <div className='my-5'>
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {
              loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait.. </Button> :
                <Button type="submit" className="w-full my-4">Login</Button>
            }

            <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-400'>Signup</Link> </span>
          </form>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Login;
