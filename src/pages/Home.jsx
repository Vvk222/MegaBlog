import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) {
        const allPosts = res.documents;

        setPosts(allPosts);

        // 🔥 TRENDING LOGIC
        const trending = [...allPosts]
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .slice(0, 3);

        setTrendingPosts(trending);
      }
    });
  }, []);

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Container>

        {/* 🔥 TRENDING SECTION */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            🔥 Trending Posts
          </h2>

          {trendingPosts.length === 0 ? (
            <p className="text-gray-500">No trending posts yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </div>

        {/* 📝 ALL POSTS */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            All Posts
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </div>

      </Container>
    </div>
  );
}

export default Home;