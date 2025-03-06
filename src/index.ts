import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import * as https from "https";
import * as fs from "fs";

import routerUsuarios from "./usuarios/infrastructure/rest/usuarios.rest";
import routerTransacciones from "./transacciones/infrastructure/rest/transacciones.rest";
import { testConnection } from "./context/postgres.connector";

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["*"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
const app = express();
app.use(express.json());
app.use(cors(options));
testConnection()
//routers
const api = "/api";
app.use(api + `/usuarios`, routerUsuarios);
app.use(api + `/transacciones`, routerTransacciones);

//despliegue http
app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});

//despliegue https
//keys
/*
const key = fs.readFileSync("./key-rsa.pem");
const cert = fs.readFileSync("cert.pem");
const server = https.createServer({ key, cert }, app);

server.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
*/
