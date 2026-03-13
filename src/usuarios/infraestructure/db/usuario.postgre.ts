import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";

export default class UsuarioRepositoryPostgre implements UsuarioRepository {
    async findByEmail(email: String): Promise<Usuario | null> {
        const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
        const result: any[] = await executeQuery(query);
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        return {
            email: user.email,
            password: user.email,
            saldo: user.saldo
        };
    }

    async save(email: String, password: String): Promise<void> {
        const query = `INSERT INTO usuarios (email, password) VALUES ('${email}', '${password}')`;
        const result = await executeQuery(query);
        if (!result) {
            throw new Error("Error al guardar el usuario.");
        }
    }
}