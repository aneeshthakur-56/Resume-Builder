import { RouterProvider } from "react-router-dom";
import router from "./routes/MainRoute";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { makeApiRequest } from "./utils/apiService";
import { login, setLoading } from "./app/features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await makeApiRequest("/api/users/data", "GET");
        if (response && response.success) {
          dispatch(login(response.data));
        }
      } catch (error) {
        console.error("Auth session check failed:", error);
      } finally {
        dispatch(setLoading(false));
      }
    }
    loadUser();
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
