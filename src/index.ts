import { config } from "dotenv";
config();

import { Client } from "./structures/client";
import { Server } from "./structures/server";
import commands from "./commands";
import events from "./events";
import routes from "./routes";

const client = new Client();

for (const command of commands) {
    client.loadCommand(command);
}

for (const event of events) {
    client.loadEvent(event);
}

const server = new Server(client);

for (const route of routes) {
    server.loadRoute(route);
}

client.login().then(() => {
    server.start();
});

process.on("unhandledRejection", (err) => {
    console.error(err);
});

process.on("uncaughtException", (err) => {
    console.error(err);
});