import express from 'express';
import { fal } from "@fal-ai/client";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Configureer fal
fal.config({
  credentials: process.env.FAL_KEY
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Fal.ai service is running',
    timestamp: new Date().toISOString()
  });
});

// Video generatie endpoint
app.post('/generate', async (req, res) => {
  try {
    console.log("Starting video generation...");
    
    const result = await fal.subscribe("fal-ai/veo3", {
      input: {
        prompt: "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model? It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good."
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log('Progress:', update.logs?.map(log => log.message).join('\n'));
        }
      }
    });
    
    console.log("=== RESULT ===");
    console.log(result.data);
    console.log("=== REQUEST ID ===");
    console.log(result.requestId);
    
    res.json({
      success: true,
      data: result.data,
      requestId: result.requestId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
