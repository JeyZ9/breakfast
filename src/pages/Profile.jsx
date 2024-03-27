import React, { useEffect, useState } from 'react';
import { useCustomer } from '../contexts/CustomerContext';
import { IoIosArrowUp,IoIosList } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoPersonCircleSharp, IoKeyOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { PiSelectionFill, PiSignOutFill } from "react-icons/pi";
import { useCountry } from '../contexts/CountryContext';
import ChangePass from '../components/ChangePass';
import ProfileEdit from '../components/ProfileEdit';
import ContactLis from '../components/ContactLis';
import Traveler from '../components/Traveler';
import AccountLink from '../components/AccountLink';
import MyOrder from '../components/MyOrder';

function Profile() {
  const {type} = useParams();
  const { countrys } = useCountry();
  const { customers } = useCustomer();
  const [orderBtn, setOrderBtn] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [ country, setCountry ] = useState([])
  const [formData, setFormData] = useState([]);
  const [signOut, setSignOut] = useState(false);
  const navigate = useNavigate();

  //ดึงค่า id จาก localstate
  function getCustomerId() {
    const customerId = localStorage.getItem('customerId');
    return customerId;
  }

  const handleSignOut = () => {
    setSignOut(true);
    navigate('/');
    localStorage.setItem('customerId', null);
    window.location.reload();
  }


  useEffect(() => {
    const fetchCountry = countrys.map((item) => item.name);
    setCountry(fetchCountry);
  },[countrys])

  // console.log(country)

  useEffect(() => {
    const fetchCustomer = customers.find(customer => customer.customerId == getCustomerId());
    if (fetchCustomer) {
      setCustomerList([fetchCustomer]);
    } else {
      setCustomerList([]);
    }
  }, [customers[0]]);



  function getCustomerId() {
    const customerId = localStorage.getItem('customerId');
    return customerId;
  }

  useEffect(() => {
    const fetchCustomerData = async() => {
        try {
            const loggedInUserId = parseInt(getCustomerId());
            const foundUser = customers.find(customer => customer.customerId === loggedInUserId);
            if (foundUser) {
                setFormData({
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    email: foundUser.email,
                    password: foundUser.password,
                    number: foundUser.number,
                    nationality: foundUser.nationality,
                    dateOfBirth: foundUser.dateOfBirth,
                });
            }
        } catch (error) {
            console.log("Error fetching customer data:", error);
        }
    }
    fetchCustomerData();
  }, [customerList[0]]);




  useEffect(()=>{
    if(type === 'all' || type === 'flight' || type === 'hotel'){
      setOrderBtn(true)
    }else{
      setOrderBtn(false)
    }
  },[type])

  const handleOrder = () => {
      setOrderBtn(!orderBtn)
  }

  // console.log("TEST LENGTH PASSWORD: ", passLan)
  // console.log("TEST COLOR : ", txtCol)

  return (
    <div className="z-40 bg-orange-50">
      <div className='flex h-screen w-screen'>
          {/* filter */}
          <div className="flex flex-col items-end bg-orange-500 py-4 min-w-[30vw]">
            <div className="text-white font-semibold">
                <div className="">
                    <button onClick={() => handleOrder()} className='px-2 py-3 flex items-center gap-x-4 min-w-[20vw]'><FaRegCalendarCheck className='text-xl' /> My Orders <IoIosArrowUp className={`${orderBtn?'':'origin-center rotate-180'} ml-auto transition-transform delay-250 duration-300 ease-in-out text-xl`} /></button>
                    {orderBtn && (
                        <div className='flex flex-col'>
                            <Link to={`/profile/order/all`} className={`py-3 hover:bg-orange-600 ${type === "all" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2`}>All</Link>
                            <Link to={`/profile/order/flight`} className={`py-3 hover:bg-orange-600 ${type === "flight" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2`}>Flight</Link>
                            <Link to={`/profile/order/hotel`} className={`py-3 hover:bg-orange-600 ${type === "hotel" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2`}>Hotel</Link>
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                  <Link to={`/profile/myprofile`} className={`py-3 hover:bg-orange-600 ${type === "myprofile" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2 flex items-center gap-x-4`}><IoPersonCircleSharp className='text-xl'/>Profile</Link>
                  <Link to={`/profile/password`} className={`py-3 hover:bg-orange-600 ${type === "password" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2 flex items-center gap-x-4`}><IoKeyOutline className='text-xl'/>Change Password</Link>
                  <Link to={`/profile/contact`} className={`py-3 hover:bg-orange-600 ${type === "contact" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2 flex items-center gap-x-4`}><IoIosList className='text-xl'/>Contact List</Link>
                  <Link to={`/profile/traveler`} className={`py-3 hover:bg-orange-600 ${type === "traveler" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2 flex items-center gap-x-4`}><CiViewList className='text-xl'/>Traveler</Link>
                  <Link to={`/profile/account`} className={`py-3 hover:bg-orange-600 ${type === "account" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2 flex items-center gap-x-4`}><GoLink className='text-xl'/>Account Linking</Link>
                  <button onClick={(e)=> handleSignOut()} className={`py-3 hover:bg-orange-600 ${type === "signout" ? 'border-l-[3px] bg-orange-600' : ''} border-white rounded-l-md px-2 flex items-center gap-x-4`}><PiSignOutFill className='text-xl'/>Sign Out</button>
                </div>
            </div>
          </div>

          <div className="profile-container w-full">
            {/* profile */}
            {type === "myprofile"&&(
              <ProfileEdit country={country} customerList={customerList} formData={formData} setFormData={setFormData} />
            )}

          {/* change password */}
          {type === "password"&&(
            <ChangePass customerList={customerList}  />
          )}

          {/* contact list */}
          {type === "contact" && (
            <ContactLis customerList={customerList} formData={formData} setFormData={setFormData} />
          )}

          {/* traveler */}
          {type === "traveler" && (
            <Traveler />
          )}

          {/* account */}
          {type === "account" && (
            <AccountLink />
          )}

          {/* My Order */}
          {/* all */}
          {type === "all" && (
            <MyOrder />
          )}
          {/* all */}
          {type === "flight" && (
            <MyOrder />
          )}
          {/* all */}
          {type === "hotel" && (
            <MyOrder />
          )}
          </div>
      </div>
    </div>
  );
}

export default Profile;
