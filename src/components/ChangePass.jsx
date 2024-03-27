import React, { useState } from 'react'
import { FaEye,FaEyeSlash  } from "react-icons/fa";
import { useCustomer } from '../contexts/CustomerContext';

function ChangePass({customerList}) {
    const [txtCol, setTxtCol] = useState();
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);
    const [oldPassVisible, setOldPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const {updateCustomer} = useCustomer()

    if(!customerList){
      return null;
    }

    // console.log("Test Change pass : ", customerList)
    
    let passLan = newPassword.length;

    const handlePasswordVisibility = (stateUpdater) => {
        stateUpdater((prevState) => !prevState);
      };
    
      const handleChangePassword = async (e) => {
        e.preventDefault();// ป้องกันการทำงานเริ่มต้นของเหตุการณ์ onSubmit // ทำสิ่งที่ต้องการเมื่อมีการส่งฟอร์ม
    
        for(const customer of customerList){
    
          if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage('Please fill in all fields.');
            setTxtCol(false);
            return;
          }
          if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            setTxtCol(false);
            return;
          }
          
          if (currentPassword !== customer.password) {
            setMessage('Current password and password do not match.');
            setTxtCol(false);
            return;
          }

          if(newPassword == ''){
            return false;
          }
    
          try {
            setLoading(true);
            const customerId = customer.customerId;
            // console.log(customer.customerId)
            await updateCustomer(customerId, { 
              "customerId": customer.customerId,
              "firstName": customer.firstName,
              "lastName": customer.lastName,
              "email": customer.email,
              "password": newPassword,
              "number": customer.number,
              "nationality": customer.nationality,
              "dateOfBirth": customer.dateOfBirth
            });
            setMessage('Password updated successfully.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTxtCol(true);
          } catch (error) {
            setMessage('Error updating password. Please try again.');
            console.error('Error updating password:', error);
            setTxtCol(false);
          } finally {
            setLoading(false);
          }
        }
      };
  return (
    <>
      <form onSubmit={handleChangePassword} method='post' className="text-gray-600 px-10 py-20 flex flex-col gap-y-4">
        <h1 className='text-2xl font-bold'>Change Password</h1>
        <div className="max-w-[40vw] bg-white p-6 text-xs flex flex-col gap-y-5 rounded-[5px]">
          <label htmlFor="old">
            <p>Old Password</p>
            <div className="relative flex items-center">
              <input id='old' type={oldPassVisible ? 'text' : 'password'} className='border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 w-[30vw] bg-transparent' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <div className="relative items-center flex -translate-x-6">
                <button type="button" onClick={() => handlePasswordVisibility(setOldPassVisible)} className='absolute text-gray-400'>{oldPassVisible ? <FaEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
          </label>
          <label htmlFor="new">
            <p>New Password</p>
            <div className="relative flex items-center">
                {/* (?=.*\d): ตรวจสอบว่ารหัสผ่านมีตัวเลขอย่างน้อยหนึ่งตัว (0-9)
                (?=.*[a-z]): ตรวจสอบว่ารหัสผ่านมีตัวอักษรพิมพ์เล็กอย่างน้อยหนึ่งตัว (a-z)
                (?=.*[A-Z]): ตรวจสอบว่ารหัสผ่านมีตัวอักษรพิมพ์ใหญ่อย่างน้อยหนึ่งตัว (A-Z)
                {8,}: ตรวจสอบว่ารหัสผ่านมีความยาวอย่างน้อย 8 ตัวอักษร */}
              <input id='new' type={newPassVisible ? 'text' : 'password'} className='border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 w-[30vw] bg-transparent' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength="6" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
              <div className="relative items-center flex -translate-x-6">
                <button type="button" onClick={() => handlePasswordVisibility(setNewPassVisible)} className='absolute text-gray-400'>{newPassVisible ? <FaEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
          </label>
          <label htmlFor="con">
            <p>Confirm Password</p>
            <div className="relative flex items-center">
              <input id='con' type={confirmPassVisible ? 'text' : 'password'} className='border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 w-[30vw] bg-transparent' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength="6" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
              <div className="relative items-center flex -translate-x-6">
                <button type="button" onClick={() => handlePasswordVisibility(setConfirmPassVisible)} className='absolute text-gray-400'>{confirmPassVisible ? <FaEye /> : <FaEyeSlash />}</button>
              </div>
            </div>
          </label>

            {/* password strength meter */}
          <div className='flex flex-col '>
            <p>Password Strength</p>
              <div className="flex items-center text-xs font-semibold h-4 gap-x-4">
                <div className='w-[50%] rounded-xl bg-gray-200 overflow-hidden h-1 relative'>
                  <div style={{width:`${passLan*5}%`}} className={`delay-250 duration-300 ease-in-out h-full rounded-xl ${passLan>=16 ? 'bg-green-400' : passLan>=10 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                </div>
                <p className={`${passLan>=16 ? 'text-green-400' : passLan>=10 ? 'text-yellow-400' : 'text-red-400'} ${passLan === 0 ? 'hidden' : ''}`}>{passLan>=16 ? 'Strong' : passLan>=10 ? 'Medium' : 'Weak'}</p>
              </div>
              <p className='text-xs text-gray-400'>Password must have at least 6 characters and contain at least one symbol or number.</p>
          </div>
          {message && <p style={{color:`${txtCol === true ? `green` : `red`}`}}>{message}</p>}
          <button className='bg-orange-400 px-3 py-1 rounded-[5px] text-white font-semibold' type='submit' disabled={loading}>Save</button>
        </div>
      </form>
    </>
  )
}

export default ChangePass