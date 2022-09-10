import pkg from "@prisma/client"; // precisamos instalar esse pacote!
var PrismaClient = pkg.PrismaClient;
export var client = new PrismaClient();
