import Auth, { createToken } from "../../context/auth";
import Conserje from "../domain/Conserje";
import ConserjeRepository from "../domain/conserje.repository";
import { compare } from "bcrypt";

export default class ConserjeUseCases {
    constructor(private repository: ConserjeRepository) {}

    async findByEmail(email: String): Promise<Conserje | null> {
        return this.repository.findByEmail(email);
    }

    async login(email: String, password: String): Promise<Auth | false> {
        const user = await this.repository.findByEmail(email);
        if (user && user.password && 
            (await compare(password.toString(), user.password.toString()))
        ) {
            const token = createToken(user);
            return { user: { email: user.email }, token};
        }
        return false;
    }
}