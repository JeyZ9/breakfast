import React, { useContext, useEffect, useState } from 'react'
import Item from './Item';
import Travel from '../data/Travel';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Card() {

  const [ cardData, setCardData ] = useState('')
  const [ count, setCount ] = useState(3)



  const handleCount = (num) => {
    setCount(preCount => Math.max(0,Math.min(preCount + num, Travel.length - 1)))
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleCount(1)
      if (count >= 6) {
        setCount(0)
      }
    }, 3000);
    return () => clearInterval(intervalId)
  }, [count, Travel.length])

  const nextCard = () => {
    handleCount(1)
    if(count >= 6){
      setCount(0)
    }
  }
  const backCard = () => {
    handleCount(-1)
    if(count <= 0){
      setCount(6)
    }
  }

  useEffect(() => {
    const fetchData = Travel.map((item) => item.id)
    setCardData(fetchData[count])
  },[count])

  return (
    <div className='h-[40vh] w-[80vw] relative py-10 px-10 flex justify-between items-center'>
        <button onClick={() => backCard()} className='bg-[#80808020] hover:bg-[#80808040] transition delay-150 duration-300 ease-in-out rounded-full w-10 h-10 items-center flex justify-center m-auto'><IoIosArrowBack /></button>
        <div className={`grid  grid-cols-8 grid-rows-1 gap-5 w-[65vw] h-full`}>
          {Travel.map((item) =>{
            return(
              <Item {...item} cardData = {cardData} key={item.id} />
            )
          })}
        </div>
        <button onClick={() => nextCard()} className='bg-[#80808020] hover:bg-[#80808040] transition delay-150 duration-300 ease-in-out rounded-full w-10 h-10 items-center flex justify-center m-auto'><IoIosArrowForward /></button>
    </div>
  )
}

export default Card;