from django.urls import path
from Smartchatbot_App import views

urlpatterns = [
    # path("", views.chat_completions, name="chat_completions"),
    # path("index/", views.index, name="index"),
    # path("", views.handle_chat_completions, name="chat_completions"),
    path("chat/completions/", views.handle_chat_completions, name="chat_completions"),
]