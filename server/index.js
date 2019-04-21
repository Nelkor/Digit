const ws = require('ws');
const rand_num = () => Math.random() * 10 | 0;
const server = new ws.Server({ port: 8321 });
const numbers = new Array(11).fill(0).map(rand_num);

server.on('connection', client => client.send(JSON.stringify(numbers)));

setInterval(() => {
    const next_num = rand_num();

    numbers.unshift(next_num);
    numbers.pop();

    server.clients.forEach(client => {
        if (client.readyState === ws.OPEN) client.send(next_num);
        else client.terminate();
    });
}, 5000);
