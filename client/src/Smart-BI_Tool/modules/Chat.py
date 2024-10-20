import requests
import pandas as pd
import streamlit as st
from langchain_experimental.agents import create_pandas_dataframe_agent
from langchain_ollama import ChatOllama


CREATE_CHAT_URL = "http://localhost:9001/api/user/{user_id}/csv/{csv_id}/chat"
GET_ALL_CHATS_URL = "http://localhost:9001/api/user/{user_id}/chats"
NEW_CHAT_URL = "http://localhost:9001/api/user/{user_id}/csv/{csv_id}/chat/new"
UPLOAD_URL = "http://localhost:9001/api/user/{user_id}/upload-csv"

def show_page():
    def read_data(file):
        if file.name.endswith(".csv"):
            return pd.read_csv(file, encoding='ISO-8859-1')
        else:
            return pd.read_excel(file)

    st.title("🤖 DataFrame ChatBot - Ollama")

   
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []
    if "df" not in st.session_state:
        st.session_state.df = None
    if "csv_uploaded" not in st.session_state:
        st.session_state.csv_uploaded = False
    if "csv_id" not in st.session_state:
        st.session_state.csv_id = None
    if "selected_chat" not in st.session_state:
        st.session_state.selected_chat = None
    if "current_messages" not in st.session_state:
        st.session_state.current_messages = []

    if not st.session_state.get("logged_in", False):
        st.error("Please log in to use this feature.")
        return

    user_id = st.session_state.current_user_id
    auth_token = st.session_state.auth_token

    def reset_chat_state():
        st.session_state.selected_chat = None
        st.session_state.df = None
        st.session_state.csv_uploaded = False
        st.session_state.csv_id = None
        st.session_state.current_messages = []
        st.rerun()

    def select_chat(chat):
        st.session_state.selected_chat = chat
        st.session_state.csv_id = chat["csv_id"]
        st.session_state.current_messages = chat.get("chat_ids", [])
        st.rerun()

    

    with st.sidebar:
        st.title("Chat History")
        
        try:
            headers = {"Authorization": f"Bearer {auth_token}"}
            response = requests.get(GET_ALL_CHATS_URL.format(user_id=user_id), headers=headers)
            if response.status_code == 200:
                all_chats = response.json().get("chats", [])
                st.session_state.chat_history = all_chats
            
            if st.button("+ New Chat"):
                reset_chat_state()

            for chat in st.session_state.chat_history:
                chat_title = chat.get("chat_title", "New Chat")
                if st.button(f"📝 {chat_title}", key=chat["_id"]):
                    select_chat(chat)

        except Exception as e:
            st.error(f"Error loading chat history: {str(e)}")

    # Main chat area
    uploaded_file = st.file_uploader("Choose a file", type=["csv", "xlsx", "xls"])

    if uploaded_file and not st.session_state.csv_uploaded:
        st.session_state.df = read_data(uploaded_file)
        st.write("DataFrame Preview:")
        st.dataframe(st.session_state.df.head())

        csv_data = uploaded_file.getvalue().decode("utf-8")
        upload_response = upload_csv(user_id, uploaded_file.name, csv_data)
        if upload_response:
            st.session_state.csv_uploaded = True
            st.session_state.csv_id = upload_response['data']['id']

   
    for message in st.session_state.current_messages:
        with st.chat_message("user"):
            st.markdown(message["user_message"])
        with st.chat_message("assistant"):
            st.markdown(message["model_response"])

   
    if st.session_state.csv_uploaded or st.session_state.selected_chat:
        user_prompt = st.chat_input("Ask LLM...")
        if user_prompt:
            with st.chat_message("user"):
                st.markdown(user_prompt)

            
            llm = ChatOllama(model="qwen2.5:latest", temperature=0)
            pandas_df_agent = create_pandas_dataframe_agent(
                llm,
                st.session_state.df,
                verbose=True,
                agent_type="tool-calling",
                allow_dangerous_code=True,
                engine="pandas",
            )
            response = pandas_df_agent.invoke(user_prompt)
            assistant_response = response["output"]

            with st.chat_message("assistant"):
                st.markdown(assistant_response)

            headers = {"Authorization": f"Bearer {auth_token}"}
            if not st.session_state.selected_chat:
            
                new_chat_data = {
                    "user_message": user_prompt,
                    "model_response": assistant_response
                }
                response = requests.post(
                    NEW_CHAT_URL.format(user_id=user_id, csv_id=st.session_state.csv_id),
                    json=new_chat_data,
                    headers=headers
                )
                if response.status_code == 201:
                
                    new_message = {
                        "user_message": user_prompt,
                        "model_response": assistant_response
                    }
                    st.session_state.current_messages.append(new_message)
                    
                    chat_response = response.json()
                    st.session_state.selected_chat = {
                        "_id": chat_response.get("chatId"),
                        "chat_ids": [new_message],
                        "chat_title": chat_response.get("chat_title"),
                        "csv_id": st.session_state.csv_id
                    }
            else:
                
                chat_data = {
                    "user_message": user_prompt,
                    "model_response": assistant_response
                }
                response = requests.post(
                    CREATE_CHAT_URL.format(user_id=user_id, csv_id=st.session_state.csv_id),
                    json=chat_data,
                    headers=headers
                )
                if response.status_code == 201:
                    new_message = {
                        "user_message": user_prompt,
                        "model_response": assistant_response
                    }
                    st.session_state.current_messages.append(new_message)

def upload_csv(user_id, file_name, csv_data):
    try:
        payload = {
            "fileName": file_name,
            "csvData": csv_data
        }
        response = requests.post(UPLOAD_URL.format(user_id=user_id), json=payload)
        if response.status_code == 201:
            return response.json()
        else:
            error_message = response.json().get('message', 'Failed to upload CSV')
            st.error(f"Error: {error_message}")
            return None
    except Exception as e:
        st.error(f"An error occurred: {e}")
        return None