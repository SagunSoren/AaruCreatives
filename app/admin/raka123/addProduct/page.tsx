"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    price: "",
    category: "Hair Clips",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);
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
      toast.error("error");
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="pt-12 px-16">
        <p className="text-xl">Upload Image</p>
        <label
          htmlFor="image"
          className="bg-gray-200 w-50 h-50 flex items-center justify-center"
        >
          <Image
            src={!image ? "/assets/upload.jpg" : URL.createObjectURL(image)}
            width={120}
            height={300}
            alt="upload image here"
            loading="eager"
          ></Image>
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          required
          hidden
        />
        <p className="mt-5">Product Name</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          type="text"
          placeholder="Type here"
          className="border p-2"
          required
        />
        <p className="mt-5">Price</p>
        <input
          name="price"
          onChange={onChangeHandler}
          value={data.price}
          type="text"
          placeholder="Write without Rs"
          className="border p-2"
          required
        />
        <p className="mt-10">Category</p>
        <select
          name="category"
          className=""
          onChange={onChangeHandler}
          value={data.category}
        >
          <option value="Hair Clips">Hair Clips</option>
          <option value="Accessories">Accessories</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Others">Others</option>
        </select>
        <br />
        <button type="submit" className="mt-8 bg-black text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};
export default page;
