#!/bin/bash

# Start Development Servers Script
# This script starts both the Flask backend and Vite frontend servers

echo "🚀 Starting nilshub.se development servers..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start Flask backend server
echo "📡 Starting Flask backend server (port 5001)..."
cd src/Laundry/db && python server.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start Vite frontend server
echo "🌐 Starting Vite frontend server (port 5173)..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are starting up!"
echo "   Backend: http://localhost:5001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait 