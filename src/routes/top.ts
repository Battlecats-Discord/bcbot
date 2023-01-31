import { Route } from "../structures/route";

export const TopRoute: Route = {
  async handler(_client, _req, res) {
    res.end("Hello World!");
  },
  path: "/",
  method: "all",
};
