import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100">
      <div className="w-28 h-[100vh] relative border border-black">
        <Link
          href={"/admin/raka123/addProduct"}
          className="flex items-center mt-10 text-center border-2 border-black gap-3 py-4"
        >
          <p>Add Products</p>
        </Link>
        <Link href={"/admin/raka123/productList"}>
          <div className="  mt-5 text-center  border-2 border-black gap-3 py-4">
            <p>Product List</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;
