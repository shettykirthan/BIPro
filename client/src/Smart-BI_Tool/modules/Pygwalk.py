from pygwalker.api.streamlit import StreamlitRenderer
import pandas as pd
import streamlit as st

def show_page():
    st.title("Pygwalker")
    uploaded_file = st.file_uploader("Choose a file", type=["csv", "xlsx", "xls"])

    # Only proceed if a file is uploaded
    if uploaded_file is not None:
        # Read the uploaded file into a DataFrame
        if uploaded_file.name.endswith('.csv'):
            df = pd.read_csv(uploaded_file, encoding='ISO-8859-1')
        else:
            df = pd.read_excel(uploaded_file)

        # Create the Pygwalker renderer (do not cache it)
        renderer = StreamlitRenderer(df, spec="./gw_config.json", spec_io_mode="rw")
        renderer.explorer()