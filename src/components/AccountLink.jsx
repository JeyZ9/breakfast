import React, { useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

function AccountLink() {
    const [toggleFace, setToggleFace] = useState(false)
    const [toggleGoo, setToggleGoo] = useState(true)
    const switchToggleFace = () => {
        setToggleFace(!toggleFace)
    }
    const switchToggleGoo = () => {
        setToggleGoo(!toggleGoo)
    }
  return (
    <>
        <div className='mx-10 my-20 text-gray-600 flex flex-col gap-y-4'>
            <h1 className='text-2xl font-bold'>My Linked Accounts</h1>
            <div className="text-gray-500 rounded-[5px] grid grid-cols-2 w-[40vw]">
                <div className="flex justify-between items-center px-2 border bg-white p-5">
                    <div className="flex items-center gap-x-4">
                        <i className='text-[2.5rem] text-blue-500'><FaFacebook /></i>
                        <p>Facebook</p>
                    </div>
                    <button onClick={()=>switchToggleFace()} className={`rounded-full w-[55px] p-[3px] h-[25px] items-center flex ${toggleFace?'justify-end bg-orange-400':'justify-start bg-gray-400'}`}><div className="w-[19px] h-[19px] shadow-xl rounded-full bg-white"></div></button>
                </div>
                <div className="flex justify-between items-center px-2 border bg-white">
                    <div className="flex items-center gap-x-4">
                        <i className='text-[2.5rem]'><FcGoogle /></i>
                        <p>Google</p>
                    </div>
                    <button onClick={()=>switchToggleGoo()} className={`rounded-full w-[55px] p-[3px] h-[25px] items-center flex ${toggleGoo?'justify-end bg-orange-400':'justify-start bg-gray-400'}`}><div className="w-[19px] h-[19px] shadow-xl rounded-full bg-white"></div></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AccountLink