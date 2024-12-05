import streamlit as st
import pandas as pd
import re
from AutoClean import AutoClean

# Function to clean and retain only numeric values (integers and decimals) using regex
def clean_numeric_values(data):
    return data.apply(lambda x: ''.join(re.findall(r'\d+\.?\d*', str(x))))

def show_page():
    st.title("Data Cleaning Tool")
    
    # File upload section
    uploaded_file = st.file_uploader("Choose a CSV or Excel file", type=['csv', 'xls', 'xlsx'])
    
    if uploaded_file:
        try:
            # Check if the uploaded file is a CSV
            if uploaded_file.name.endswith('.csv'):
                original_data = pd.read_csv(uploaded_file, encoding='ISO-8859-1')
            
            # Check if the uploaded file is an Excel file
            elif uploaded_file.name.endswith(('.xls', '.xlsx')):
                original_data = pd.read_excel(uploaded_file)
            
            else:
                st.error("Unsupported file format. Please upload a CSV or Excel file.")
                return
            
            # Display the filename and preview of the data
            st.write("Filename:", uploaded_file.name)
            st.write("Original Data Preview:")
            st.dataframe(original_data.head())
        
        except Exception as e:
            st.error(f"Error reading the file: {e}")
            return

        # Mode selection
        mode = {
            "Choose option": "None",
            "Automated processing": "auto",
            "Manual processing": "manual"
        }

        # Manual options for AutoClean
        
        missing_num = {"False": False, "Auto": "auto", "Mean": "mean", "Median": "median", "Mode": "most_frequent", "Delete": "delete"}
        missing_categ = {"False": False, "Auto": "auto", "Mode": "most_frequent", "Delete": "delete"}
        encode_categ = {"False": False, "Auto": "auto", "One Hot Encoding": ["onehot"], "Label Encoding": ["label"]}
        extract_datetime = {"False": False, "Auto": "auto", "Day": "D", "Month": "M", "Year": "Y"}
        outliers = {"False": False, "Auto": "auto", "Winsorize": "winz", "Delete": "delete"}
        logfile = {"True": True, "False": False}
        verbose = {"False": False, "True": True}

        # Sidebar for mode selection
        initial_option = st.sidebar.selectbox('Choose mode for AutoClean:', list(mode.keys()))
        selected_mode = mode[initial_option]

        if initial_option == "Manual processing":
            st.sidebar.header("Manual Processing Options")

            # Convert Numerical Strings with Symbols
            st.sidebar.subheader("Convert Numerical Strings with Symbols")
            columns_for_conversion = st.sidebar.multiselect(
                "Select columns to convert:",
                options=original_data.columns,
                help="Choose columns with symbols like $, ₹, -, etc."
            )

            if st.sidebar.button("Convert Numerical Strings"):
                with st.spinner("Converting selected columns..."):
                    converted_data = original_data.copy()
                    for col in columns_for_conversion:
                        converted_data[col] = clean_numeric_values(converted_data[col])
                    st.success("Conversion completed!")
                    st.subheader("Converted Data")
                    st.dataframe(converted_data.head())
                    original_data = converted_data
                st.download_button(
                label="Download Processed CSV",
                data=original_data.to_csv(index=False),
                file_name="processed_file.csv",
                mime="text/csv"
            )

            # Manual AutoClean options
            

            missing_num_option = st.sidebar.selectbox('Handle missing numerical values:', list(missing_num.keys()))
            selected_missing_num = missing_num[missing_num_option]

            missing_categ_option = st.sidebar.selectbox('Handle missing categorical values:', list(missing_categ.keys()))
            selected_missing_categ = missing_categ[missing_categ_option]

            encode_option = st.sidebar.selectbox('Encoding categorical values:', list(encode_categ.keys()))
            selected_encode_categ = encode_categ[encode_option]

            datetime_option = st.sidebar.selectbox('Extract datetime parts:', list(extract_datetime.keys()))
            selected_extract_datetime = extract_datetime[datetime_option]

            outliers_option = st.sidebar.selectbox('Handle outliers:', list(outliers.keys()))
            selected_outliers = outliers[outliers_option]

            logfile_option = st.sidebar.selectbox('Generate logfile?', list(logfile.keys()))
            selected_logfile = logfile[logfile_option]

            verbose_option = st.sidebar.selectbox('Verbose mode?', list(verbose.keys()))
            selected_verbose = verbose[verbose_option]

            # Run AutoClean with manual options
            if st.button('Run AutoClean 🚀'):
                with st.spinner('Cleaning data...'):
                    cleaner = AutoClean(
                        original_data,
                        mode=selected_mode,
                        
                        missing_num=selected_missing_num,
                        missing_categ=selected_missing_categ,
                        encode_categ=selected_encode_categ,
                        extract_datetime=selected_extract_datetime,
                        outliers=selected_outliers,
                        logfile=selected_logfile,
                        verbose=selected_verbose
                    )
                    cleaned_data = cleaner.output
                    st.success("Data cleaning completed!")
                    
                    st.subheader("Cleaned Data")
                    st.dataframe(cleaned_data.head())
                    st.download_button('Download Cleaned Data', cleaned_data.to_csv(index=False), file_name='cleaned_data.csv')

        elif initial_option == "Automated processing":
            if st.button('Run AutoClean 🚀'):
                with st.spinner('Cleaning data...'):
                    cleaner = AutoClean(original_data, mode='auto')
                    cleaned_data = cleaner.output
                    st.success("Data cleaning completed!")

                    st.subheader("Cleaned Data")
                    st.dataframe(cleaned_data.head())
                    st.download_button('Download Cleaned Data', cleaned_data.to_csv(index=False), file_name='cleaned_data.csv')

# Run the Streamlit app
if __name__ == "_main_":
    show_page()