import React from "react";

// Dashboard Imports
import Dashboard from "views/dashboard";
import Gallery from "views/dashboard/gallery";
import Partners from "views/dashboard/partners";
import Products from "views/dashboard/products";
import Users from "views/dashboard/users";
import Blogs from "views/dashboard/blogs";
import Promo from "views/dashboard/promo";
import Customers from "views/dashboard/customers";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdInsertPhoto,
  MdNewspaper,
  MdPerson,
  MdRedeem,
  MdHandshake,
  MdGroups2,
} from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import Profile from "views/dashboard/profile";

const dashboardRoutes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "home",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "User",
    layout: "/dashboard",
    icon: <MdPerson className="h-6 w-6" />,
    path: "user",
    component: <Users />,
  },
  {
    name: "Product",
    layout: "/dashboard",
    path: "product",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Products />,
    secondary: true,
  },
  {
    name: "Promo",
    layout: "/dashboard",
    path: "promo",
    icon: <MdRedeem className="h-6 w-6" />,
    component: <Promo />,
    secondary: true,
  },
  {
    name: "Gallery",
    layout: "/dashboard",
    path: "gallery",
    icon: <MdInsertPhoto className="h-6 w-6" />,
    component: <Gallery />,
  },
  {
    name: "Partner",
    layout: "/dashboard",
    path: "partner",
    icon: <MdHandshake className="h-6 w-6" />,
    component: <Partners />,
  },
  {
    name: "Blog",
    layout: "/dashboard",
    path: "blog",
    icon: <MdNewspaper className="h-6 w-6" />,
    component: <Blogs />,
  },
  {
    name: "Customer",
    layout: "/dashboard",
    path: "customer",
    icon: <MdGroups2 className="h-6 w-6" />,
    component: <Customers />,
  },
  {
    name: "Profile",
    layout: "/dashboard",
    path: "profile",
    icon: <HiUserCircle className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default dashboardRoutes;
