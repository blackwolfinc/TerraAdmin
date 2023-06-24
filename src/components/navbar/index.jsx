import React from "react";
import Dropdown from "components/dropdown";
import { Link } from "react-router-dom";
import { CookieStorage, CookieKeys } from "utils/cookies";
import { UserContext } from "context/UserContext";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { brandText } = props;
  const navigate = useNavigate();
  // const [darkmode, setDarkmode] = React.useState(false);

  const { user } = React.useContext(UserContext);

  const handleLogout = () => {
    CookieStorage.remove(CookieKeys.AuthToken);
    window.location.reload();
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <span className="text-sm font-normal text-navy-700 dark:text-white dark:hover:text-white">
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </span>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
        <div className="flex items-center gap-2 px-4">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            👋 Hey, {user.name}
          </p>{" "}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 cursor-pointer rounded-full"
              src={`https://ui-avatars.com/api/?name=${user.name}&background=868CFF`}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="ml-4 flex flex-col">
                <div
                  className="cursor-pointer text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  onClick={() => navigate("/dashboard/profile")}
                >
                  Profile Settings
                </div>
                <div
                  className="mt-3 cursor-pointer text-sm font-medium text-red-500 hover:text-red-500"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
