import React from "react";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import { MdLock } from "react-icons/md";

const authRoutes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default authRoutes;
