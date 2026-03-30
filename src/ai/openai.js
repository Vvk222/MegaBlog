// 🤖 AI Summary
export const generateBlog = async (topic) => {
  try {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: topic }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return data.content;

  } catch (error) {
    console.error(error);
    return "Error generating blog";
  }
};

// 🧠 Fake News Detection
export const detectFakeNews = async (text) => {
  try {
    const res = await fetch("http://localhost:5000/detect-fake-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    return data;

  } catch (error) {
    console.error(error);
    return null;
  }
};