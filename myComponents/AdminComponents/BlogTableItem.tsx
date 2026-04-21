const BlogTableItem = ({ title, price, deleteProduct, mongoId }) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 flex font-medium text-gray-900"
      >
        <td className="py-4 w-20">{title ? title : "no title"}</td>
        <td className=" py-4 w-20">₹ {price ? price : "no price"}</td>
        <td
          className="px-6 py-4 cursor-pointer"
          onClick={() => deleteProduct(mongoId)}
        >
          x
        </td>
      </th>
    </tr>
  );
};
export default BlogTableItem;
