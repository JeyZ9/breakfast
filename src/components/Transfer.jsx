import React from 'react'

function Transfer() {
  return (
    <>
        <div className="grid-cols-2 grid gap-5">
            <div className="flex flex-col gap-2">
                <label htmlFor="">NAME</label>
                <input className='outline-none px-3 border border-gray-400 h-[6vh]' type="text" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="">SURNAME</label>
                <input className='outline-none px-3 border border-gray-400 h-[6vh]' type="text" />
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="">ADDRESS</label>
            <input type="text" className='outline-none px-3 border border-gray-400 h-[6vh]' />
        </div>
        <div className='grid grid-cols-2 gap-5'>
            <div className="flex flex-col gap-2">
                <label htmlFor="">CITY</label>
                <input type="text" className='outline-none px-3 border border-gray-400 h-[6vh]' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="">ZIP CODE</label>
                <input type="text" className='outline-none px-3 border border-gray-400 h-[6vh]' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="">PHONE NUMBER</label>
                <input type="text" className='outline-none px-3 border border-gray-400 h-[6vh]' />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="">EMAIL</label>
                <input type="text" className='outline-none px-3 border border-gray-400 h-[6vh]' />
            </div>
        </div>
    </>
  )
}

export default Transfer