import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("-m, --mode <string>", "Define mode server", "dev");

program.parse();

const { mode } = program.opts();

let path;

switch (mode) {
  case "development":
  case "dev":
    path = ".env.development";
    break;

  case "testing":
  case "test":
    path = ".env.testing";
    break;

  case "production":
  case "prod":
    path = ".env.production";
    break;
}

dotenv.config({ path });

export const config = {
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
