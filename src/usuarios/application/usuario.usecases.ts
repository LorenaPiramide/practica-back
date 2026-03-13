import UsuarioRepository from "../domain/usuario.repository";
import Usuario from "../domain/Usuario";
import bcrypt, { compare } from "bcrypt";
import Auth, { createToken } from "../../context/auth";

export default class UsuarioUseCases {
    constructor(private repository: UsuarioRepository) {}

    async save(email: String, password: String): Promise<void> {
        if (await this.repository.findByEmail(email)) {
            throw new Error("El email ya está en uso");
        }

        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        await this.repository.save(email, hashedPassword);
    }

    async findByEmail(email: String): Promise<Usuario | null> {
        return this.repository.findByEmail(email);
    }

    async login(email: String, password: String): Promise<Auth | false> {
        const user = await this.repository.findByEmail(email);
        if (user && user.password && 
            (await compare(password.toString(), user.password.toString()))
        ) {
            const token = createToken(user);
            return { user: { email: user.email }, token }
        }
        return false;
    }

    async getSaldo(email: String): Promise<number> {
        const user = await this.repository.findByEmail(email);
        if (user) {
            return user.saldo || 0;
        }
        throw new Error("Usuario no encontrado.");
    }
}