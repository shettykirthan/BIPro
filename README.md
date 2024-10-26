# Business Insight Pro

## Overview
Business Insight Pro is a tool designed to provide detailed analysis of business data from CSV files. The project includes a chatbot interface that leverages the `qwen2.5` model from Ollama for natural language interaction with the data.

## Prerequisites
- **Ollama** installed on your local system (required for running the `qwen2.5` model).
- **Node.js** installed for running both backend and frontend.
- **MongoCompass** (local MongoDB database).

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
3. Run the backend in development mode:
    ```bash
    npm run dev
    ```

### Frontend Setup
1. Install frontend dependencies:
    ```bash
    npm install
    ```
2. Run the frontend:
    ```bash
    npm start
    ```
3. To run the welcome page:
    ```bash
    npm run dev
    ```

## Notes
- The backend is connected to a local MongoDB instance using MongoCompass.
- Ensure Ollama is installed and configured correctly to run the `qwen2.5` model.

