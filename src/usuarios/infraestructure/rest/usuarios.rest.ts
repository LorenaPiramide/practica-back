import express, { Request, Response } from "express";
import ConserjeUseCases from "../../application/conserje.usecases";
import ConserjeRepositoryPostgre from "../db/conserje.postgre";
import UsuarioUseCases from "../../application/usuario.usecases";
import UsuarioRepositoryPostgre from "../db/usuario.postgre";

const router = express.Router();

const conserjeUseCases: ConserjeUseCases = new ConserjeUseCases(new ConserjeRepositoryPostgre);
const usuarioUseCases: UsuarioUseCases = new UsuarioUseCases(new UsuarioRepositoryPostgre);