import express from 'express';

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://localhost:8080"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express()
app.use(express.json());
app.use(cors(options));

const api = "/api";

app.get('/', (req,res)=>{
    res.send('hola')
})

app.listen(8080, () => {
    console.log('Conexión correcta.');
})