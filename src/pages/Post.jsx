import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container, Input } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { generateBlog, detectFakeNews } from "../ai/openai";

export default function Post() {
  const [post, setPost] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [newsResult, setNewsResult] = useState(null);
  const [checking, setChecking] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // 🔄 Fetch Post
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLikes(post.likes || 0);
          setLiked(post.likedBy?.includes(userData?.$id));
        } else navigate("/");
      });
    }
  }, [slug, userData]);

  // 💬 Fetch Comments
  useEffect(() => {
    if (post) {
      appwriteService.getComments(post.$id).then((res) => {
        if (res) setComments(res.documents);
      });
    }
  }, [post]);

  // 🤖 AI Summary
  const generateSummary = async () => {
    setLoadingSummary(true);
    const result = await generateBlog(post.content);
    setSummary(result);
    setLoadingSummary(false);
  };

  // ❤️ Like
  const handleLike = async () => {
    const updated = await appwriteService.likePost(
      post.$id,
      userData.$id,
      likes,
      post.likedBy || [],
    );

    setPost(updated);
    setLikes(updated.likes);
    setLiked(updated.likedBy.includes(userData.$id));
  };

  // 💬 Add Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment = await appwriteService.addComment({
      content: newComment,
      postId: post.$id,
      userId: userData.$id,
      userName: userData.name,
    });

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  // ❌ Delete Comment
  const handleDeleteComment = async (id) => {
    await appwriteService.deleteComment(id);
    setComments((prev) => prev.filter((c) => c.$id !== id));
  };

  // 🧠 Fake News
  const checkFakeNews = async () => {
    setChecking(true);
    const result = await detectFakeNews(post.content);
    setNewsResult(result);
    setChecking(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 🧠 Best Result
  let best = null;

  if (newsResult) {
    // 🔥 flatten response
    const data = Array.isArray(newsResult[0]) ? newsResult[0] : newsResult;

    if (data.length > 0) {
      best = data.reduce((prev, curr) =>
        curr.score > prev.score ? curr : prev,
      );
    }
  }

  const labelMap = {
    LABEL_0: "REAL ✅",
    LABEL_1: "FAKE ❌",
  };

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Container>
        {/* 🔥 HERO */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img
            src={
              post.featuredImage
                ? appwriteService.getFileView(post.featuredImage)
                : "https://via.placeholder.com/800x400"
            }
            className="w-full h-72 md:h-96 object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              {post.title}
            </h1>
            <p className="text-gray-300 mt-2">
              By {userData?.name || "Author"}
            </p>
          </div>
        </div>

        {/* ⚡ ACTION BAR */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <button
            onClick={handleLike}
            className={`px-4 py-2 rounded-xl text-white transition ${
              liked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>

          <span className="text-gray-600 dark:text-gray-300">
            {likes} Likes
          </span>

          <Button onClick={generateSummary}>
            {loadingSummary ? "Generating..." : "AI Summary"}
          </Button>

          <Button variant="secondary" onClick={checkFakeNews}>
            {checking ? "Checking..." : "Fake News Check"}
          </Button>
        </div>

        {/* 🤖 SUMMARY */}
        {summary && (
          <div className="card mb-6">
            <h3 className="font-semibold mb-2">AI Summary</h3>
            <p className="text-gray-700 dark:text-gray-300">{summary}</p>
          </div>
        )}

        {/* 🧠 FAKE NEWS */}
        {best && (
          <div
            className={`p-4 rounded-xl mb-6 shadow ${
              best.label === "LABEL_1"
                ? "bg-red-100 dark:bg-red-900"
                : "bg-green-100 dark:bg-green-900"
            }`}
          >
            <p className="font-bold text-lg">{labelMap[best.label]}</p>

            <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
              <div
                className={`h-3 rounded-full ${
                  best.label === "LABEL_1" ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${(best.score * 100).toFixed(0)}%` }}
              />
            </div>

            <p className="text-sm mt-2">
              Confidence: {best?.score ? (best.score * 100).toFixed(2) : "0"}%
            </p>
          </div>
        )}

        {/* 📄 CONTENT */}
        <div className="card leading-relaxed mb-8">{parse(post.content)}</div>

        {/* 💬 COMMENTS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Comments</h2>

          <div className="flex gap-2 mb-4">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />

            <Button onClick={handleAddComment}>Post</Button>
          </div>

          {comments.map((c) => (
            <div key={c.$id} className="card mb-3">
              <div className="flex justify-between">
                <b>{c.userName}</b>

                {userData?.$id === c.userId && (
                  <button
                    onClick={() => handleDeleteComment(c.$id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="mt-1 text-gray-700 dark:text-gray-300">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
