import { Request, Response, NextFunction } from "express";
import { Client } from "./client";

export interface Route {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch" | "all";
  handler: (
    client: Client,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
