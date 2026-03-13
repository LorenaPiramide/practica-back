import Conserje from "./Conserje";

export default interface ConserjeRepository {
    findByEmail(email: String): Promise<Conserje | null>;
}