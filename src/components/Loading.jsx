import React from "react";
import noResult from '../assets/no-results.png'

function Loading() {

  return (
    <div>
        <div className="flex flex-col justify-center items-center w-full h-screen text-center">
            <img className="w-[15vw]" src={noResult} alt="no flight" />
            <h1 className="font-bold text-xl">Oh! No flights found</h1>
            <p>You can change the date or the filter to find another flight</p>
        </div>
    </div>
  );
}

export default Loading;
