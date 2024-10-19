import requests
import pandas as pd
import streamlit as st
from langchain_experimental.agents import create_pandas_dataframe_agent
from langchain_ollama import ChatOllama

# Replace with the actual API URLs
CREATE_CHAT_URL = "http://localhost:9001/api/user/{user_id}/csv/{csv_id}/chat"
GET_CHATS_URL = "http://localhost:9001/api/user/{user_id}/csv/{csv_id}/chats"
UPLOAD_URL = "http://localhost:9001/api/user/{user_id}/upload-csv"  # Add upload URL

def show_page():
    def read_data(file):
        if file.name.endswith(".csv"):
            return pd.read_csv(file, encoding='ISO-8859-1')
        else:
            return pd.read_excel(file)

    st.title("🤖 DataFrame ChatBot - Ollama")

    # Initialize chat history and uploaded CSV URL in Streamlit session state
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []
    if "df" not in st.session_state:
        st.session_state.df = None
    if "csv_uploaded" not in st.session_state:
        st.session_state.csv_uploaded = False
    if "csv_id" not in st.session_state:
        st.session_state.csv_id = None  # To store CSV ID from the upload response

    if not st.session_state.get("logged_in", False):
        st.error("Please log in to use this feature.")
        return

    user_id = st.session_state.current_user_id
    auth_token = st.session_state.auth_token

    uploaded_file = st.file_uploader("Choose a file", type=["csv", "xlsx", "xls"])

    if uploaded_file:
        st.session_state.df = read_data(uploaded_file)
        st.write("DataFrame Preview:")
        st.dataframe(st.session_state.df.head())

        # Upload the CSV to the backend only if it hasn't been uploaded yet
        if not st.session_state.csv_uploaded:
            csv_data = uploaded_file.getvalue().decode("utf-8")  # Read as string
            file_name = uploaded_file.name
            
            # Upload CSV
            upload_response = upload_csv(user_id, file_name, csv_data)
            if upload_response:
                st.success("CSV uploaded successfully!")
                st.session_state.csv_uploaded = True  # Mark CSV as uploaded
                st.session_state.csv_id = upload_response['data']['id']  # Store CSV ID for future use

        # Load existing chats from the backend
        if st.session_state.csv_id:  # Ensure CSV ID is available
            headers = {"Authorization": f"Bearer {auth_token}"}
            response = requests.get(GET_CHATS_URL.format(user_id=user_id, csv_id=st.session_state.csv_id), headers=headers)

            if response.status_code == 200:
                chats = response.json().get("chats", [])
                
                # Populate chat history from retrieved chats (only once)
                if not st.session_state.chat_history:
                    for chat in chats:
                        user_message = chat.get("user_message")
                        model_response = chat.get("model_response")
                        if user_message and model_response:
                            st.session_state.chat_history.append({
                                "user_message": user_message, 
                                "model_response": model_response
                            })

    # Display chat history
    if st.session_state.chat_history:
        for chat in st.session_state.chat_history:
            with st.chat_message("user"):
                st.markdown(chat["user_message"])
            with st.chat_message("assistant"):
                st.markdown(chat["model_response"])

    user_prompt = st.chat_input("Ask LLM...")

    if user_prompt:
        # Display user input immediately
        with st.chat_message("user"):
            st.markdown(user_prompt)

        # Generate response using the LLM
        llm = ChatOllama(model="qwen2.5:7b-instruct-q8_0", temperature=0, base_url="https://cccd-34-141-178-174.ngrok-free.app")

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

        # Display assistant response immediately
        with st.chat_message("assistant"):
            st.markdown(assistant_response)

        # Add both user and assistant messages to chat history
        st.session_state.chat_history.append({"user_message": user_prompt, "model_response": assistant_response})

        # Send both user input and model response to backend
        chat_data = {"user_message": user_prompt, "model_response": assistant_response}
        headers = {"Authorization": f"Bearer {auth_token}"}
        requests.post(CREATE_CHAT_URL.format(user_id=user_id, csv_id=st.session_state.csv_id), json=chat_data, headers=headers)


def upload_csv(user_id, file_name, csv_data):
    """Uploads CSV data to the backend and returns the response."""
    try:
        # Prepare the data to be sent in the request
        payload = {
            "fileName": file_name,
            "csvData": csv_data
        }

        # Make the POST request to upload the CSV
        response = requests.post(UPLOAD_URL.format(user_id=user_id), json=payload)

        # Check for success
        if response.status_code == 201:
            return response.json()  # Return the response for success
        else:
            # Handle non-JSON responses
            try:
                error_message = response.json().get('message', 'Failed to upload CSV')
            except ValueError:  # includes simplejson.decoder.JSONDecodeError
                error_message = response.text  # get the raw response text
            st.error(f"Error: {error_message}")
            return None
    except Exception as e:
        st.error(f"An error occurred: {e}")
        return None
