import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Copy, Share2, Calendar } from "lucide-react";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Paste not found 😔
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 py-10">
      {/* Card container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl">
        {/* Title section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full sm:w-3/4 text-xl font-semibold text-gray-800 bg-gray-100 px-4 py-2 rounded-xl focus:outline-none cursor-not-allowed"
          />
          <div className="flex items-center gap-3">
            <Copy
              size={22}
              className="text-gray-500 hover:text-green-500 cursor-pointer transition"
              title="Copy content"
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to clipboard!");
              }}
            />
            <Share2
              size={22}
              className="text-gray-500 hover:text-blue-500 cursor-pointer transition"
              title="Share paste"
              onClick={() => {
                navigator.share({
                  text: paste.content,
                });
                toast.success("Shared successfully!");
              }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="mt-6">
          <textarea
            value={paste.content}
            disabled
            rows={15}
            className="w-full bg-gray-100 rounded-xl p-4 text-gray-700 font-mono resize-none cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center mt-4 text-gray-400 text-sm gap-1">
          <Calendar size={14} />
          <span>{paste.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
