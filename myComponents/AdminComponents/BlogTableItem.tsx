import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GoPencil } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const BlogTableItem = ({ data, deleteProduct, fetchProducts }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // ✅ Fix 1: track preview separately

  const [editData, setEditData] = useState({
    title: data.title,
    price: data.price,
    quantity: data.quantity,
    category: data.category,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Fix 1: Create and revoke object URL properly
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url); // cleanup on unmount or image change
  }, [image]);

  useEffect(() => {
    if (isDrawerOpen) {
      setEditData({
        title: data.title,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
      });
      setImage(null);
      setPreviewUrl(null);
    }
  }, [isDrawerOpen, data]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", editData.title);
      form.append("price", editData.price);
      form.append("quantity", editData.quantity);
      form.append("category", editData.category);
      if (image) form.append("image", image);

      // ✅ Fix 3: explicitly set multipart header for FormData
      const response = await axios.put(`/api/product`, form, {
        params: { id: data._id },
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.msg);
      setIsDrawerOpen(false);
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ Fix 2: Drawer lifted OUTSIDE DropdownMenu to avoid portal/focus conflicts
    <>
      <div className="border-b w-full p-2 flex items-center justify-between">
        <div className="relative w-20 h-20">
          <Image src={data.image} alt={"image"} fill className="object-cover rounded" sizes="80px" />
        </div>
        <div>
          <p className="text-sm font-medium max-w-30">{data.title}</p>
          <p className="text-sm text-gray-500 mt-1">₹ {data.price}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-red-500 font-bold">{data.quantity}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost"><BsThreeDotsVertical /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDrawerOpen(true); // ✅ Fix 2: just open drawer via state
                }}
              >
                <GoPencil className="mr-2" /> Edit details
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => deleteProduct(data._id)}
              >
                <RiDeleteBinLine className="mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ✅ Fix 2: Drawer rendered outside DropdownMenu */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>Edit Product</DrawerTitle>
              <DrawerDescription>Update your product details below.</DrawerDescription>
            </DrawerHeader>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex justify-center">
                <label htmlFor={`image-${data._id}`} className="cursor-pointer">
                  <div className="w-32 h-32 border-2 border-dashed flex items-center justify-center rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl || data.image} // ✅ Fix 1: use previewUrl state
                      width={128}
                      height={128}
                      alt="preview"
                      className="object-cover h-full w-full"
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id={`image-${data._id}`}
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Product Name</p>
                <input
                  name="title"
                  value={editData.title}
                  onChange={onChangeHandler}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Price</p>
                  <input
                    name="price"
                    type="number"
                    value={editData.price}
                    onChange={onChangeHandler}
                    className="w-full border p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Quantity</p>
                  <input
                    name="quantity"
                    type="number"
                    value={editData.quantity}
                    onChange={onChangeHandler}
                    className="w-full border p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Category</p>
                <select
                  name="category"
                  value={editData.category}
                  onChange={onChangeHandler}
                  className="w-full border p-2 rounded-md bg-white"
                >
                  <option value="Hair Clips">Hair Clips</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bracelets">Bracelets</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1">Cancel</Button>
                </DrawerClose>
              </div>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BlogTableItem;