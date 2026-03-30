import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Container>

        <h1 className="text-3xl font-bold mb-8">All Posts 📰</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">No posts yet</h2>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}

      </Container>
    </div>
  );
}

export default AllPosts;