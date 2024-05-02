import uvicorn
from fastapi import FastAPI
from together import Together
from dotenv import load_dotenv
import os

load_dotenv()

client = Together(api_key=os.environ.get("TOGETHER_API_KEY"))

app = FastAPI()

from fastapi.responses import JSONResponse
from fastapi import Request


@app.post("/chat/completions/")
async def chat_completions(request: Request):
    data = await request.json()
    message = data.get("message")
    if message:
        response = client.chat.completions.create(
            model="meta-llama/Llama-3-8b-chat-hf",
            messages=[{"role": "user", "content": message}],
        )
        return JSONResponse(content={"completion": response.choices[0].message.content})
    else:
        return JSONResponse(
            content={"error": "Message field is required"}, status_code=400
        )


if __name__== "_main_":

    uvicorn.run(app, host="0.0.0.0", port=8050)