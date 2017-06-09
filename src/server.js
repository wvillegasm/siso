import {config} from "./config";
//import "./app/models/dyno/config";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import noTokenRoutes from "./routes/noTokenRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import spdy from 'spdy';


const PORT = process.env.PORT || 3005;
const app = express();

fs.readFile(`${path.resolve(process.cwd())}/key/private.rsa`, (err, data) => {
  if (err) throw err;
  app.set('privateKey', data);
});

fs.readFile(`${path.resolve(process.cwd())}/key/public.rsa`, (err, data) => {
  if (err) throw err;
  app.set('publicKey', data);
});

const serverOpts = {
  key: fs.readFileSync(`${path.resolve(process.cwd())}/key/server.key`),
  cert: fs.readFileSync(`${path.resolve(process.cwd())}/key/server.crt`)
};


mongoose.Promise = global.Promise;
mongoose.connect(config.database(process.env.USERDB, process.env.PASSWDDB));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

/*  ******************************************** */
/* Routes with no token validation */
noTokenRoutes(app);

/*  ******************************************** */
/* Routes with token validation */
// protecting routes, allowed only for token provided
tokenRoutes(app);
/*  ******************************************** */

spdy.createServer(serverOpts, app).
listen(PORT, (err) => {
  if(err){
    console.log(err);
    return process.exit(1);
  }
  console.log(`Listen server https://localhost:${PORT}`);
});
