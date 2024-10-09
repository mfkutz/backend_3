//PROCESS
// console.log(process); //devuelve arreglo con muchas cosas
// console.log(process.cwd()); //devuelve la ruta absoluta del directorio actual
// console.log(process.pid); //devuelve el id del proceso actual (cambia en cada nuevo proceso)
// console.log(process.memoryUsage());
// console.log(process.env); //devuelve datos del entorno en el que se esta corriendo
// console.log(process.version);

//ARGUMENTOS
// console.log(process.argv); //devuelve un array con los argumentos del proceso (por defecto si ejecutamos node .\example.js va a devolver uno de cada uno, es decir primero el de node y luego el del archivo, proba por ejemplo node .\example.js -m -v , eso te va a traer todos los argumentos, en este caso node, la ubicacion del archivo, -m (que no es nada), -v (que tampoco es nada))
// console.log(process.argv.slice(2)); //aqui va a traer todo despues del segundo argumento, podes probar algo asi como node .\example.js -martin -kutzner, te va a devolver un array con -martin y -kutzner

//-------------------------------
// Trabajando con commander
//------------------------------
import { Command } from "commander";

const program = new Command();

program
  .option("-p, --port <number>", "Definir puerto del Servidor", 8080)
  .option("-m, --mode <string>", "Definir modo del Servidor", "dev")
  .requiredOption("-u, --user <string>", "Definir el usuario del Servidor"); //Si pasamos por ej: node .\example.js -u "Martin Kutzner", es decir Martin y kuztner, necesitan estar entre commillas para que tome todo el nombre, de lo contrario solo tomara Martin solamente.

program.parse();

console.log("Options: ", program.opts()); //Se utiliza para recuperar todas las opciones definidas (y sus valores) después de que se ha ejecutado el análisis de la línea de comandos con .parse().
console.log("Arguments: ", program.args); //es un array que contiene los argumentos adicionales que no forman parte de las opciones (en este caso, está vacío porque no pasaste argumentos adicionales).
