import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import Footer from './shared/Footer';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <Table className="w-full min-w-[600px]">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Job Role</TableHead>
            <TableHead className="text-left">Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`px-2 py-1 text-sm font-medium rounded-lg ${
                    appliedJob?.status === "rejected" ? 'bg-red-100 text-red-600' :
                    appliedJob.status === 'pending' ? 'bg-gray-100 text-gray-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    
  );
 
};

export default AppliedJobTable;
