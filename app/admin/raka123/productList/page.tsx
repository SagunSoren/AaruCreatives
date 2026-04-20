"use client";

import BlogTableItem from "@/myComponents/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("/api/product");
    setProducts(response.data.products);
  };

  const deleteProduct = async (mongoId) => {
    const response = await axios.delete(`/api/product`, {
      params: {
        id: mongoId,
      },
    });
    toast.success(response.data.msg);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="mb-4">All Products</h1>
      <div className="w-full overflow-x-hidden">
        <table className="w-full text-sm text-gray-500">
          <thead className="items-center gap-3 flex">
            <td className="px-6 py-4 w-20 ">Name</td>
            <td className="py-4 w-20 ">Price</td>
            <td className=" py-4 cursor-pointer ">Action</td>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <BlogTableItem
                  key={index}
                  mongoId={item?._id}
                  title={item?.title}
                  price={item?.price}
                  deleteProduct={deleteProduct}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default page;
