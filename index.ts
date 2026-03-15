import express from 'express';

import dotenv from "dotenv";
import cors from "cors";

import routerUsuarios from "./src/usuarios/infraestructure/rest/usuarios.rest";

dotenv.config();
// const port = process.env.PORT;
// TODO: ES ESTO LO QUE FALLA EN EL FRONT, HAY QUE CAMBIAR 8080 POR 5173
const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express()
app.use(express.json());
app.use(cors(options));

// app.use(cors({ origin: "*" }))

const api = "/api";
app.use(api + `/usuarios`, routerUsuarios);

app.get('/', (req,res)=>{
    res.send('hola')
})

app.listen(8080, () => {
    console.log('Conexión correcta.');
})