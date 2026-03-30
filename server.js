import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY;

// 🤖 AI SUMMARY
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data.error });
    }

    const content =
      data[0]?.summary_text || data[0]?.generated_text || "No summary";

    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// 🧠 FAKE NEWS DETECTION
app.post("/detect-fake-news", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/mrm8488/bert-tiny-finetuned-fake-news-detection",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      },
    );

    const data = await response.json();
    console.log("HF RESPONSE:", data);
    

    if (!response.ok) {
      return res.status(400).json({ error: data.error });
    }

    if (Array.isArray(data)) {
      res.json(data);
    } else {
      res.json([data]); // force array
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
