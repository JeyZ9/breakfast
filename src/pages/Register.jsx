import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from "react-icons/fi";
import { useCustomer } from '../contexts/CustomerContext';
import { useCountry } from '../contexts/CountryContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash  } from "react-icons/fa";


function Register() {
    const {customers, registerCustomer} = useCustomer();
    const {countrys} = useCountry();
    const[country, setCountry] = useState([]);
    const [exitsEmail, setExitsEmail] = useState([])
    const [show, setShow] = useState(false);

    const [ formData, setFormData ] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "password": "",
        "number": '',
        "nationality": '',
        "dateOfBirth": ''
    });

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const currentDate = new Date()
    const dateNow = currentDate.toISOString().split("T")[0]

    const flipPass = () => {
        setShow(!show);
    }

    useEffect(() => {
        const fetchCountry = countrys.map((item) => item.name);
        setCountry(fetchCountry);
      },[countrys])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const fetchCusEmail = customers.map(item => item.email);
        setExitsEmail(fetchCusEmail);
    },[customers,formData])
    console.log()

    const handleRegister = async(e) =>{
        e.preventDefault();
        try {
            // ตรวจสอบว่าอีเมล์ที่ผู้ใช้ป้อนไม่ซ้ำกับอีเมล์ที่มีอยู่ใน exitsEmail
            if (!exitsEmail.includes(formData.email)) {
                const response = await registerCustomer(formData);
                if (response.success) {
                    setMessage('Registration is complete.');
                    navigate('/login');
                    window.location.reload();
                } else {
                    setMessage('An error occurred while registering for membership: ' + response.error);
                }
            } else {
                setMessage('This email is already registered.');
            }
        } catch (error) {
            setMessage(`An error occurred sending the request: ${error.message}`);
        }
    }
  return (
    <div className="bg-white max-w-screen max-h-screen flex justify-center items-center relative">
    <Link to={'/login'} className="absolute flex items-center top-0 left-0 p-10 text-gray-700 text-lg">
        <i><FiArrowLeft /></i>
        <p className="hover:border-b border-gray-700">Back</p>
    </Link>
      <div className="bg-orange-100 grid grid-cols-2 w-screen h-screen px-60 py-20">
        {/* image */}
        <div class="bg-person bg-cover bg-center bg-no-repeat"></div>

        {/* register */}
        <div className="bg-white px-20 py-5 flex flex-col items-center justify-center w-full text-gray-700">
          <h1 className="text-2xl font-semibold">Resgister</h1>

          <form onSubmit={handleRegister} className="w-full flex flex-col justify-center gap-y-4">
            <label className="flex flex-col">
                <p>Name</p>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400" required />
            </label>
            <label className="flex flex-col">
                <p>Surname</p>
                <input type="lastName" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400" required />
            </label>
            <label className="flex flex-col">
                <p>Email</p>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400" required />
            </label>
            <label className="flex flex-col">
                <p>Password</p>
                <div className="flex relative w-full">
                    <input type={show ? 'text' : `password`} id="password" name="password" value={formData.password} onChange={handleChange} className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400 w-full" minLength="6" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" required />
                    <div className="items-center flex -translate-x-6">
                        <button type="button" onClick={() => flipPass()} className='absolute text-gray-400'>{show ? <FaEye /> : <FaEyeSlash />}</button>
                    </div>
              </div>
            </label>
            <label className="flex flex-col">
                <p>Phone Number</p>
                <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400" required />
            </label>
            <div className="grid grid-cols-2 gap-x-4">
                <label className="flex flex-col">
                    <p className="">Nationality</p>
                    <select
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="px-2 py-1 h-full focus:outline-orange-500 rounded-[5px] border border-gray-400"
                    >
                    {country.map((item) => (
                        <option key={item.common} value={item.common}>
                        {item.common}
                        </option>
                    ))}
                    </select>
                </label>
                <label className="flex flex-col">
                    <p>Date of birth</p>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth < dateNow &&  formData.dateOfBirth !== '' ? formData.dateOfBirth : dateNow} onChange={handleChange} className="px-2 py-1 focus:outline-orange-500 rounded-[5px] border border-gray-400" required />
                </label>
            </div>
            <button type='submit' className='bg-orange-400 rounded-[5px] py-1 text-sm text-white w-full'>Register</button>
          </form>
          {message && <div className='text-red-500'>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default Register