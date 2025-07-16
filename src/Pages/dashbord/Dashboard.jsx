// Updated Dashboard.jsx
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Common/SidebarMenu";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Toggle button for small screens */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 left-4 z-30 text-white text-3xl md:hidden"
      >
        <IoMdMenu />
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
