import React, { useState } from 'react'

function Testpage() {
  const [ slice, SetSlice] = useState(false);
  const handleSlice = () => {
    SetSlice(!slice);
  }
  return (
    <div className="">
      <div className={`${slice ? 'translate-x-10' : 'translate-x-0'} delay-300 duration-300 ease-in-out`}>Testpage</div>
      <button onClick={() => handleSlice()}>Click</button>
    </div>
  )
}

export default Testpage