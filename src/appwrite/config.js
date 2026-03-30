import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // 🔥 CREATE POST
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          likes: 0,
          likedBy: [],
        }
      );
    } catch (error) {
      console.log("createPost error", error);
    }
  }

  // 🔥 UPDATE POST
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("updatePost error", error);
    }
  }

  // 🔥 DELETE POST
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletePost error", error);
      return false;
    }
  }

  // 🔥 GET SINGLE POST
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost error", error);
      return null;
    }
  }

  // 🔥 GET ALL POSTS
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("getPosts error", error);
      return false;
    }
  }

  // 🔥 UPLOAD FILE
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("uploadFile error", error);
      return false;
    }
  }

  // 🔥 DELETE FILE
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deleteFile error", error);
      return false;
    }
  }

  // 🔥 FILE VIEW (FIXED)
  getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

  // ❤️ LIKE SYSTEM
  async likePost(postId, userId, currentLikes, likedBy = []) {
    try {
      if ((likedBy || []).includes(userId)) {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          postId,
          {
            likes: currentLikes - 1,
            likedBy: likedBy.filter((id) => id !== userId),
          }
        );
      } else {
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          postId,
          {
            likes: currentLikes + 1,
            likedBy: [...likedBy, userId],
          }
        );
      }
    } catch (error) {
      console.log("likePost error", error);
    }
  }

  // 💬 ADD COMMENT
  async addComment({ content, postId, userId, userName }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        "comments",
        ID.unique(),
        {
          content,
          postId,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.log("addComment error", error);
    }
  }

  // 💬 GET COMMENTS
  async getComments(postId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        "comments",
        [Query.equal("postId", postId)]
      );
    } catch (error) {
      console.log("getComments error", error);
    }
  }

  // 💬 DELETE COMMENT
  async deleteComment(commentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        "comments",
        commentId
      );
      return true;
    } catch (error) {
      console.log("deleteComment error", error);
      return false;
    }
  }
}

const service = new Service();
export default service;