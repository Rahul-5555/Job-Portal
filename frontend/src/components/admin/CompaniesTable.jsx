import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText = [] } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.filter(company => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Logo</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-4">You haven't registered any company yet.</TableCell>
            </TableRow>
          ) : (
            filterCompany.map(company => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={company.logo} alt={`${company.name} logo`} className="object-cover" />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" aria-label="More options" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded-md"
                        role="button"
                        aria-label="Edit company"
                      >
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
