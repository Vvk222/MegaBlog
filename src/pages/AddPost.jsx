import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-gray-900">
      <Container>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Post ✍️</h1>
          <p className="text-gray-500 mt-1">
            Share your thoughts with the world
          </p>
        </div>

        <div className="card">
          <PostForm />
        </div>

      </Container>
    </div>
  );
}

export default AddPost;