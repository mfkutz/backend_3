const args = process.argv;

const ERRORS_DESCRIPTIONS = {
  empty: "No hay argumentos",
  invalid: "Argumento invalido",
  type_error: "Argumento no es del tipo esperado",
};

process.on("exit", (code) => {
  if (code) {
    return console.log("El proceso ha finalizado con el codigo:", code);
  }
  console.log("El proceso ha finalizado sin problemas");
});

process.on("uncaughtException", (error) => {
  //   console.log(error);

  switch (error.description) {
    case ERRORS_DESCRIPTIONS.empty:
      process.exit(-4);
      break;
    case ERRORS_DESCRIPTIONS.type_error:
      process.exit(-5);
      break;
    default:
      process.exit(0);
      break;
  }
});

function listNumbers(numbers) {
  if (numbers.length === 0) {
    console.log(ERRORS_DESCRIPTIONS.empty);
    throw new Error(ERRORS_DESCRIPTIONS.empty); //este throw tampoco me funciona, ver luego
  }

  for (const number of numbers) {
    const val = Number(number);

    if (isNaN(val)) {
      console.log({ description: ERRORS_DESCRIPTIONS.type_error });
      console.log(numbers);
      console.log({ types: numbers.map((n) => (isNaN(Number(n)) ? typeof n : "number")) });
      /* throw new Error({ //ver que esto no funciona
        description: ERRORS_DESCRIPTIONS.type_error,
        numbers,
        types: numbers.map((n) => (isNaN(Number(n)) ? typeof n : "number")),
      }); */
    }
  }
}

const numbers = args.slice(2);
listNumbers(numbers);

console.log("Numbers: ", numbers);
