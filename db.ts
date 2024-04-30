import { Pool } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-serverless"

console.log("testo")

const pool = new Pool({ connectionString: process.env.POSTGRES_URL! })
export const db = drizzle(pool)
