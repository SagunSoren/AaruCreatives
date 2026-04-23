import Sidebar from "@/myComponents/AdminComponents/Sidebar";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <div>
        <ToastContainer theme="dark" />

        <div>{children}</div>
      </div>
    </>
  );
}
