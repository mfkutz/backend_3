process.on("exit", (code) => {
  console.log(`El worker con el id ${process.pid} ha finalizado con el codigo: ${code}`);
});

process.on("message", (message) => {
  console.log(`Se recibio la siguiente orden: ${message} `);
  setTimeout(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    process.send(data);
  }, 5000);
});
