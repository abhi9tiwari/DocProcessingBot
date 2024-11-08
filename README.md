
# Document Processing and RAG Chatbot Service

This project is a Node.js application designed to process document files and create embeddings, which are then stored in a vector database for efficient querying. The system allows users to interact with the document-based knowledge through a RAG (Retrieval-Augmented Generation) chatbot.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Document Processing Service](#document-processing-service)
  - [RAG Chatbot Service](#rag-chatbot-service)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## Overview

The system consists of two main components:
1. **Document Processing Service**: Processes files, generates embeddings, and stores them in a vector database.
2. **RAG Chatbot Service**: Provides an interactive chat interface to query document embeddings using a retrieval-augmented generation approach.

## Features
- **Document Processing**: Uploads text, PDF, and Word documents and converts their content to embeddings.
- **Vector Database**: Uses ChromaDB to store and query embeddings efficiently.
- **RAG Chatbot**: Allows interactive querying of document-based knowledge with response streaming and chat history.

## Requirements
- **Node.js** ( version 16 or above is recommended)
- TensorFlow and ChromaDB dependencies
- Postman or another API testing tool (optional, for testing APIs)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/DocProcessingBot.git

   cd doc-processing-rag-chatbot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install TensorFlow Node Backend**
   ```bash
   npm install @tensorflow/tfjs-node
   ```

## Configuration

Update the `config.json` file with your preferred settings:

```json
{
  "PORT": 3000,
  "VECTOR_DB_PATH": "./vectorUploads"
}
```

- `PORT`: Port on which the server will run.
- `VECTOR_DB_PATH`: Path for storing vector embeddings in the database.

## Usage

1. **Start the Server**
   ```bash
   node server.js
   ```

   The server will start at `http://localhost:3000` (or the port specified in `config.json`).

2. **Test APIs**
   You can use **Postman** or any API client to test the endpoints described below.

### Document Processing Service

1. Upload a document to generate embeddings and store them in the vector database.
2. Retrieve a unique asset ID that can be used for querying through the chatbot.

### RAG Chatbot Service

1. Start a chat session using the document’s asset ID.
2. Send messages to interact with document content through retrieval-augmented responses.
3. Retrieve chat history for a specific session.

## API Endpoints

### 1. Document Processing Endpoint

- **URL**: `POST /api/documents/process`
- **Description**: Processes a document and stores embeddings.
- **Input**: Form-data with a `file` field containing the document.
- **Output**: JSON object with a unique `assetId` for the processed document.

**Example Response**:
```json
{
  "assetId": "asset1234567890"
}
```

### 2. Start Chat Endpoint

- **URL**: `POST /api/chat/start`
- **Description**: Starts a new chat session for a document.
- **Input**: JSON with `assetId`.
- **Output**: JSON object with a unique `chatThreadId`.

**Example Request**:
```json
{
  "assetId": "asset1234567890"
}
```

**Example Response**:
```json
{
  "chatThreadId": "some-unique-thread-id"
}
```

### 3. Send Message Endpoint

- **URL**: `POST /api/chat/message`
- **Description**: Sends a message to the chatbot in an existing chat thread.
- **Input**: JSON with `chatThreadId` and `message`.
- **Output**: JSON with the bot’s response.

**Example Request**:
```json
{
  "chatThreadId": "some-unique-thread-id",
  "message": "What is the content of the document?"
}
```

**Example Response**:
```json
{
  "response": "RAG Response based on embeddings: {...}"
}
```

### 4. Chat History Endpoint

- **URL**: `GET /api/chat/history`
- **Description**: Retrieves chat history for a specific chat thread.
- **Input**: Query parameter `chatThreadId`.
- **Output**: JSON with a list of messages.

**Example Request**:
```
GET /api/chat/history?chatThreadId=some-unique-thread-id
```

**Example Response**:
```json
{
  "messages": [
    { "user": "What is the content of the document?", "bot": "RAG Response based on embeddings: {...}" }
  ]
}
```

## Troubleshooting

- **No Backend Found in Registry**: Ensure that `@tensorflow/tfjs-node` is installed and correctly imported before other TensorFlow packages.
- **File Upload Issues**: Verify that you’re using `form-data` for file uploads in Postman.
- **Chat or Database Issues**: Check if the `VECTOR_DB_PATH` directory exists and is accessible. Confirm that the asset ID and chat thread ID match your request.

---

Feel free to reach out if you have questions, or contribute to the repository with improvements!
