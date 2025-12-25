const logger = require('../utils/logger');

class SocketManager {
    constructor(io) {
        this.io = io;
        this.events = new Map(); // eventName -> handler
    }

    registerEvent(eventName, handler) {
        if (this.events.has(eventName)) {
            throw new Error(`Event ${eventName} already registered`);
        }
        this.events.set(eventName, handler);
    }

    bootstrap() {
        this.io.on('connection', (socket) => {
            logger.info('Socket connected: ' + socket.id);

            // Bind all registered events dynamically
            for (const [eventName, handler] of this.events.entries()) {
                socket.on(eventName, (data, ack) => {
                    try {
                        handler(socket, data, ack, this.io);
                    } catch (err) {
                        logger.error(err);
                        ack && ack({ error: err.message });
                    }
                });
            }

            socket.on('disconnect', (reason) => {
                logger.info(`Socket disconnected: ${socket.id} reason: ${reason}`);
            });
        });
    }
}

module.exports = SocketManager;
