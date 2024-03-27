import React, { useEffect, useState } from "react";
import { useCustomer } from "../contexts/CustomerContext";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye,FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

function Login() {
  const { loginCustomer, customers } = useCustomer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hiddenPass, setHiddenPass] = useState(false);

  const handlePasswordVisibility = () => {
    setHiddenPass(!hiddenPass)
  }

  const handleBack = () => {
    navigate('/')
  }

  useEffect(() => {
    const foundCustomer = customers.find(
      (customer) => customer.email === email && customer.password === password
    );
    if (foundCustomer) {
      setId(foundCustomer.customerId);
      const customerId = foundCustomer.customerId; // ให้ customerId เป็นค่าจำลอง คุณควรใช้ข้อมูลจริง
      localStorage.setItem("customerId", customerId);
    }
  }, [email, password, customers]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id !== null) {
        await loginCustomer(id);
        console.log("Login success!");
        navigate("/profile/myprofile");
        // Reload the current page
        window.location.reload();
      } else {
        console.log("email or password disable!");
      }
    } catch (error) {
      console.error("Login not found!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-screen max-h-screen flex justify-center items-center relative">
    <button onClick={() => handleBack()} className="absolute flex items-center top-0 left-0 p-10 text-gray-700 text-lg">
        <i><FiArrowLeft /></i>
        <p className="hover:border-b border-gray-700">Back</p>
    </button>
      <div className="bg-orange-100 grid grid-cols-2 w-screen h-screen px-60 py-20">
        {/* image */}
        <div class="bg-person bg-cover bg-center bg-no-repeat"></div>

        {/* login */}
        <div className="bg-white p-20 flex flex-col items-center justify-center w-full text-gray-700">
          <h1 className="text-2xl font-semibold">Login</h1>
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col justify-center gap-y-4"
          >
            <div className="flex flex-col w-full text-sm font-semibold">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400"
              />
            </div>
            <div className="flex flex-col w-full text-sm font-semibold">
              <label htmlFor="password">Password</label>
              <div className="flex relative w-full">
                <input
                    type={`${hiddenPass?"text":"password"}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400 w-full"
                />
                <div className="items-center flex -translate-x-6">
                    <button type="button" onClick={() => handlePasswordVisibility()} className='absolute text-gray-400'>{hiddenPass ? <FaEye /> : <FaEyeSlash />}</button>
                </div>
              </div>
              <div className="text-xs font-normal flex justify-end">
                <Link>Forgot password?</Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-400 rounded-[5px] py-1 text-sm text-white"
            >
              Login
            </button>
            <div className="w-full flex items-center justify-between">
              {/* line 1 */}
              <div className="w-[7vw] 3xl:w-full h-[1px] bg-gray-400"></div>
              {/* content */}
              <div className="flex 3xl:w-full justify-center gap-x-1">
                <h2 className="font-semibold">Login</h2>
                <p>with Others</p>
              </div>
              {/* line 2 */}
              <div className="w-[7vw] 3xl:w-full h-[1px] bg-gray-400"></div>
            </div>
            <button className="text-sm flex gap-1 border border-gray-400 w-full justify-center py-1 rounded-[5px] items-center">
              <i className="text-2xl">
                <FcGoogle />
              </i>{" "}
              Login with<p className="font-semibold">google</p>
            </button>
            <button className="text-sm flex gap-1 border border-gray-400 w-full justify-center py-1 rounded-[5px] items-center">
              <i className="text-2xl text-blue-600">
                <FaFacebook />
              </i>{" "}
              Login with<p className="font-semibold">facebook</p>
            </button>
            <div className="flex justify-end">
                <Link className="text-xs flex gap-1">Don't have an account?<Link to={`/register`} className="font-semibold hover:border-b border-gray-800">Sign Up</Link></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
