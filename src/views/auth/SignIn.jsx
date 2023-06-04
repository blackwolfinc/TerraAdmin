import { useReducer, useContext } from "react";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { useNavigate } from "react-router-dom";
import { CookieStorage } from "utils/cookies";
import { CookieKeys } from "utils/cookies";
import { usePostLoginMutation } from "services/auth/post-login";
import { Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { UserContext } from "context/UserContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { mutate: loginMutate, isLoading: loginLoading } =
    usePostLoginMutation();
  const [loginForm, setLoginForm] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      email: "",
      password: "",
    }
  );

  const submitLogin = (e) => {
    e.preventDefault();

    loginMutate(loginForm, {
      onSuccess: (res) => {
        const token = res.data.data.token;
        const decoded = jwtDecode(token);
        const userData = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };

        CookieStorage.set(CookieKeys.AuthToken, token, {
          expires: new Date(decoded.exp * 1000),
        });

        CookieStorage.set(CookieKeys.User, userData, {
          expires: new Date(decoded.exp * 1000),
        });

        setUser(userData);

        toast.success("Login success!");
        navigate("/dashboard", { replace: true });
      },
      onError: (err) => {
        if (err.response.status === 401 || err.response.status === 500) {
          toast.error("Invalid email or password");
        }
      },
      onSettled: () => {
        setLoginForm({ password: "" });
      },
    });
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <form
        className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]"
        onSubmit={submitLogin}
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Login
        </h4>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="Email"
          id="email"
          type="email"
          required
          onChange={(e) => setLoginForm({ email: e.target.value })}
          value={loginForm.email}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          minLength={8}
          required
          onChange={(e) => setLoginForm({ password: e.target.value })}
          value={loginForm.password}
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          {/* <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a> */}
        </div>
        <button
          type="submit"
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {loginLoading && <Spinner thickness="2px" speed="0.65s" size="xs" />}
          {!loginLoading && <span>Login</span>}
        </button>
        {/* <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div> */}
      </form>
    </div>
  );
}
