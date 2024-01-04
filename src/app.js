import express from "express";
import cors from 'cors'
import routes from "./routes.js";
import {resolve} from "path";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const corsOptions = {
  origin:'https://dev-burger-interface.vercel.app',
  credentials: true
}


import './database/index.js'
class App {
  constructor() {
    this.app = express();

    this.app.use(cors(corsOptions));
    
    this.middlewares();
    this.routes();

  }
  middlewares() {
    this.app.use(express.json())
    this.app.use('/product-file', express.static(resolve(__dirname, '..' , 'uploads')))

    this.app.use('/category-file', express.static(resolve(__dirname, '..' , 'uploads')))
  }
  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
