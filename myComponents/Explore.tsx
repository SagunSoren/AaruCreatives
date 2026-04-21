"use client";
import { useEffect, useState } from "react";
import ImageCard from "./Cards/ImageCard";
// import { handmadeItems } from "@/db/data.js";
import { categories } from "@/db/data.js";
import axios from "axios";

const Explore = () => {
  // const allItems = handmadeItems;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get("/api/product");
    setProducts(response.data.products);
    // console.log(response.data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. New State for Category
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 2. Filter logic: Filter items based on category FIRST
  const filteredItems =
    selectedCategory === "all"
      ? products
      : products.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  // 3. Pagination Logic: Use filteredItems instead of allItems
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 4. Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes!
  };

  // const categories = ["all", "hairpins", "scrunchies", "giftables"];

  return (
    <div className="bg-[#faf6f1]">
      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-2  mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-6 py-2 rounded-full border transition-all uppercase text-xs tracking-widest ${
              selectedCategory === cat
                ? "bg-[#b97358] text-white border-[#b97358]/40"
                : "bg-white text-gray-600 border-[#b97358]/40 hover:border-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="px-4 text-[#ba765a]">
        <p>Showing {filteredItems.length} Products</p>
      </div>
      {/* Grid Displaying Current Items
      <div className="grid  grid-cols-2 gap-2 max-lg:px-2 px-10 min-h-[400px]">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <ImageCard key={index} data={item} />
          ))
        ) : (
          <div className="col-span-4 text-center py-20 text-gray-400">
            No items found in this category.
          </div>
        )}
      </div> */}
      <div className="grid grid-cols-2 gap-2 max-lg:px-2 px-10 min-h-[400px]">
        {loading ? (
          // 1. WHAT TO SHOW WHILE WAITING
          <div className="col-span-2 flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b97358]"></div>
          </div>
        ) : currentItems.length > 0 ? (
          // 2. SHOW DATA
          currentItems.map((item, index) => (
            <ImageCard key={index} data={item} />
          ))
        ) : (
          // 3. SHOW EMPTY STATE (Only after loading is finished)
          <div className="col-span-2 text-center py-20 text-gray-400">
            No items found in this category.
          </div>
        )}
      </div>

      {/* Pagination Controls - Only show if there is more than 1 page */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-30 border-[#b97358]/40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border rounded border-[#b97358]/40 ${
                currentPage === i + 1 ? "bg-[#b97358] text-white " : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-30 border-[#b97358]/40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
