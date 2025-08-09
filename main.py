from fastapi import FastAPI
import fal_client
import os

app = FastAPI()

# Configureer fal client
fal_client.api_key = os.getenv("FAL_KEY")

@app.get("/")
def read_root():
    return {"message": "Fal.ai service is running"}

@app.post("/generate")
def generate_image(prompt: str):
    try:
        # Voorbeeld: tekst naar afbeelding
        result = fal_client.submit(
            "fal-ai/stable-diffusion-v35-large",
            arguments={"prompt": prompt}
        )
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}
