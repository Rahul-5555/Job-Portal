import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/Constant';
import Footer from '../shared/Footer';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white divide-y divide-gray-200">
                <TableCaption>A list of recent applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs">Full Name</TableHead>
                        <TableHead className="text-xs">Email</TableHead>
                        <TableHead className="text-xs">Contact</TableHead>
                        <TableHead className="text-xs">Resume</TableHead>
                        <TableHead className="text-xs">Date</TableHead>
                        <TableHead className="text-xs text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="text-sm">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="text-sm">{item?.applicant?.email}</TableCell>
                            <TableCell className="text-sm">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="text-sm">
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 hover:underline"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell className="text-sm">{new Date(item?.applicant?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-sm text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 p-2">
                                        {shortlistingStatus.map((status) => (
                                            <div
                                                key={status}
                                                onClick={() => statusHandler(status, item._id)}
                                                className="cursor-pointer p-2 hover:bg-gray-100"
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
       
        </>
    );
};

export default ApplicantsTable;
