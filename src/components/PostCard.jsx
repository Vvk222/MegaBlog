import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card hover:shadow-xl hover:-translate-y-1 cursor-pointer">

        <div className="overflow-hidden rounded-xl">
          <img
            src={
              featuredImage
                ? appwriteService.getFileView(featuredImage)
                : "https://via.placeholder.com/400x200"
            }
            alt={title}
            className="w-full h-48 object-cover hover:scale-110 transition"
          />
        </div>

        <div className="mt-3">
          <h2 className="font-bold text-lg">{title}</h2>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
            {content?.replace(/<[^>]+>/g, "").slice(0, 100)}...
          </p>

          <span className="text-blue-600 text-sm mt-2 inline-block">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;