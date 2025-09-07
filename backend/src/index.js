import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import axios from "axios";
import { searchImages } from "./controllers/searchController.js";
import { submitContactForm } from "./controllers/contactController.js";

const app = express();
app.use(cors());
app.use(compression()); // Compress responses
app.use(bodyParser.json({ limit: '10mb' })); // Increase payload limit

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.post("/api/search", searchImages);
app.post("/api/contact", submitContactForm);

// Proxy download endpoint to handle CORS
app.get("/api/download", async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL required" });
    }

    console.log('Downloading image from:', imageUrl);

    const response = await axios.get(imageUrl, {
      responseType: 'stream',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*',
        'Referer': 'https://www.google.com/'
      },
      maxRedirects: 5
    });

    // Set appropriate headers
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="image-${Date.now()}.jpg"`);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('Streaming image with content-type:', contentType);

    // Handle stream events
    let downloaded = 0;
    response.data.on('data', (chunk) => {
      downloaded += chunk.length;
    });

    response.data.on('end', () => {
      console.log(`Download completed: ${downloaded} bytes`);
    });

    response.data.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Stream error" });
      }
    });

    // Pipe the image stream to response
    response.data.pipe(res);

  } catch (error) {
    console.error('Proxy download error:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Download failed: " + error.message });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));