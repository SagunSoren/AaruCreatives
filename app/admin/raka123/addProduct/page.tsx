"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false); // New Loading State
  const [data, setData] = useState({
    title: "",
    price: "",
    category: "Hair Clips",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start Loading

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/product", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          price: "",
          category: "Hair Clips",
        });
      } else {
        toast.error("Upload failed on server");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error or file too large");
    } finally {
      setLoading(false); // Stop Loading regardless of success/fail
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="pt-12 px-16 max-w-[600px]">
        <p className="text-xl font-medium">Upload Image</p>

        <label
          htmlFor="image"
          className="mt-4 bg-gray-100 border-2 border-dashed border-gray-300 w-40 h-40 flex items-center justify-center cursor-pointer overflow-hidden rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Image
            // Use local placeholder or the preview of the selected file
            src={!image ? "/assets/upload.jpg" : URL.createObjectURL(image)}
            width={160}
            height={160}
            alt="preview"
            className="object-cover h-full w-full"
          />
        </label>

        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*" // Restricts file picker to images only
          required
          hidden
        />

        <div className="flex flex-col gap-1 mt-5">
          <p className="">Product Name</p>
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
          <p className="">Price</p>
          <input
            name="price"
            onChange={onChangeHandler}
            value={data.price}
            type="number" // Changed to number type
            placeholder="0.00"
            className="border p-2 rounded-md outline-[#b97358]"
            required
          />
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <p className="">Category</p>
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

        <button
          type="submit"
          disabled={loading} // Disable button while uploading
          className={`mt-8 w-full sm:w-40 py-3 rounded-xl font-semibold text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Page;
