import bcrypt from "bcrypt";
import ConserjeRepositoryPostgre from "./src/usuarios/infraestructure/db/conserje.postgre";

async function crearConserje(email: string, password: string) {
  const repo = new ConserjeRepositoryPostgre();
  const hashedPassword = await bcrypt.hash(password, 10);
  await repo.save(email, hashedPassword);
  console.log("Conserje creado:", email);
}

crearConserje("conserje@gmail.com", "conserje1").catch(console.error);