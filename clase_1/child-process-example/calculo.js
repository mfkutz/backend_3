export function calculo() {
  let sum = 0;
  for (let index = 0; index < 5e9; index++) {
    sum += index;
  }
  return sum;
}
