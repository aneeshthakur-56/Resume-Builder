import { useState, useEffect } from "react";
import { User2Icon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { makeApiRequest } from "../utils/apiService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const urlState = searchParams.get("state");
  const [state, setState] = useState(urlState || "login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && (typeof user !== "object" || Object.keys(user).length > 0)) {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload =
        state === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const response = await makeApiRequest(
        `/api/users/${state}`,
        "POST",
        payload,
      );
      if (response.success) {
        const userData = response.data || response.user;

        if (userData) {
          dispatch(login(userData));
        } else {
          const userRes = await makeApiRequest("/api/users/data", "GET");
          if (userRes && userRes.success) {
            dispatch(login(userRes.data || userRes.user));
          }
        }

        toast.success(response.message);
        navigate("/app");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please {state === "login" ? "sign in" : "sign up"} in to continue
        </p>
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={13} color="#6b7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6b7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2">
          <Lock size={13} color="#6b7280" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none flex-shrink-0"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="mt-4 text-left text-green-500">
          <button className="text-sm" type="reset">
            Forget password?
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>
        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3 mb-11"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a href="#" className="text-green-500 hover:underline">
            click here
          </a>
        </p>
      </form>
    </div>
  );
};
export default Login;
