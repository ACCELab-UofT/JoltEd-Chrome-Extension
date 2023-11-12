from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
import openai
from pydantic import BaseModel

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
async def ask_gpt(req: Data):
    # TODO: add some sort of type checking on prompt. Does it exist?
    return StreamingResponse(get_openai_generator(req.prompt), media_type='text/event-stream')


def get_openai_generator(prompt: str):
    openai_stream = openai.ChatCompletion.create(
        model='gpt-4',
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        temperature=0,
        stream=True
    )

    for event in openai_stream:
        if "content" in event["choices"][0].delta:
            current_response = event["choices"][0].delta.content
            yield current_response
