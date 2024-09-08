import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const isResume = user?.profile?.resume !== '';

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                alt="Profile img"
              />
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-medium">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="ml-auto text-sm md:text-base py-2 px-4 flex items-center gap-2"
              variant="outline"
            >
              <Pen className='text-xs md:text-sm' />
              Edit
            </Button>

          </div>
          <div className="my-6">
            <div className="flex items-center gap-3 mb-2">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <div className="my-6">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
          <div className="my-6">
            <Label className="text-md font-semibold">Resume</Label>
            {isResume ? (
              <a
                href={user?.profile?.resume}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">No resume uploaded</span>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl my-8 shadow-md">
          <h2 className="text-xl font-bold p-6">Applied Jobs</h2>
          <div className="overflow-x-auto">
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
