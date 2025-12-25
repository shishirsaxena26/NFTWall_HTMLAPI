mkdir realws
cd realws
mkdir src
cd src
mkdir sockets events utils routes
type nul > server.js
type nul > app.js
cd sockets
type nul > socketManager.js
type nul > roomManager.js
cd ..\events
type nul > roomEvents.js
type nul > chatEvents.js
cd ..\utils
type nul > logger.js
type nul > response.js
cd ..\routes
type nul > room.routes.js
cd ..\
type nul > client.html


# Dynamic Socket.IO Node.js Project

This project demonstrates a dynamic Socket.IO system with real-time room creation, joining, leaving, destroying, and listing rooms. Developers can easily add new events dynamically without modifying core socket code.

## FEATURES
- Dynamic Socket.IO events
- CRUD operations on rooms
- Real-time updates for multiple clients
- Modular and extensible structure
- Simple in-memory room management (can be replaced with SQL, MongoDB, etc.)
- Supports acknowledgements (ack callbacks) for every event

## FOLDER STRUCTURE


project/
├─ src/
│  ├─ server.js          # start HTTP + Socket.IO server
│  ├─ app.js             # Express app for REST endpoints
│  ├─ sockets/
│  │  ├─ socketManager.js   # dynamic event registry & bootstrap
│  │  └─ roomManager.js     # generic room CRUD
│  ├─ events/
│  │  ├─ roomEvents.js      # room-specific events registered dynamically
│  │  └─ chatEvents.js      # chat events etc.
│  └─ utils/
│     └─ logger.js
└─ client.html