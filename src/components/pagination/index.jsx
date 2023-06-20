import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPage, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<MdKeyboardArrowRight />}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={totalPage}
      previousLabel={<MdKeyboardArrowLeft />}
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center items-center gap-2"
      pageLinkClassName="w-4 h-4 p-4 flex justify-center items-center rounded-full border border-gray-300 "
      activeLinkClassName="bg-brand-500 text-white"
    />
  );
};

export default Pagination;
