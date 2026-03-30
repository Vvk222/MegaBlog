import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* 🔥 HERO */}
      <div className="py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold">
            AI Powered Blogging 🚀
          </h1>
          <p className="mt-4 text-gray-200">
            Write smarter. Read faster. Detect fake news instantly.
          </p>
        </Container>
      </div>

      {/* POSTS */}
      <div className="py-10">
        <Container>

          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}

        </Container>
      </div>

    </div>
  );
}

export default Home;