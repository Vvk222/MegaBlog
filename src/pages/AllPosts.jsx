import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Select } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Container>

        {/* 🔥 HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Posts</h1>

          <div className="flex flex-col md:flex-row gap-4">

            {/* 🔍 SEARCH WITH ICON */}
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 🧠 FILTER */}
            <Select
              options={["all", "active", "inactive"]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>

        {/* 📭 EMPTY */}
        {filteredPosts.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No posts found 😕
          </p>
        )}

        {/* 📦 POSTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>

      </Container>
    </div>
  );
}

export default AllPosts;