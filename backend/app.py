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
        "content": "Be sure to explain what Alert means in every sentence below. All explanatory statements must be concise and easy for the general public to understand, and must explain causes and reasons in great detail and at length and in rich detail.The minimum number of tokens in a sentence must be more than 200."
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
    # while True:
    #     body = 'a'
    
    return { "message": reply }

@app.post("/report/")
async def chat(reqeust: Request):
    body = await reqeust.json()

    query = body['query']
    messages = [{
        "role": "user",
        "content": "You must create a report document for the Alert using all the sentences that follow. The total number of tokens in the document should be at least 600 and maximum 1000, and the format and systemization of the document should be well realized."
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