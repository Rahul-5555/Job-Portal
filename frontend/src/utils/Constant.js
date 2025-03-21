// Use dynamic environment variables to switch between localhost and deployed backend

export const USER_API_ENDPOINT = import.meta.env.MODE === 'production'
  ? "https://job-portal-v98d.onrender.com/api/v1/user"
  : "http://localhost:8000/api/v1/user";

export const JOB_API_ENDPOINT = import.meta.env.MODE === 'production'
  ? "https://job-portal-v98d.onrender.com/api/v1/job"
  : "http://localhost:8000/api/v1/job";

export const APPLICATION_API_ENDPOINT = import.meta.env.MODE === 'production'
  ? "https://job-portal-v98d.onrender.com/api/v1/application"
  : "http://localhost:8000/api/v1/application";

export const COMPANY_API_ENDPOINT = import.meta.env.MODE === 'production'
  ? "https://job-portal-v98d.onrender.com/api/v1/company"
  : "http://localhost:8000/api/v1/company";
