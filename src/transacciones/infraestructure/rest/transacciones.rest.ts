import express, { Request, Response } from "express";
import TransaccionesUseCases from "../../application/transacciones.usecases";
import TransaccionesRepositoryPostgres from "../db/transacciones.postgre";
import UsuarioUseCases from "../../../usuarios/application/usuario.usecases";
import UsuarioRepositoryPostgre from "../../../usuarios/infraestructure/db/usuario.postgre";
import { isAuth, isConserje } from "../../../context/auth";
import Transaccion from "../../domain/Transacciones";

const routerTransacciones = express.Router();

const transaccionesUseCases: TransaccionesUseCases = new TransaccionesUseCases(
    new TransaccionesRepositoryPostgres()
);

const usuarioUseCases: UsuarioUseCases = new UsuarioUseCases(
    new UsuarioRepositoryPostgre()
);

routerTransacciones.get("/", isAuth, async (req: Request, res: Response) => {
    try {
        const transacciones = await transaccionesUseCases.get(req.body.auth);
        res.status(200).send(transacciones);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

routerTransacciones.get("/todas", isAuth, isConserje, async (req: Request, res: Response) => {
    try {
        const transacciones = await transaccionesUseCases.getAll();
        res.status(200).send(transacciones);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

routerTransacciones.get("/conserje", isAuth, isConserje, async (req: Request, res: Response) => {
    try {
        const transacciones = await transaccionesUseCases.getConserje(req.body.auth);
        res.status(200).send(transacciones);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

routerTransacciones.post("/recargar", isAuth, isConserje, async (req: Request, res: Response) => {
    try {
        const exist = await usuarioUseCases.findByEmail(req.body.usuario);

        if (!exist) throw new Error("El usuario no existe.");

        const transaccionEntrada: Transaccion = {
            concepto: "Recarga de saldo",
            importe: req.body.importe,
            usuario: {
                email: req.body.usuario,
            },
            conserje: {
                email: req.body.auth.email,
            },
        };
        const transaccion = await transaccionesUseCases.crear(transaccionEntrada);
        res.status(200).send(transaccion);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

routerTransacciones.post("/transaccion", isAuth, isConserje, async (req: Request, res: Response) => {
    try {
        const exist = await usuarioUseCases.findByEmail(req.body.usuario);

        if (!exist) throw new Error("El usuario no existe.");

        const transaccionEntrada: Transaccion = {
            concepto: req.body.concepto,
            importe: -req.body.importe,
            usuario: {
                email: req.body.usuario,
            },
            conserje: { email: req.body.auth.email },
        }

        const transaccion = await transaccionesUseCases.crear(transaccionEntrada);
        res.status(200).send(transaccion);
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
})

export default routerTransacciones;