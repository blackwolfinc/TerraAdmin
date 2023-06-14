/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import Logo from "assets/img/logo.png";

const Sidebar = ({ open, onClose, routes = [] }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex w-40 items-center`}>
        <div className="w-full">
          <img src={Logo} alt="Terra Logo" className="min-h-full min-w-full" />
        </div>
      </div>
      <div className="my-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>
    </div>
  );
};

export default Sidebar;
