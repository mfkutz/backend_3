import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program.option("-m, --mode <string>", "Define mode server", "dev");

program.parse();

const { mode } = program.opts();

// console.log(program.opts());

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

  case "martin":
    path = ".env.martin";
    break;

  default:
    path = ".env";
    break;
}

dotenv.config({ path });

console.log(process.env.PORT);
console.log(process.env.MODE);
console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);

export const config = {
  PORT: process.env.PORT,
  MODE: process.env.MODE,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
