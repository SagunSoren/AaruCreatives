"use client";
import Image from "next/image";
import BlogTableItem from "@/myComponents/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const page = () => {
  // add product logic
  const [image, setImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); // ✅ fix memory leak
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    price: "",
    quantity: null,
    category: "Hair Clips",
  });

  // ✅ search & filter state
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // ✅ create/revoke object URL properly
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/product", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({ title: "", price: "", quantity: "", category: "Hair Clips" });
        fetchProducts();
      } else {
        toast.error("Upload failed on server");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error or file too large");
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // product list logic
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("/api/product");
    setProducts(response.data.products);
  };

  const deleteProduct = async (mongoId) => {
    const response = await axios.delete(`/api/product`, {
      params: { id: mongoId },
    });
    toast.success(response.data.msg);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ filtered products derived from search + category
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 p-4">Stock Manager</h1>

      {/* ✅ Search bar + Category filter */}
      <div className="flex flex-col sm:flex-row gap-3 px-4 mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded-md outline-[#b97358]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded-md bg-white outline-[#b97358]"
        >
          <option value="All">All Categories</option>
          <option value="Hair Clips">Hair Clips</option>
          <option value="Accessories">Accessories</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* ✅ Result count */}
      <p className="text-sm text-gray-400 px-4 mb-2">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
      </p>

      <div className="w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <BlogTableItem
              key={item?._id}
              data={item}
              deleteProduct={deleteProduct}
              fetchProducts={fetchProducts}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10">No products found.</p>
        )}
      </div>

      <div>
        {/* Add New Item Drawer */}
        <Drawer>
  <DrawerTrigger>
    <div className="bg-black text-white w-16 h-16 rounded-full items-center flex justify-center text-3xl fixed bottom-10 right-10">
      +
    </div>
  </DrawerTrigger>
  <DrawerContent>
    {/* ✅ Constrain height and make it scrollable on small screens */}
    <div className="overflow-y-auto max-h-[85vh]">
      <DrawerHeader>
        <DrawerTitle>Add Product</DrawerTitle>
        <DrawerDescription asChild>
          <div> {/* ✅ avoids <form> nested in <p> warning */}
            <form onSubmit={onSubmitHandler}>
              <div className="flex justify-center">
                <label
                  htmlFor="image"
                  className="mt-4 bg-gray-100 border-2 border-dashed border-gray-300 w-40 h-40 flex items-center justify-center cursor-pointer overflow-hidden rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Image
                    src={previewUrl || "/assets/upload.jpg"}
                    width={100}
                    height={100}
                    alt="preview"
                    className="object-cover h-full w-full"
                  />
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  accept="image/*"
                  required
                  hidden
                />
              </div>

              <div>
                <div className="flex flex-col gap-1 mt-5">
                  <p className="text-left text-black">Product Name</p>
                  <input
                    name="title"
                    onChange={onChangeHandler}
                    value={data.title}
                    type="text"
                    placeholder="Type here"
                    className="border p-2 rounded-md outline-[#b97358]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mt-5">
                  <p className="text-left text-black">Price</p>
                  <input
                    name="price"
                    onChange={onChangeHandler}
                    value={data.price}
                    type="number"
                    placeholder="0.00"
                    className="border p-2 rounded-md outline-[#b97358]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mt-5">
                  <p className="text-left text-black">Starting Quantity</p>
                  <input
                    name="quantity"
                    onChange={onChangeHandler}
                    value={data.quantity}
                    type="number"
                    placeholder="0"
                    className="border p-2 rounded-md outline-[#b97358]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 mt-5">
                  <p className=" text-black text-left">Category</p>
                  <select
                    name="category"
                    className="border p-2 rounded-md outline-[#b97358] bg-white"
                    onChange={onChangeHandler}
                    value={data.category}
                  >
                    <option value="Hair Clips">Hair Clips</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-8 w-full py-3 rounded-xl font-semibold text-white transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {loading ? "Uploading..." : "Add Product"}
              </button>

              {/* ✅ Cancel moved inside the scroll area so it's always reachable */}
              <DrawerClose asChild>
                <button
                  type="button"
                  className="mt-3 mb-6 w-full py-3 rounded-xl font-semibold text-gray-400 underline underline-offset-2"
                >
                  Cancel
                </button>
              </DrawerClose>
            </form>
          </div>
        </DrawerDescription>
      </DrawerHeader>
    </div>
  </DrawerContent>
</Drawer>
      </div>
    </div>
  );
};

export default page;