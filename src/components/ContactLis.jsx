import React from 'react'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";

function ContactLis({formData, setFormData}) {
  return (
    <>
     <div className='mx-10 my-20 text-gray-600 flex flex-col gap-y-4'>
        <h1 className='text-2xl font-bold'>Contact List</h1>
        <div className="bg-white p-5 text-gray-500 rounded-[5px]">
                <div className="">
                    <div className="border-b-2 pb-4 flex justify-between">
                        <h2>Mr.{formData.firstName}{formData.LastName}</h2>
                        <div className="flex gap-x-2">
                            <button className='hover:scale-125 text-xl'><HiOutlinePencilSquare /></button>
                            <button className='hover:scale-125 text-xl text-red-500'><FaRegTrashCan /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 pt-4">
                        <div className="">
                            <p className='text-xs'>Name</p>
                            <h2>{formData.firstName}{formData.LastName}</h2>
                        </div>
                        <div className="">
                            <p className='text-xs'>Mobile Number</p>
                            <h2>{formData.number}</h2>
                        </div>
                        <div className="">
                            <p className='text-xs'>Email</p>
                            <h2>{formData.email}</h2>
                        </div>
                    </div>
                </div>
        </div>
        <button className='w-full bg-orange-400 text-white py-2 rounded-[5px] hover:bg-orange-600'>+ Add Contact</button>
      </div>   
    </>
  )
}

export default ContactLis