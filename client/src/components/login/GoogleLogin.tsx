import { FaGoogle } from "react-icons/fa";
// const APIURL = process.env.API_BASE_URL;
const APIURL = import.meta.env.VITE_API_URL;
// const APIURL = "http://localhost:3000";

const GoogleLogin = () => {

  const handleGoogleLogin = () => {
    window.location.href = `${APIURL}/auth/google`;
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="flex w-full justify-center items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <FaGoogle className="mx-2" /> Log in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
