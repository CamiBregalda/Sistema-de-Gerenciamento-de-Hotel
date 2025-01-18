import mongoose from "mongoose";
import { Routes } from "./routes/routes";

const express = require("express");
const app = express();
const port = 8080;

class App {
    private app: any
    private routesPrev: Routes

    constructor() {
        this.app = express()
        this.routesPrev = new Routes()
    }

    config() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.routesPrev.routes(this.app)
    }

    mongoSetup() {
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost:27017/Hotel", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: false
        })
    }

    getApp() {
        return app;
    }
}

const myApp = new App();

(async () => {
    myApp.config();
    myApp.mongoSetup();

    const server = myApp.getApp();
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})();

export default app;

app.use(express.json());