import { config } from 'dotenv';
import { type Config } from "drizzle-kit";

config({ path: ".env.local" })

export default {
  schema: "./schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;