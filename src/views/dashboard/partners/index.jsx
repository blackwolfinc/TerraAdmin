import Table from './Table'
import React from "react";

const Partners = () => {
  return (
    <div className="mt-3">
      <div className='p-4 flex flex-row justify-end items-center'>
        <button 
          className='
            py-2 px-8 text-white font-bold bg-blue-600 text-center rounded-full
            hover:bg-blue-900
          '
        >
          ADD
        </button>
      </div>
      <div className='flex flex-col bg-white'>
        <div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Partners;
