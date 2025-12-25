# Real-time Socket.IO Project (in-memory)

## Quick start

1. Copy files from this doc into the described structure.
2. Create `.env` from `.env.example` and set `JWT_SECRET`.
3. Install dependencies:

```bash
npm install
Start server:
npm run start
Open a client and connect with Socket.IO:
const socket = io('http://localhost:3000');
// authenticate (demo)
socket.emit('auth', { userId: 'user1' });

socket.emit('create_room', { roomId: 'room1' }, (res) => console.log(res));
socket.emit('join_room', { roomId: 'room1' }, (res) => console.log(res));
Notes
This implementation is fully in-memory and does not require a DB. You can later plug in SQL Server for logging.
For horizontal scaling use the Socket.IO Redis adapter and persist room state in a shared store (Redis). ```
