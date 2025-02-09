# QuickTalk

## Real-Time Chat Application 💬

A full-stack real-time messaging platform with end-to-end encryption and modern collaboration features.

![Chat App Preview](./screenshots/app-preview.gif) _Replace with your screenshot_

## Features ✨

### Core Functionality

-   **Real-time messaging** ⚡ using WebSocket (Socket.io)
-   **User authentication** 🔑 with JWT and password hashing
-   **Message history** 📜 with MongoDB storage
-   **Online status** 🟢

### Advanced Features

-   **File sharing** 📁 (images 5MB)
-   **Responsive design** 📱 works on mobile & desktop

## Installation 🚀

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/thaibapratik/quick-talk.git
    cd quick-talk
    ```

2. Install dependencies:

    ```bash
    # Server
    cd server && npm install

    # Client
    cd ../client && npm install
    ```

3. Configure environment variables:

    ```env
    # .env (server)
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Start the application:

    ```bash
    # Start server
    cd server && npm run dev

    # Start client
    cd ../client && npm start
    ```
