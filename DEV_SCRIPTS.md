# Development Scripts

This project now has multiple ways to start both the Flask backend and Vite frontend servers simultaneously.

## Option 1: NPM Script (Recommended)

```bash
npm run dev:full
```

This uses the `concurrently` package to run both servers in parallel with colored output.

## Option 2: Shell Script

```bash
./start-dev.sh
```

This is a bash script that starts both servers and handles cleanup when you stop them.

## Option 3: Manual (Original way)

```bash
# Terminal 1: Start backend
cd src/Laundry/db && python server.py

# Terminal 2: Start frontend
npm run dev
```

## Available Scripts

- `npm run dev` - Start only the Vite frontend server
- `npm run dev:full` - Start both backend and frontend servers
- `npm run dev:frontend` - Start only the Vite frontend server
- `npm run dev:backend` - Start only the Flask backend server
- `./start-dev.sh` - Shell script to start both servers

## Server URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001

## Stopping the Servers

- **NPM Script**: Press `Ctrl+C` once to stop both servers
- **Shell Script**: Press `Ctrl+C` once to stop both servers
- **Manual**: Press `Ctrl+C` in each terminal

## Troubleshooting

If you get permission errors with the shell script:
```bash
chmod +x start-dev.sh
```

If the backend fails to start, make sure you have the required Python packages:
```bash
pip install flask flask-cors flask-sqlalchemy flask-session
``` 