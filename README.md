# Business Insight Pro

## Overview
Business Insight Pro is a tool designed to provide detailed analysis of business data from CSV files. The project includes a chatbot interface that leverages the `llama` model from Ollama for natural language interaction with the data.

## Prerequisites
- **Ollama** installed on your local system (required for running the `qwen2.5` model).
- **Node.js** installed for running both backend and frontend.
- **MongoDB** as the database solution.

## Setup Instructions

### Backend Setup
1. Navigate to the `api` folder:
    ```bash
    cd api
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables by creating a `.env` file with the following content:
    ```bash
    MONGO=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret>
    ```
4. Run the backend in development mode:
    ```bash
    npm run dev
    ```

### Frontend Setup
1. Navigate to the `client` folder:
    ```bash
    cd client
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```
3. Run the frontend:
    ```bash
    npm start
    ```
4. To run the welcome page:
    ```bash
    npm run dev
    ```

## Notes
- The backend is connected to MongoDB. Replace `<Your MongoDB Connection String>` in the `.env` file with your actual MongoDB connection string.
- Ensure Ollama is installed and configured correctly to run the `llama3.1:8b-instruct-q8_0` model.
