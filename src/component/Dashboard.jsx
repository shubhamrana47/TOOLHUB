
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);

  // ================= USER DATA =================
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    username: user?.username || "",
  });

  // ================= EDIT STATE =================
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
  });

  // ================= INITIALIZE DATA =================
  useEffect(() => {
    if (user) {
      const userData = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        username: user?.username || "",
      };

      setProfile(userData);
      setFormData(userData);
    }
  }, [user]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= EDIT PROFILE =================
  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  // ================= CANCEL EDIT =================
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    // Backend API can be connected here later.

    setProfile(formData);
    setIsEditing(false);

    toast.success("Profile updated successfully!");
  };

  // ================= AVATAR LETTER =================
  const avatarLetter =
    profile?.name?.charAt(0)?.toUpperCase() ||
    profile?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 lg:px-12">

      {/* ===================================================== */}
      {/* PAGE HEADER */}
      {/* ===================================================== */}

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-blue-600">
            Account
          </p>

          <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            My Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Manage your profile, account information and Toolhub activity
            from one place.
          </p>
        </div>

        {/* ===================================================== */}
        {/* PROFILE HEADER CARD */}
        {/* ===================================================== */}

        <div
          className="
            mb-6
            overflow-hidden
            rounded-3xl
            border border-blue-100
            bg-white
            shadow-[0_15px_45px_rgba(37,99,235,0.08)]
          "
        >
          {/* Blue Header */}
          <div
            className="
              h-32
              bg-gradient-to-r
              from-blue-700
              via-blue-600
              to-blue-500
            "
          />

          <div className="relative px-6 pb-6 md:px-8">

            {/* Avatar */}
            <div
              className="
                absolute
                -top-14
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                border-8
                border-white
                bg-blue-100
                text-4xl
                font-black
                text-blue-600
                shadow-lg
              "
            >
              {avatarLetter}
            </div>

            {/* Profile Information */}
            <div className="pt-20">

              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

                <div>
                  <h2 className="text-2xl font-black text-gray-900">
                    {profile.name || "Your Name"}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {profile.email || "your@email.com"}
                  </p>

                  {profile.username && (
                    <p className="mt-2 text-sm font-medium text-blue-600">
                      @{profile.username}
                    </p>
                  )}
                </div>

                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="
                      w-full
                      rounded-xl
                      bg-blue-600
                      px-6
                      py-3
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-blue-600/20
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-blue-700
                      hover:shadow-xl
                      md:w-auto
                    "
                  >
                    Edit Profile
                  </button>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* STATISTICS */}
        {/* ===================================================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Keywords */}
          <div
            className="
              rounded-2xl
              border border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <p className="text-sm font-medium text-gray-500">
              Keywords Searched
            </p>

            <h3 className="mt-2 text-3xl font-black text-gray-900">
              0
            </h3>

            <p className="mt-1 text-xs font-medium text-blue-600">
              AI keyword research
            </p>
          </div>

          {/* Blogs */}
          <div
            className="
              rounded-2xl
              border border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <p className="text-sm font-medium text-gray-500">
              Blogs Created
            </p>

            <h3 className="mt-2 text-3xl font-black text-gray-900">
              0
            </h3>

            <p className="mt-1 text-xs font-medium text-blue-600">
              AI generated content
            </p>
          </div>

          {/* Audits */}
          <div
            className="
              rounded-2xl
              border border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <p className="text-sm font-medium text-gray-500">
              Website Audits
            </p>

            <h3 className="mt-2 text-3xl font-black text-gray-900">
              0
            </h3>

            <p className="mt-1 text-xs font-medium text-blue-600">
              SEO analysis
            </p>
          </div>

        </div>

        {/* ===================================================== */}
        {/* MAIN CONTENT */}
        {/* ===================================================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ================================================= */}
          {/* PERSONAL INFORMATION */}
          {/* ================================================= */}

          <div
            className="
              rounded-3xl
              border border-gray-100
              bg-white
              p-6
              shadow-sm
              lg:col-span-2
              md:p-8
            "
          >

            <div className="mb-7">

              <p className="text-sm font-semibold uppercase tracking-[2px] text-blue-600">
                Profile
              </p>

              <h2 className="mt-1 text-2xl font-black text-gray-900">
                Personal Information
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Update your personal information below.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-900
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                ) : (
                  <div
                    className="
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-800
                    "
                  >
                    {profile.name || "Not provided"}
                  </div>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Username
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-900
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                ) : (
                  <div
                    className="
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-800
                    "
                  >
                    {profile.username
                      ? `@${profile.username}`
                      : "Not provided"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-900
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                ) : (
                  <div
                    className="
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-800
                    "
                  >
                    {profile.email || "Not provided"}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-900
                      outline-none
                      transition
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />
                ) : (
                  <div
                    className="
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50
                      px-4
                      py-3
                      text-gray-800
                    "
                  >
                    {profile.phone || "Not provided"}
                  </div>
                )}
              </div>

              {/* Plan */}
<div>
  <label className="mb-2 block text-sm font-semibold text-gray-700">
    Subscription Plan
  </label>

  {isEditing ? (
    <select
      name="plan"
      value={formData.plan}
      onChange={handleChange}
      className="
        w-full
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        px-4
        py-3
        text-gray-900
        outline-none
        transition
        focus:border-blue-500
        focus:bg-white
        focus:ring-4
        focus:ring-blue-100
      "
    >
      <option value="free">Free Plan</option>
      <option value="pro">Pro Plan</option>
      <option value="premium">Business Plan</option>
    </select>
  ) : (
    <div
      className="
        rounded-xl
        border
        border-gray-100
        bg-gray-50
        px-4
        py-3
        font-medium
        text-gray-800
      "
    >
      {profile.plan === "pro"
        ? "Pro Plan"
        : profile.plan === "premium"
        ? "Premium Plan"
        : "Free Plan"}
    </div>
  )}
</div>

            </div>

            {/* Save / Cancel */}
            {isEditing && (
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  onClick={handleCancel}
                  className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-gray-700
                    transition
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="
                    rounded-xl
                    bg-blue-600
                    px-7
                    py-3
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    transition
                    hover:bg-blue-700
                  "
                >
                  Save Changes
                </button>

              </div>
            )}

          </div>

          {/* ================================================= */}
          {/* ACCOUNT CARD */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* Account */}
            <div
              className="
                rounded-3xl
                border border-gray-100
                bg-white
                p-6
                shadow-sm
              "
            >

              <p className="text-sm font-semibold uppercase tracking-[2px] text-blue-600">
                Security
              </p>

              <h2 className="mt-1 text-2xl font-black text-gray-900">
                Account
              </h2>

              <div className="mt-6 space-y-4">

                {/* Email */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-gray-50
                    p-4
                  "
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                    {profile.email || "Not provided"}
                  </p>
                </div>

                {/* Password */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-gray-50
                    p-4
                  "
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Password
                  </p>

                  <p className="mt-1 text-lg font-black tracking-[4px] text-gray-800">
                    ••••••••
                  </p>
                </div>

              </div>

              <button
                onClick={() => toast.info("Password change feature coming soon.")}
                className="
                  mt-5
                  w-full
                  rounded-xl
                  border
                  border-blue-200
                  bg-blue-50
                  px-5
                  py-3
                  font-semibold
                  text-blue-600
                  transition
                  hover:bg-blue-100
                "
              >
                Change Password
              </button>

            </div>

            {/* Account Status */}
            <div
              className="
                rounded-3xl
                border
                border-blue-100
                bg-gradient-to-br
                from-blue-50
                to-white
                p-6
              "
            >

              <p className="text-sm font-semibold uppercase tracking-[2px] text-blue-600">
                Account Status
              </p>

              <div className="mt-5 flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />

                <p className="font-bold text-gray-900">
                  Active Account
                </p>

              </div>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Your Toolhub account is active and ready to use all available
                tools.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;

