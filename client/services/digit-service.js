let desired = [];
let next_index = 0;
const observers = {};

const ws = () => {
    const socket = new WebSocket('ws://localhost:8321');

    socket.onclose = () => setTimeout(ws, 1000);
    socket.onerror = () => socket.close();

    socket.onmessage = event => {
        const message = JSON.parse(event.data);

        if (Array.isArray(message)) desired = message;
        else {
            desired.unshift(message);
            desired.pop();
        }

        for (const index in observers)
            observers[index](desired);
    };
};

ws();

export const connect = observer => {
    const index = ++next_index;

    observers[index] = observer;

    observer(desired);

    return index;
};

export const disconnect = index => delete observers[index];
