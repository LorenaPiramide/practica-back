import executeQuery from "../../../context/postgres.connector";
import Conserje from "../../domain/Conserje";
import ConserjeRepository from "../../domain/conserje.repository";

export default class ConserjeRepositoryPostgre implements ConserjeRepository {
    async findByEmail(email: String): Promise<Conserje | null> {
        const query = `SELECT * FROM conserjes WHERE email = '${email}'`;
        const result: any[] = await executeQuery(query);
        if (result.length === 0) {
            return null;
        }
        const user = result[0];
        return {
            email: user.email,
            password: user.password,
        };
    }
    
    async save(email: string, password: string): Promise<void> {
        const query = `INSERT INTO conserjes (email, password) VALUES ('${email}', '${password}')`;
        await executeQuery(query);
    }
}