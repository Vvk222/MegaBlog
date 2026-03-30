import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else navigate("/");
  }, [slug]);

  if (!post) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Container>

        <h1 className="text-3xl font-bold mb-6">Edit Post ✏️</h1>

        <div className="card">
          <PostForm post={post} />
        </div>

      </Container>
    </div>
  );
}

export default EditPost;