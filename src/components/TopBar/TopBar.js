import { Link, useLocation } from "react-router-dom";
import { authService } from "../../helpers/auth";

const TopBar = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  console.log(currentUser.user.email);
  const logout = () => {
    authService.logout();
    window.location.replace("/");
  };

  return (
    <div className=" h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10 bg-white">
      <div className="flex h-full text-gray-600 dark:text-gray-400">
        <Link
          to="/purchases"
          className={
            location.pathname === "/purchases"
              ? "cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center"
              : "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
          }
        >
          Purchase Orders
        </Link>
        <Link
          to="/inventory"
          className={
            location.pathname === "/inventory"
              ? "cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center"
              : "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
          }
        >
          Inventory
        </Link>
        <Link
          to="/products"
          className={
            location.pathname === "/products"
              ? "cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center"
              : "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
          }
        >
          Products
        </Link>
        <Link
          to="/settings"
          className={
            location.pathname === "/settings"
              ? "cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center"
              : "cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8"
          }
        >
          Settings
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-7">
        <button
          className="h-8 px-3 rounded-md shadow text-white bg-blue-500"
          onClick={() => logout()}
        >
          Logout
        </button>

        <button className="flex items-center">
          <span className="relative flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-7 h-7 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
          </span>
          <span className="ml-2">{currentUser.user.email}</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
