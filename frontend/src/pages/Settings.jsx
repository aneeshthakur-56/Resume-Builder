import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Shield, Save, KeyRound } from "lucide-react";
import { makeApiRequest } from "../utils/apiService";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsUpdatingProfile(true);
    try {
      const response = await makeApiRequest("/api/users/update", "PUT", {
        name: profileForm.name,
        email: profileForm.email,
      });
      if (response && response.success) {
        dispatch(login(response.data));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const response = await makeApiRequest("/api/users/update", "PUT", {
        currentPassword,
        newPassword,
      });
      if (response && response.success) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        toast.success("Password changed successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Initials for Avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">Account Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your profile details and account security settings.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Left Side: Navigation & Summary Card */}
        <div className="md:col-span-4 space-y-6">
          {/* User Brief Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-md ring-4 ring-white">
              {initials}
            </div>
            <h2 className="text-lg font-semibold text-slate-800 truncate">{user?.name}</h2>
            <p className="text-xs text-slate-500 truncate mb-4">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/10">
              Active Member
            </span>
          </div>

          {/* Navigation Links */}
          <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <User size={18} />
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "security"
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Shield size={18} />
              Account Security
            </button>
          </div>
        </div>

        {/* Right Side: Tab Forms */}
        <div className="md:col-span-8">
          {activeTab === "profile" ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <User size={20} className="text-green-600" />
                Profile Details
              </h3>
              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm transition-all"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm transition-all"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-green-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} />
                    {isUpdatingProfile ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                Change Password
              </h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm transition-all"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm transition-all"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Minimum 6 characters"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none text-sm transition-all"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="inline-flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-green-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} />
                    {isUpdatingPassword ? "Updating Password..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
