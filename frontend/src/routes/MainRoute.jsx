import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import { Layout as ResumeLayout } from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import ResumeBuilder from "../pages/ResumeBuilder";
import Login from "../pages/Login";
import Preview from "../pages/Preview";
import NotFound from "../pages/NotFound";
import Settings from "../pages/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route
        path="app"
        element={
          <ProtectedRoute>
            <ResumeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="view/:resumeId" element={<Preview />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
