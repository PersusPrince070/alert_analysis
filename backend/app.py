from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

@app.post("/chat/")
async def chat(reqeust: Request):
    body = await reqeust.json()

    query = body['query']
    messages = [{
        "role": "user",
        "content": "You need to explain what the sentence below means. Explanations should be concise and easy for the general public to understand."
    }]
    
    if query:
        messages.append(
            {
                "role": "user",
                "content": query
            }
        )
        
        print(messages)

        chat_completion = client.chat.completions.create(
            messages=messages,
            model="gpt-4",
        )
    if chat_completion:
        reply = chat_completion.choices[0].message.content

    print(f"ChatGPT: { reply }")
    
    return { "message": reply }