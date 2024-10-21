import requests
import pandas as pd
import streamlit as st
from langchain_experimental.agents import create_pandas_dataframe_agent
from langchain_ollama import ChatOllama
import io

GET_ALL_CHATS_URL = "http://localhost:9001/api/user/{user_id}/chats"

def show_page():
    # Initialize session state variables
    if "logged_in" not in st.session_state or not st.session_state.logged_in:
        st.error("Please log in to use this feature.")
        return

    user_id = st.session_state.current_user_id
    auth_token = st.session_state.auth_token

    st.title("🤖 DataFrame ChatBot - Ollama")

    # Fetch and display chat history
    headers = {"Authorization": f"Bearer {auth_token}"}
    try:
        response = requests.get(GET_ALL_CHATS_URL.format(user_id=user_id), headers=headers)
        if response.status_code == 200:
            chats = response.json().get("chats", [])
            if chats:
                st.subheader("Chat History")
                for chat in chats:
                    chat_title = chat.get("chatData", "New Chat")
                    st.write(f"📝 {chat_title}")
            else:
                st.write("No chats available.")
        else:
            st.error(f"Error loading chat history: {response.status_code}")

    except Exception as e:
        st.error(f"An error occurred while fetching chats: {str(e)}")

# Call show_page() when the script runs
if __name__ == "__main__":
    show_page()
