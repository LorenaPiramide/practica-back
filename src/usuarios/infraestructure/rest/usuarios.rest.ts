import express, { Request, Response } from "express";
import ConserjeUseCases from "../../application/conserje.usecases";
import ConserjeRepositoryPostgre from "../db/conserje.postgre";
import UsuarioUseCases from "../../application/usuario.usecases";
import UsuarioRepositoryPostgre from "../db/usuario.postgre";
import Auth, { isAuth } from "../../../context/auth";

const routerUsuarios = express.Router();

const conserjeUseCases: ConserjeUseCases = new ConserjeUseCases(new ConserjeRepositoryPostgre);
const usuarioUseCases: UsuarioUseCases = new UsuarioUseCases(new UsuarioRepositoryPostgre);

routerUsuarios.post("/registro", async (req: Request, res: Response) => {
    try {
        // Si quisiera que me devolviese el usuario tendría que guardarlo en una constante
        // const nuevoUsuario = await usuarioUseCases.save(req.body.email, req.body.password);

        // Como devolver el token:
        // const token = createToken(nuevoUsuario);

        await usuarioUseCases.save(req.body.email, req.body.password);

        // res.status(201).send({
        //     message: "Usuario creado.",
        //     usuario: nuevoUsuario,
        //     token: token
        // });

        res.status(201).send({ message: "Usuario creado." });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
});

routerUsuarios.post("/entrar", async (req: Request, res: Response) => {
    try {
        // Si las credenciales son correctas devuelve Auth (token o lo que sea). Si el login no es correcto, false
        const result: Auth | false = await conserjeUseCases.login(
            req.body.email, req.body.password
        );
        // 200 es ok
        if (result) {
            res.status(200).send({
                message: "Credenciales correctas conserje.",
                result,
            });
        // 401 es no autorizado
        } else {
            const result: Auth | false = await usuarioUseCases.login(
                req.body.email, req.body.password
            );
            if (result) {
                res.status(200). send({
                    message: "Credenciales correctas usuario.",
                    result,
                });
            } else {
                res.status(401).send({ message: "Credenciales incorrectas." });
            }
        }
    // 400 es que la base de datos no responde
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
})

routerUsuarios.get("/saldo", isAuth, async (req: Request, res: Response) => {
    try {
        const saldo = await usuarioUseCases.getSaldo(req.body.auth.email);
        res.status(200).send({ saldo });
    } catch (error: any) {
        res.status(400).send({ message: error.message });
    }
})

export default routerUsuarios;