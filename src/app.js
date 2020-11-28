import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

import routes from "./routes";

class App {
  constructor() {
    this.server = express(); //quando a classe for chamada, vai chamar automaticamante as funçoes middlewares e routes
    mongoose.connect(
      "mongodb+srv://devhouse:1818@devhouse.zpzhw.mongodb.net/devhouse?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(cors());

    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
