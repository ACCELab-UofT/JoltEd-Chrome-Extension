from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from pydantic import BaseModel

# from dotenv import load_dotenv
# load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",  # Your frontend server origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allowing all methods
    allow_headers=["*"],
)

class Data(BaseModel):
    prompt: str

@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI!"}

OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@app.post("/ask-gpt")
async def ask_gpt(prompt: Data):
    # Prepare the data for the OpenAI API request
    request_data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt.prompt},
        ],
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}",
    }

    try:
        # Make the request to the OpenAI API
        response = requests.post(OPENAI_API_ENDPOINT, json=request_data, headers=headers)

        # Check if the request was successful
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch from OpenAI API")

        # Parse the response
        response_data = response.json()
        message = response_data["choices"][0]["message"]["content"]

        return {"message": message}

    except Exception as e:
        # Handle errors
        raise HTTPException(status_code=500, detail=f"Error with OpenAI API call: {str(e)}")
