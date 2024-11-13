import __dirname from "./index.js";

console.log("Look here", __dirname);
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion del poder y del saber",
      description: "API Para realizar pruebas de documentación",
    },
  },
  apis: [`${__dirname}/../docs/*.yaml`],
};

export default swaggerOptions;
