import jwt from "jsonwebtoken";
import { FastifyRequest } from "fastify";

const JWT_SECRET = process.env.JWT_SECRET || "qwertyuiop";

export const verifyToken = (req: FastifyRequest) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); 
  console.log(!authHeader || !authHeader.startsWith("Bearer "))
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided or invalid format");
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    return decoded;
  } catch (err) {
    throw new Error("Unauthorized: Invalid token");
  }
};
