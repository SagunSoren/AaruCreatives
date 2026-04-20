import Sidebar from "@/myComponents/AdminComponents/Sidebar";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark" />
        <Sidebar />
        <div className="flex flex-col w-full items-center">
          <h3 className="mb-20">Admin Panel</h3>
          {children}
        </div>
      </div>
    </>
  );
}
