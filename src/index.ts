import { config } from "dotenv";
config();

import { Client } from "./structures/client";
import commands from "./commands";
import events from "./events";

const client = new Client();

for (const command of commands) {
    client.loadCommand(command);
}

for (const event of events) {
    client.loadEvent(event);
}

client.login();

process.on("unhandledRejection", (err) => {
    console.error(err);
});

process.on("uncaughtException", (err) => {
    console.error(err);
});