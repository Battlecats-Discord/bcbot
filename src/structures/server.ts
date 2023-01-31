import express from "express";
import { Client } from "./client";
import { Route } from "./route";

export class Server {
  private app: express.Application;
  constructor(public client: Client) {
    this.app = express();
  }
  public start() {
    return new Promise((resolve) =>
      this.app.listen(Number(process.env.PORT ?? "3000"), () =>
        resolve(undefined)
      )
    );
  }
  public loadRoute(route: Route) {
    this.app[route.method](route.path, (req, res, next) =>
      route.handler(this.client, req, res, next)
    );
  }
}
