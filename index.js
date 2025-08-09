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
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required',
        timestamp: new Date().toISOString()
      });
    }
    
    console.log("Starting video generation with prompt:", prompt);
    
    const result = await fal.subscribe("fal-ai/veo3", {
      input: {
        prompt: prompt
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
