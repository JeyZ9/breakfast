import React from 'react';
import { Link } from 'react-router-dom';

function Item(props) {
  const { cardData } = props;


  return (
    <>
      <Link
        to={`/tickets/all/to/${props.title}`}
        className={`group w-full h-full rounded-[5px] ${
          cardData === props.id ? 'col-span-2' : 'col-span-1'
        } bg-cover bg-center flex items-end overflow-hidden`}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <div className={`${cardData === props.id ? '' : 'hidden'} flex justify-start items-center bottom-0 bg-[#80808070] pl-3 h-[20%] w-full z-100 translate-x-[20vw] group-hover:translate-x-0 transition ease-in-out delay-400 duration-200`}>
          <h1 className={`font-bold text-white translate-x-[20vw] group-hover:translate-x-0 transition ease-in-out delay-500 duration-300`}>
            {props.title}
          </h1>
        </div>
      </Link>
    </>
  );
}

export default Item;
