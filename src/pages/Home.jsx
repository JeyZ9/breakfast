import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Search from '../components/Search'
import content from '../data/HomeContent'

function Home() {
  // const [contentData, setContentData] = useState([])

  // useEffect(()=>{
  //   const fetchContent = content.map((item) => item)
  //   setContentData(fetchContent);
  //   // console.log(content)
  // },[content])

  //   console.log(contentData)


  return (
    <div className='reletive flex flex-col items-center justify-between h-auto bg-orange-100'>
      <div className="bg-orange-500 w-full h-[30vh] absolute z-0 rounded-b-[60em]">
      </div>
        <div className="w-full h-[20vh] px-[15vw] flex flex-col justify-center z-10 text-white">
          <h1 className='text-4xl font-bold'>Flight Plan</h1>
          <p className='text-sm'>Explore plan amazing trips beyond flight. To get the best of your adventure.</p>
        </div>
          <div className="z-10">
            <Search />
          </div>
          <div className="py-10">
            <Card />
          </div>
      <div className="w-full h-[20vh] bg-white grid grid-cols-4 px-10 gap-x-10 py-10">
        {content.map((item,index)=>
          <div className="flex gap-2" key={index}>
            {/* icons */}
            <img src={item.icon} className='w-[50px] h-[50px]' alt="" />
            <div className="">
              <h1 className='text-lg font-semibold'>{item.title}</h1>
              <p className='text-sm'>{item.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;