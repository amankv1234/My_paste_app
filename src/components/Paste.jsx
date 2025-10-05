import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import {
  Edit,
  Eye,
  Trash2,
  Copy,
  Share2,
  Calendar,
  Search,
} from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Deleted successfully");
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10 px-4">
      {/* Search Bar */}
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="search"
          placeholder="Search your paste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white text-gray-700"
        />
      </div>

      {/* Paste Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {paste.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {paste.content}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4 text-gray-500">
                <div className="flex gap-3">
                  <a href={`/?pasteId=${paste?._id}`}>
                    <Edit
                      size={20}
                      className="hover:text-indigo-500 cursor-pointer transition"
                      title="Edit"
                    />
                  </a>
                  <a href={`/pastes/${paste?._id}`}>
                    <Eye
                      size={20}
                      className="hover:text-indigo-500 cursor-pointer transition"
                      title="View"
                    />
                  </a>
                  <Trash2
                    size={20}
                    onClick={() => handleDelete(paste._id)}
                    className="hover:text-red-500 cursor-pointer transition"
                    title="Delete"
                  />
                  <Copy
                    size={20}
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="hover:text-green-500 cursor-pointer transition"
                    title="Copy"
                  />
                  <Share2
                    size={20}
                    onClick={() => {
                      navigator.share({
                        text: paste?.content,
                      });
                      toast.success("Shared successfully!");
                    }}
                    className="hover:text-blue-500 cursor-pointer transition"
                    title="Share"
                  />
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={14} />
                  {paste.createdAt}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full mt-10">
            No pastes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
