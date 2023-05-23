import React from "react";

// Dashboard Imports
import Dashboard from "views/dashboard";
import Gallery from "views/dashboard/gallery";
import Partners from "views/dashboard/partners";
import Products from "views/dashboard/products";
import Users from "views/dashboard/users";
import Blogs from "views/dashboard/blogs";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdInsertPhoto,
  MdNewspaper,
  MdPerson,
  MdLock,
  MdHandshake,
} from "react-icons/md";

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
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default dashboardRoutes;
