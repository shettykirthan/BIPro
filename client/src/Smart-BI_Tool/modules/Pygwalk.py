from pygwalker.api.streamlit import StreamlitRenderer
import pandas as pd
import streamlit as st

def show_page():
    st.title("Pygwalker")
    uploaded_file = st.file_uploader("Choose a file", type=["csv", "xlsx", "xls"])

    def get_pyg_renderer() -> "StreamlitRenderer":
        df = pd.read_csv(uploaded_file, encoding='ISO-8859-1')
        return StreamlitRenderer(df, spec="./gw_config.json", spec_io_mode="rw")

    if uploaded_file is not None:
        renderer = get_pyg_renderer()
        renderer.explorer()
        