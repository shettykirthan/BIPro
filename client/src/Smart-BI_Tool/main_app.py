import streamlit as st
import requests
from modules import app, Clean, dashboard_self, Pygwalk, Overview1, Chat, vizzu

# Set page config
st.set_page_config(
    page_title="Multi-Page Streamlit App",
    layout="wide"
)

# Backend API URLs
SIGNIN_URL = "http://localhost:9001/api/auth/signin"
SIGNUP_URL = "http://localhost:9001/api/auth/signup"

# Helper functions for API authentication
def signup(username, email, password):
    try:
        response = requests.post(SIGNUP_URL, json={
            "username": username,
            "email": email,
            "password": password
        })
        if response.status_code == 201:
            return True, "Account created successfully!"
        else:
            return False, response.json().get("message", "An error occurred during signup.")
    except Exception as e:
        return False, str(e)

def login(email, password):
    try:
        response = requests.post(SIGNIN_URL, json={
            "email": email,
            "password": password
        })
        if response.status_code == 200:
            return True, response.json()  # Assume response contains user data
        else:
            return False, response.json().get("message", "Invalid credentials.")
    except Exception as e:
        return False, str(e)

# Authentication state
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False

if 'current_user' not in st.session_state:
    st.session_state.current_user = None

if 'auth_token' not in st.session_state:
    st.session_state.auth_token = None

if 'current_page' not in st.session_state:
    st.session_state.current_page = "Login"  # Default page

# Login/Signup logic
def auth_page():
    st.title("Login & Signup")

    # Sidebar for login/signup selection
    option = st.sidebar.selectbox("Choose Action", ["Login", "Signup"])

    if option == "Signup":
        st.subheader("Create a New Account")
        new_username = st.text_input("Enter a username")
        new_email = st.text_input("Enter an email")
        new_password = st.text_input("Enter a password", type='password')
        if st.button("Sign Up"):
            success, message = signup(new_username, new_email, new_password)
            if success:
                st.success(message)
            else:
                st.error(message)

    elif option == "Login":
        st.subheader("Login to Your Account")
        email = st.text_input("Email")
        password = st.text_input("Password", type='password')
        if st.button("Login"):
            success, response = login(email, password)
            if success:
                st.success(f"Logged in successfully as {email}")
                st.session_state.logged_in = True
                st.session_state.current_user = response["user"]["username"]  # Store the username
                st.session_state.current_user_id = response["user"]["_id"]
                st.session_state.auth_token = response.get("access_token", None)  # Assuming token is in the response
                
                # Set current page to Home after successful login
                st.session_state.current_page = "Home"
            else:
                st.error(response)

# Page rendering logic with private routes
with st.sidebar:
    st.title("Navigation")

    # Determine the current page based on the session state
    if st.session_state.logged_in:
        page = st.selectbox(
            "Choose a page", 
            [
                "Home", 
                "Data Cleaning (AutoClean)", 
                "Dynamic Dashboard", 
                "Data Visualization", 
                "Data Analysis", 
                "Chat with Dataset", 
                "Knowledge graph",
                "Vizzu Animation"
            ]
        )
    else:
        # Show the login option if not logged in
        page = "Login"  # Default to Login page if not logged in

    # Update the current page
    st.session_state.current_page = page

# Home Page
if st.session_state.logged_in:
    if page == "Home":
        st.title(f"Welcome {st.session_state.current_user} to the Multi-Page Streamlit App")
        st.write("""This application allows you to perform various tasks like data cleaning, model interaction, and more.
                    Use the sidebar to navigate to different sections of the app:""")

    elif page == "Data Cleaning (AutoClean)":
        Clean.show_page()  

    elif page == "Dynamic Dashboard":
        dashboard_self.show_page()  

    elif page == "Data Visualization":
        Pygwalk.show_page()

    elif page == "Data Analysis":
        Overview1.show_page()

    elif page == "Chat with Dataset":
        Chat.show_page()

    elif page == "Knowledge graph":
        app.show_page()

    elif page == "Vizzu Animation":
        vizzu.show_page()
else:
    # If the user is not logged in, show the login page by default
    auth_page()
    st.warning("Please log in to access the application.")
