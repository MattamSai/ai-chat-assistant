# AI Chat Assistant

A backend AI chat application built using Node.js, Express, MySQL, and Redis, integrated with Google Gemini API for generating intelligent responses.

---

## Features

* AI-powered chat using Gemini API
* Redis caching for repeated queries
* Rate limiting (1 request per minute per user)
* Input normalization using regex
* Input length restriction (< 1000 characters)
* Output token limit control
* MySQL database for chats and messages
* Authentication using JWT
* Clean MVC architecture

---

## Tech Stack

* Backend: Node.js, Express.js
* Database: MySQL (MySQL Workbench)
* Caching: Redis
* Authentication: JWT
* AI API: Google Gemini (Free Tier)
* Architecture: MVC (Models, Controllers, Routes)

---

## Project Structure

```
project-root/
│
├── configs/
│   └── db.js
│
├── controllers/
│   ├── chat.js
│   ├── userLogin.js
│   └── userRegister.js
│
├── models/
│   ├── auditModel.js
│   ├── chatModel.js
│   ├── indexModel.js
│   ├── messageModel.js
│   ├── models.js
│   ├── passwordHashModel.js
│   └── userModel.js
│
├── routes/
│   ├── chatRoute.js
│   ├── route.js
│   └── userRoute.js
│
├── utils/
│   ├── audit.js
│   ├── authenticate.js
│   ├── googleapi.js
│   ├── jwt.js
│   └── redis.js
│
├── .env
├── index.js
├── package.json
└── package-lock.json
```

---

## Setup and Installation

1. Clone the repository
```
git clone https://github.com/MattamSai/ai-chat-assistant.git
cd ai-chat-assistant
```

2. Install dependencies

```
npm install
```

3. Setup environment variables

Create a `.env` file:

```
PORT=5000
GOOGLE_API_KEY=your_api_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=chat_app
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
```

4. Start Redis

```
redis-server
```

5. Run the server

```
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## API Example

POST `/chat`

Request:

```
{
  "message": "What is AI?"
}
```

Response:

```
{
  "success": true,
  "data": "Artificial Intelligence (AI) is..."
}
```

---

## API Constraints and Optimizations

Rate Limiting

* 1 request per minute per user
* Prevents API abuse and quota exhaustion

Caching

* Uses Redis to store repeated queries
* Reduces API calls and improves response speed

Input Validation

* Maximum input length: 1000 characters

Output Control

* Limits response size using maxOutputTokens

Input Normalization

```
const key = message
  .toLowerCase()
  .replace(/[^\w\s]/g, '')
  .trim();
```

---

## Error Handling

* Handles API rate limits (429 errors)
* Prevents crashes from undefined responses
* Provides fallback responses

---

## Key Learnings

* Handling AI API rate limits
* Implementing Redis caching
* Managing dynamic AI responses in database
* Designing scalable backend architecture
* Input sanitization using regex

---

## Future Improvements

* Streaming responses
* Context-based chat (multi-turn)
* Query analytics
* Cloud deployment

---

## Author

Mattam Sai Yadav
Full Stack Developer | AI Enthusiast
