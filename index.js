import { fal } from "@fal-ai/client";

// Configureer API key
fal.config({
  credentials: process.env.FAL_KEY
});

async function runFal() {
  try {
    const result = await fal.subscribe("fal-ai/veo3", {
      input: {
        prompt: "A casual street interview on a busy New York City sidewalk in the afternoon. The interviewer holds a plain, unbranded microphone and asks: Have you seen Google's new Veo3 model? It is a super good model. Person replies: Yeah I saw it, it's already available on fal. It's crazy good."
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      }
    });
    
    console.log(result.data);
    console.log(result.requestId);
  } catch (error) {
    console.error("Error:", error);
  }
}

runFal();
