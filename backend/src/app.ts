import { Routes } from "./routes/routes";
import cors from 'cors';

const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class App {
    private routesPrev: Routes;

    constructor() {
        this.routesPrev = new Routes();
    }

    config() {
        this.routesPrev.routes(app);
    }

    getApp() {
        return app;
    }
}

const myApp = new App();
myApp.config();

export default myApp.getApp();