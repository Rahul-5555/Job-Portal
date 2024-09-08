import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '@/utils/Constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-4">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold flex-1">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter description"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                type="text"
                id="website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="Enter website URL"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter location"
                className="mt-1"
              />
            </div>
            <div className="col-span-full">
              <Label htmlFor="file">Logo</Label>
              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Please wait..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
