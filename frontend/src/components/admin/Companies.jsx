import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState(""); // for filtering companies search input
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full mx-auto my-10 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <input
            type="text"
            className="w-full lg:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full lg:w-auto mt-2 lg:mt-0"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </main>
    </div>
  );
};

export default Companies;
