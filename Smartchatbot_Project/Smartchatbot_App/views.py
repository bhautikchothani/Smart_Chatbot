from django.shortcuts import render
from django.http import JsonResponse
from .forms import MessageForm
import httpx
import json


async def call_fastapi(message):    
    async with httpx.AsyncClient() as client:
        url = "http://localhost:8050/chat/completions/"
        json_data = {"message": message}
        response = await client.post(url, json=json_data)
        return response.json()


async def handle_chat_completions(request):
    if request.method == "POST":
        message = request.POST.get("message")
        if message:
            try:
                completion_response = await call_fastapi(message)
                completion = completion_response.get("completion")
                if completion:
                    return JsonResponse({"completion": completion})
                else:
                    return JsonResponse({"error": "No completion found"})
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=500)
        else:
            return JsonResponse({"error": "Message field is required"}, status=400)
    else:
        form = MessageForm()
        return render(request, "index.html", {"form": form})