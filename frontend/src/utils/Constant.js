// Use dynamic environment variables to switch between localhost and deployed backend

export const USER_API_ENDPOINT = process.env.NODE_ENV === 'production'
  ? "https://job-portal-v98d.onrender.com"
  : "http://localhost:8000/api/v1/user";

export const JOB_API_ENDPOINT = process.env.NODE_ENV === 'production'
  ? "https://job-portal-v98d.onrender.com"
  : "http://localhost:8000/api/v1/job";

export const APPLICATION_API_ENDPOINT = process.env.NODE_ENV === 'production'
  ? "https://job-portal-v98d.onrender.com"
  : "http://localhost:8000/api/v1/application";

export const COMPANY_API_ENDPOINT = process.env.NODE_ENV === 'production'
  ? "https://job-portal-v98d.onrender.com"
  : "http://localhost:8000/api/v1/company";
